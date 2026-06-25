import { useCallback, useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { navigation, type NavSection } from "../data/navigation";

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
        class="fixed bottom-4 right-4 z-50 flex lg:hidden items-center justify-center size-12 rounded-full bg-goldfinch-brand text-goldfinch-inverse shadow-lg cursor-pointer border-none"
      >
        <List size={24} />
      </button>

      {open && (
        <div
          class="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={close}
        />
      )}

      <aside
        class={`
          fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto border-r border-goldfinch-hairline
          bg-goldfinch-canvas transition-transform duration-200
          lg:sticky lg:top-16 lg:z-auto lg:block lg:translate-x-0 lg:h-[calc(100vh-4rem)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div class="flex items-center justify-between px-4 h-14 border-b border-goldfinch-hairline lg:hidden">
          <span class="font-semibold text-goldfinch-strong">Navigation</span>
          <button
            onClick={close}
            aria-label="Close navigation"
            class="flex items-center justify-center size-8 rounded-lg bg-goldfinch-base text-goldfinch-default hover:bg-goldfinch-tint cursor-pointer border-none"
          >
            <X size={16} />
          </button>
        </div>

        <nav class="p-4">
          {navigation.map((section) => (
            <div key={section.title} class="mb-6 last:mb-0">
              <h3 class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-goldfinch-subtle">
                {section.title}
              </h3>
              <ul class="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      data-sidebar-link
                      href={item.href}
                      onClick={close}
                      class={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-goldfinch-tint text-goldfinch-strong font-medium"
                          : "text-goldfinch-default hover:bg-goldfinch-base hover:text-goldfinch-strong"
                      }`}
                    >
                      {item.title}
                      {item.badge && (
                        <span class="ml-auto rounded-full bg-goldfinch-brand px-2 py-0.5 text-[10px] font-medium text-goldfinch-inverse">
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
