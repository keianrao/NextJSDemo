
import type { Metadata } from "next";
import Link from "next/link";
import pagewideCSS from "./page.module.css";

export const metadata: Metadata = {
  title: "NextJSDemo - Sitemap",
  description: "Links to corners of this website",
};

export default function Page() {
  return (
    <div className={pagewideCSS.page}>
      <main className={pagewideCSS.main}>
        <Link href="abacus">Abacus</Link>
        <Link href="capturedemo">Screen capture demo</Link>
      </main>
    </div>
  );
}
