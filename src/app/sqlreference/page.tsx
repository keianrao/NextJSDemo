
import type { Metadata } from "next";
import { useMemo } from "react";
import Link from "next/link";
import Controls from "./controls";
import Cards from "./cards";
import pagewideCSS from "./page.module.css";

export const metadata: Metadata = {
  title: "Basic SQL reference",
  description: "Diagram of basic operations in various SQL dialects",
};

export default function Page() {
  return (
    <div className={pagewideCSS["page"]}>
      <main className={pagewideCSS["main"]}>
        <Controls />
        <Cards />
      </main>
    </div>
  );
}
