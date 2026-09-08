import {
  FaBook,
  FaEnvelope,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaNewspaper,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import type { DockItem } from "./BottomDock";

export const dockItems: DockItem[] = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "Blog", href: "/blog", icon: FaNewspaper },
  {
    label: "GitHub",
    href: "https://github.com/ADITYAMAHAKALI/",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-mahakali-b81758168/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:adityamahakali@gmail.com",
    icon: FaEnvelope,
    external: true,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1hPDU5O51nLcL9-BfaHTtl46fYszLzg6Y/view",
    icon: FaBook,
    external: true,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/adityamahakali/",
    icon: SiLeetcode,
    external: true,
  },
];
