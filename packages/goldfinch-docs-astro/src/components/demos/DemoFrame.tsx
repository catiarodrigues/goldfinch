import type { ReactNode } from "react";

export function DemoFrame({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="not-prose rounded-lg border border-goldfinch-hairline overflow-hidden my-6">
      {title && (
        <div className="px-4 py-2 border-b border-goldfinch-hairline bg-goldfinch-base">
          <span className="text-xs font-medium text-goldfinch-subtle">{title}</span>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
