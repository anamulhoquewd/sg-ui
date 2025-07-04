"use client";

import { StoreProvider } from "easy-peasy";
import store from "../carts";

export default function EasyPeasyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
