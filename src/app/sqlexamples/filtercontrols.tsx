'use client'

import { FilterState } from "./useFilterState";
import widgetClasses from "./widget.module.css";

export type FilterControlsProps = {
	filterState: FilterState;
};

export default function FilterControls(props: FilterControlsProps) {
	const { selectedDialect, selectDialect } = props.filterState;
	const { titleFilter, setTitleFilter } = props.filterState;
	const { dialects } = props.filterState;

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
		<div className={widgetClasses["filter-controls"]}>
			{dialectSelectionButtons}
			{titleFilterField}
		</div>
	);
};
