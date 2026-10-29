
import Link from "next/link";
import pagewideCSS from "./page.module.css";

export default function Footer() {
	return (
		<footer className={pagewideCSS["footer"]}>
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
