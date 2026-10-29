
import type { Metadata } from "next";
import Link from "next/link";
import pageClasses from "./page.module.css";

const links = [
  { href: "abacus", title: "Abacus" },
  { href: "capturedemo", title: "Screen capture demo" },
  { href: "sqlreference", title: "Basic SQL reference" }
];

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Links to corners of this website",
};

export default function Page() {
  const linkCards = links.map(function ({ href, title }) {
    return (
      <Link key={href} href={href} className={pageClasses["link-card"]}>
        {title}
      </Link>
    );
  });

  const linkGrid = (
    <div className={pageClasses["link-cards"]}>
      {linkCards}
    </div>
  );

  return linkGrid;
}
