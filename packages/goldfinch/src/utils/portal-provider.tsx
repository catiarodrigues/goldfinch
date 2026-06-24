import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";

export type PortalContainer =
  | HTMLElement
  | ShadowRoot
  | null
  | RefObject<HTMLElement | ShadowRoot | null>;

const PortalContainerContext = createContext<PortalContainer>(null);

export function GoldfinchPortalProvider({
  container,
  children,
}: {
  container: PortalContainer;
  children: ReactNode;
}) {
  return (
    <PortalContainerContext.Provider value={container}>
      {children}
    </PortalContainerContext.Provider>
  );
}

export function usePortalContainer(): PortalContainer {
  return useContext(PortalContainerContext);
}
