
import type { Metadata } from "next";
import { Abacus } from "./abacus";
import pageClasses from "./page.module.css";

export const metadata: Metadata = {
  title: "Abacus",
  description: "An editable numerical string",
};

export default function Page() {
  return <Abacus columnCount={16} />;
}
