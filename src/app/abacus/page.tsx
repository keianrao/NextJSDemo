
import type { Metadata } from "next";
import pagewideCSS from "./page.module.css";
import { Abacus } from "./abacus";

export const metadata: Metadata = {
  title: "NextJSDemo - Abacus",
  description: "An editable numerical string",
};

export default function Page() {
  return (
    <div className={pagewideCSS["page"]}>
      <main className={pagewideCSS["main"]}>
        <Abacus columnCount={6} className={pagewideCSS["for-mobile"]} />
        <Abacus columnCount={10} className={pagewideCSS["for-small"]} />
        <Abacus columnCount={16} className={pagewideCSS["for-full"]} />
      </main>
    </div>
  );
}
