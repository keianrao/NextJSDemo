/*
Next.js Demo - A website with some toy app pages
Copyright (C) 2026 Keian Rao Eng Haau

This notice applies to all source code files within this project/
repository, and are omitted from other source code files for brevity.
This notice within this file represents a notice in all the others.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { Metadata } from "next";
import Link from "next/link";
import layoutClasses from "./layout.module.css";

function Header() {
  return (
    <header className={layoutClasses.header}>
      <nav className={layoutClasses["header-buttons"]}>
        <Link href=".."><button>Back</button></Link>
        <Link href="/"><button>Home</button></Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={layoutClasses.footer}>
      <div>
        Written by hand by Keian Rao Eng Haau. © 2026
      </div>
      <div>
        AGPL-licensed.&nbsp;
        <Link href="https://github.com/keianrao/NextJSDemo">
          https://github.com/keianrao/NextJSDemo
        </Link>
      </div>
    </footer>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Demo',
    default: 'Page',
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={layoutClasses.html}>
      <body className={layoutClasses.body}>
        <Header />
        <div className={layoutClasses.page}>
          <main className={layoutClasses.main}>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
