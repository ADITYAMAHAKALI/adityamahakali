"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

export type DockItem = {
  label: string;
  href: string;
  icon: IconType;
  external?: boolean;
};

type BottomDockProps = {
  items: DockItem[];
  trailing?: ReactNode;
};

export default function BottomDock({ items, trailing }: BottomDockProps) {
  const pathname = usePathname();

  return (
    <nav className="mobile-dock" aria-label="Quick actions">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = !item.external && pathname === item.href;

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-link"
              aria-label={item.label}
            >
              <Icon size={32} aria-hidden="true" />
              {/* <span>{item.label}</span> */}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`dock-link ${isActive ? "active" : ""}`}
            aria-label={item.label}
          >
            <Icon size={32} aria-hidden="true" />
            {/* <span>{item.label}</span> */}
          </Link>
        );
      })}
      {trailing ? <div className="dock-trailing">{trailing}</div> : null}
    </nav>
  );
}
