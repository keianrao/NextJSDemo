
import type { Metadata } from "next";
import Link from "next/link";
import CaptureDemo from "./capturedemo";
import pagewideCSS from "./page.module.css";

export const metadata: Metadata = {
  title: "Screen capture",
  description: "Check for the Screen Capture API",
};

export default function Page() {
  return (
    <div className={pagewideCSS["page"]}>
      <main className={pagewideCSS["main"]}>
        <CaptureDemo />
      </main>
    </div>
  );
}
