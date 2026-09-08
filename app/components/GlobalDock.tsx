"use client";

import BottomDock from "./BottomDock";
import { dockItems } from "./dockItems";

export default function GlobalDock() {
  return <BottomDock items={dockItems} />;
}
