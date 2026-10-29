'use client';

import { useState } from "react";
import cardData from "./carddata";
import pagewideCSS from "./page.module.css";



const dialects = function () {
	const set = cardData.reduce(
		(set, e) => set.add(e.dialect),
		new Set<typeof cardData[number]["dialect"]>()
	);
	return Array.from(set.values());
}();



export default function Widget() {
	const [selectedDialect, selectDialect] = useState<typeof dialects[number]>(dialects[0]);
	const [titleFilter, setTitleFilter] = useState("");

	const dialectSelectionButtons = function () {
		return dialects.map(function (dialect) {
			const selected = dialect == selectedDialect;
			const attributes = {
				"className": selected ? pagewideCSS["selected"] : ""
			};
			return <button key={dialect} {...attributes}>{dialect}</button>;
		});
	}();
	
	const titleFilterField = function () {
		const attributes = {
			"value": titleFilter,
			"onChange": function (e: React.ChangeEvent<HTMLInputElement>) {
				setTitleFilter(e.currentTarget.value);
			}
		};
		return <input {...attributes} />;
	}();

	return (
		<div className={pagewideCSS["controls"]}>
			{dialectSelectionButtons}
			{titleFilterField}
		</div>
	);
};
