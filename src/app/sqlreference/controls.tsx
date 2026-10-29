'use client';

import { useState } from "react";
import { dialects, FilterState } from "./widget";
import widgetClasses from "./widget.module.css";



export type ControlsProps = {
	filterState: FilterState;
};

export default function Controls(props: ControlsProps) {
	const { selectedDialect, selectDialect } = props.filterState;
	const { titleFilter, setTitleFilter } = props.filterState;

	const dialectSelectionButtons = function () {
		return dialects.map(function (dialect) {
			const selected = dialect == selectedDialect;
			const attributes = {
				"className": selected ? widgetClasses["selected"] : ""
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
		<div className={widgetClasses["controls"]}>
			{dialectSelectionButtons}
			{titleFilterField}
		</div>
	);
};
