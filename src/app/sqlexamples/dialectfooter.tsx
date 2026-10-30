
import { FilterState } from "./useFilterState";
import { useDialectNotes } from "./useDialectNotes";
import widgetClasses from "./widget.module.css";

export type DialectFooterProps = {
	filterState: FilterState;
};

export default function DialectFooter(props: DialectFooterProps) {
	const { selectedDialect } = props.filterState;
	const { dialectReferences } = useDialectNotes();

	const relevantReferences = function () {
		return dialectReferences.filter(e => e.dialect == selectedDialect);
	}();

	const referenceLines = function () {
		return relevantReferences.map(function ({ link }) {
			return <a key={link} href={link} target="__blank">{link}</a>;
		})
	}();

	return (
		<div className={widgetClasses["dialect-footer"]}>
			<h5>References</h5>
			{referenceLines}
		</div>
	);
}