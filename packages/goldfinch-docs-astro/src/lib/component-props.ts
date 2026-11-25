/**
 * Reads a component's props straight from the library source with the
 * TypeScript compiler, so the docs' props tables can't drift from the code.
 * Runs at build time (Astro renders pages in Node); one program per build.
 */
import path from "node:path";
import ts from "typescript";

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  /** Declared by Goldfinch itself, or passed through from the Base UI part it wraps. */
  source: "goldfinch" | "base-ui";
}

// The docs package runs from its own directory (pnpm --filter).
const LIB = path.resolve(process.cwd(), "../goldfinch");
const LIB_SRC = path.join(LIB, "src") + path.sep;

let cached: { checker: ts.TypeChecker; index: ts.SourceFile } | undefined;

function program() {
  if (cached) return cached;
  const configPath = path.join(LIB, "tsconfig.json");
  const parsed = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: () => {},
    },
  );
  if (!parsed) throw new Error(`Cannot read ${configPath}`);
  const prog = ts.createProgram(
    [path.join(LIB, "src/index.ts")],
    parsed.options,
  );
  const index = prog.getSourceFile(path.join(LIB, "src/index.ts"));
  if (!index) throw new Error("Cannot load the library entry point");
  cached = { checker: prog.getTypeChecker(), index };
  return cached;
}

/** Props declared by Goldfinch or the Base UI part it wraps, not DOM/React ones. */
function isDocumented(decl: ts.Declaration) {
  const file = decl.getSourceFile().fileName;
  return (
    file.startsWith(LIB_SRC) ||
    file.includes(`${path.sep}@base-ui${path.sep}react${path.sep}`)
  );
}

/** Follows forwardRef(fn), Object.assign(Root, …), aliases etc. to the function. */
function componentFunction(
  node: ts.Node | undefined,
  checker: ts.TypeChecker,
  depth = 0,
): ts.SignatureDeclaration | undefined {
  if (!node || depth > 8) return undefined;
  if (
    ts.isFunctionDeclaration(node) ||
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node)
  )
    return node;
  if (ts.isVariableDeclaration(node))
    return componentFunction(node.initializer, checker, depth + 1);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node))
    return componentFunction(node.expression, checker, depth + 1);
  if (ts.isShorthandPropertyAssignment(node)) {
    const sym = checker.getShorthandAssignmentValueSymbol(node);
    return componentFunction(sym?.valueDeclaration, checker, depth + 1);
  }
  if (ts.isPropertyAssignment(node))
    return componentFunction(node.initializer, checker, depth + 1);
  if (ts.isIdentifier(node)) {
    let sym = checker.getSymbolAtLocation(node);
    if (sym && sym.flags & ts.SymbolFlags.Alias)
      sym = checker.getAliasedSymbol(sym);
    return componentFunction(sym?.valueDeclaration, checker, depth + 1);
  }
  if (ts.isCallExpression(node))
    return componentFunction(node.arguments[0], checker, depth + 1);
  return undefined;
}

/** `{ size = "base", … }` in the component's parameter list, as values. */
function destructuredDefaults(
  fn: ts.SignatureDeclaration | undefined,
  checker: ts.TypeChecker,
) {
  const out = new Map<string, string>();
  const param = fn?.parameters[0];
  if (!param || !ts.isObjectBindingPattern(param.name)) return out;
  for (const el of param.name.elements) {
    if (!el.initializer) continue;
    const name = (el.propertyName ?? el.name).getText();
    // GOLDFINCH_X_DEFAULT_VARIANTS.size -> "base": print the literal it resolves to.
    const t = checker.getTypeAtLocation(el.initializer);
    const isLiteral = t.isLiteral() || t.flags & ts.TypeFlags.BooleanLiteral;
    out.set(
      name,
      isLiteral ? checker.typeToString(t) : el.initializer.getText(),
    );
  }
  return out;
}

/** The JSDoc's lead text: stops before a blank line or a bulleted list of options. */
function summary(doc: string) {
  let lead = doc
    .split(/\n\s*\n|\n\s*- /)[0]
    .replace(/\s+/g, " ")
    .trim();
  // "Color variant. Recommended variants:" -> drop the sentence that introduced the list.
  if (lead.endsWith(":"))
    lead =
      lead.slice(0, Math.max(0, lead.lastIndexOf(". ") + 1)) ||
      lead.slice(0, -1);
  return lead.trim();
}

/**
 * The prop's JSDoc summary, looked up across all its declarations (a prop on a
 * union type is declared once per member, and only one may carry the comment),
 * with any @deprecated note appended.
 */
