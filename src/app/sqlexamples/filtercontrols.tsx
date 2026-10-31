'use client'

import { FilterState } from "./useFilterState";
import widgetClasses from "./widget.module.css";

const dialectLogoURLs = {
	"MySQL": "/logos/mysql.png",
	"PostgreSQL": "/logos/postgresql.png"
} as { [key: string]: string };

export type FilterControlsProps = {
	filterState: FilterState;
};

export default function FilterControls(props: FilterControlsProps) {
	const { selectedDialect, selectDialect } = props.filterState;
	const { titleFilter, setTitleFilter } = props.filterState;
	const { dialects } = props.filterState;

	const dialectSelectionButtons = function () {
		return dialects.map(function (dialect) {
			const logoURL = dialectLogoURLs[dialect];
			const selected = dialect == selectedDialect;
			const attributes = {
				"className": selected ? widgetClasses["selected"] : "",
				"onClick": () => selectDialect(dialect)
			};
			return (
				<button key={dialect} {...attributes}>
					{logoURL && <img src={logoURL} />}
					{dialect}
				</button>
			);
		});
	}();
	
	const titleFilterField = function () {
		const attributes = {
			"value": titleFilter,
			"onChange": function (e: React.ChangeEvent<HTMLInputElement>) {
				setTitleFilter(e.currentTarget.value);
			},
			"placeholder": "Filter cards by title here..."
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
