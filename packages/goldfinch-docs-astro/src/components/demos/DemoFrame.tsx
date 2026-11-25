import type { ReactNode } from "react";

export function DemoFrame({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-goldfinch-hairline">
      {title && (
        <div className="border-b border-goldfinch-hairline bg-goldfinch-base px-4 py-2">
          <span className="text-xs font-medium text-goldfinch-subtle">
            {title}
          </span>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