function describe(prop: ts.Symbol, checker: ts.TypeChecker) {
  let text = summary(
    ts.displayPartsToString(prop.getDocumentationComment(checker)),
  );
  let deprecated: string | undefined;
  for (const decl of prop.declarations ?? []) {
    const name = ts.getNameOfDeclaration(decl);
    const declSymbol = name && checker.getSymbolAtLocation(name);
    if (!text && declSymbol)
      text = summary(
        ts.displayPartsToString(declSymbol.getDocumentationComment(checker)),
      );
    const tag = ts
      .getJSDocTags(decl)
      .find((t) => t.tagName.text === "deprecated");
    if (tag && deprecated === undefined)
      deprecated = summary(ts.getTextOfJSDocComment(tag.comment) ?? "");
  }
  if (deprecated !== undefined)
    text = [text, `Deprecated${deprecated ? `: ${deprecated}` : "."}`]
      .filter(Boolean)
      .join(" ");
  return text;
}

/** Option lists in full ("sm" | "md"); otherwise the type as written in the source. */
function displayType(
  prop: ts.Symbol,
  decl: ts.Declaration,
  type: ts.Type,
  checker: ts.TypeChecker,
) {
  const parts = type.isUnion() ? type.types : [type];
  const literals = parts.every(
    (t) => t.isLiteral() || t.flags & ts.TypeFlags.BooleanLiteral,
  );
  if (literals && !(type.flags & ts.TypeFlags.Boolean))
    return checker.typeToString(type);
  const node =
    ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)
      ? decl.type
      : undefined;
  if (node && decl.getSourceFile().fileName.startsWith(LIB_SRC)) {
    return node
      .getText()
      .replace(/\s*\|\s*undefined\b/g, "")
      .replace(/\s+/g, " ")
      .replace(/^\|\s*/, "");
  }
  return checker.typeToString(
    type,
    undefined,
    ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
      ts.TypeFormatFlags.NoTruncation,
  );
}

/** Props of an exported component, e.g. "Badge" or a part like "Modal.Root". */
export function componentProps(name: string): ComponentProp[] {
  const { checker, index } = program();
  const [root, ...parts] = name.split(".");
  const moduleSymbol = checker.getSymbolAtLocation(index);
  let symbol =
    moduleSymbol &&
    checker.getExportsOfModule(moduleSymbol).find((s) => s.name === root);
  if (!symbol)
    throw new Error(
      `PropsTable: "${root}" is not exported from @catiarodrigues/goldfinch`,
    );
  if (symbol.flags & ts.SymbolFlags.Alias)
    symbol = checker.getAliasedSymbol(symbol);
  for (const part of parts) {
    const owner = checker.getTypeOfSymbolAtLocation(symbol, index);
    const next = owner.getProperty(part);
    if (!next) throw new Error(`PropsTable: "${name}" does not exist`);
    symbol = next;
  }

  const type = checker.getTypeOfSymbolAtLocation(symbol, index);
  const signature = type.getCallSignatures()[0];
  if (!signature) throw new Error(`PropsTable: "${name}" is not a component`);
  const propsParam = signature.getParameters()[0];
  if (!propsParam) return [];
  const propsType = checker.getTypeOfSymbolAtLocation(propsParam, index);
  const defaults = destructuredDefaults(
    componentFunction(
      symbol.valueDeclaration ?? symbol.declarations?.[0],
      checker,
    ),
    checker,
  );

  const rows: (ComponentProp & { order: number })[] = [];
  for (const prop of checker.getPropertiesOfType(propsType)) {
    const decl = prop.valueDeclaration ?? prop.declarations?.[0];
    if (!decl || !isDocumented(decl) || prop.name === "ref") continue; // ref is React's, not ours
    const propType = checker.getNonNullableType(
      checker.getTypeOfSymbolAtLocation(prop, index),
    );
    // `never` props only tell union variants apart (e.g. Pagination's two forms).
    if (propType.flags & ts.TypeFlags.Never) continue;
    const defaultTag = prop
      .getJsDocTags(checker)
      .find((t) => t.name === "default");
    const fromSource = decl.getSourceFile().fileName.startsWith(LIB_SRC);
    rows.push({
      name: prop.name,
      type: displayType(prop, decl, propType, checker),
      required: !(prop.flags & ts.SymbolFlags.Optional),
      default:
        defaults.get(prop.name) ??
        (defaultTag ? ts.displayPartsToString(defaultTag.text) : undefined),
      description: describe(prop, checker),
      source: fromSource ? "goldfinch" : "base-ui",
      // Goldfinch's own props first, in source order; Base UI's after.
      order: (fromSource ? 0 : 1e9) + decl.getStart(),
    });
  }
  return rows
    .toSorted((a, b) => a.order - b.order)
    .map(({ order: _order, ...row }) => row);
}
