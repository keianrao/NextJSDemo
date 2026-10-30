
import { FilterState } from "./useFilterState";
import { useDialectNotes } from "./useDialectNotes";
import widgetClasses from "./widget.module.css";

export type DialectHeaderProps = {
	filterState: FilterState;
};

export default function DialectHeader(props: DialectHeaderProps) {
	const { selectedDialect } = props.filterState;
	const { dialectCaveats } = useDialectNotes();

	const relevantCaveats = function () {
		return dialectCaveats.filter(e => e.dialect == selectedDialect);
	}();

	const caveatLines = function () {
		return relevantCaveats.map(function ({ text }) {
			return <p key={text}>{text}</p>;
		})
	}();

	return (
		<div className={widgetClasses["dialect-header"]}>
			<h5>Caveats</h5>
			{caveatLines}
		</div>
	);
}