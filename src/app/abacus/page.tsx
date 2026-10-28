
import type { Metadata } from "next";
import pagewideCSS from "./page.module.css";
import { DigitStringWidget } from "./abacus";

export const metadata: Metadata = {
  title: "NextJSDemo - Abacus",
  description: "An editable numerical string",
};

export default function Page() {
  return (
    <div className={pagewideCSS["page"]}>
      <main className={pagewideCSS["main"]}>
        <DigitStringWidget />
      </main>
    </div>
  );
}
