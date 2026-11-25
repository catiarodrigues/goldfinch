import { useCallback, useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { navigation } from "../data/navigation";

interface Props {
  currentPath: string;
}

export default function SidebarNav({ currentPath }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const isActive = (href: string) =>
    currentPath === href || currentPath.replace(/\/$/, "") === href;

  useEffect(() => {
    const sidebar = document.querySelector("aside");
    const activeLink = sidebar?.querySelector(
      `[data-sidebar-link][href="${currentPath}"]`,
    );
    if (activeLink && sidebar) {
      const linkRect = activeLink.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      if (
        linkRect.top < sidebarRect.top ||
        linkRect.bottom > sidebarRect.bottom
      ) {
        activeLink.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [currentPath]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed right-4 bottom-4 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full border-none bg-goldfinch-brand text-goldfinch-inverse shadow-lg lg:hidden"
      >
        <List size={24} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 cursor-default border-none bg-black/30 p-0 lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto border-r border-goldfinch-hairline bg-goldfinch-canvas transition-transform duration-200 lg:sticky lg:top-16 lg:z-auto lg:block lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex h-14 items-center justify-between border-b border-goldfinch-hairline px-4 lg:hidden">
          <span className="font-semibold text-goldfinch-strong">
            Navigation
          </span>
          <button
            onClick={close}
            aria-label="Close navigation"
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-none bg-goldfinch-base text-goldfinch-default hover:bg-goldfinch-tint"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="p-4">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6 last:mb-0">
              <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-goldfinch-subtle uppercase">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      data-sidebar-link
                      href={item.href}
                      onClick={close}
                      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-goldfinch-tint font-medium text-goldfinch-strong"
                          : "text-goldfinch-default hover:bg-goldfinch-base hover:text-goldfinch-strong"
                      }`}
                    >
                      {item.title}
                      {item.badge && (
                        <span className="ml-auto rounded-full bg-goldfinch-brand px-2 py-0.5 text-[10px] font-medium text-goldfinch-inverse">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
