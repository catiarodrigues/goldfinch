import React, { useEffect } from "react";

type UseMenuNavigationProps = {
  menuRef: React.RefObject<HTMLElement | null>;
  direction?: "horizontal" | "vertical"; // Default: horizontal
};

const FOCUSABLE =
  'a, button:not(:disabled), input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * Arrow keys move focus between the focusable elements inside `menuRef`,
 * wrapping at the ends. The key event itself says which element has focus,
 * and the elements are looked up on each key press, so options added later
 * work too.
 */
export const useMenuNavigation = ({
  menuRef,
  direction = "horizontal",
}: UseMenuNavigationProps) => {
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const forwardKey = direction === "horizontal" ? "ArrowRight" : "ArrowDown";
    const backwardKey = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== forwardKey && e.key !== backwardKey) return;
      const items = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE));
      const current = items.indexOf(e.target as HTMLElement);
      if (current === -1) return;

      e.preventDefault();
      const step = e.key === forwardKey ? 1 : -1;
      items[(current + step + items.length) % items.length].focus();
    };

    menu.addEventListener("keydown", handleKeyDown);
    return () => menu.removeEventListener("keydown", handleKeyDown);
  }, [menuRef, direction]);
};
