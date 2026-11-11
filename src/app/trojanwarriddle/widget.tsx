'use client'

import { useBoard } from "./useBoard";
import widgetClasses from "./widget.module.css";



type UsesBoard = {
	board: ReturnType<typeof useBoard>;
};

function Tiles({ board }: UsesBoard) {
	const { getTileStateList, performAction } = board;

	return getTileStateList().map(function (tileState, o) {
		const className = function () {
			const lookupKeys = [];
			lookupKeys.push("tile");
			if (tileState.isGreek) lookupKeys.push("greek");
			if (tileState.isTrojan) lookupKeys.push("trojan");
			if (tileState.isSelected) lookupKeys.push("selected");
			if (tileState.isCursor) lookupKeys.push("cursor");
			if (tileState.isLocked) lookupKeys.push("locked");
			const classes = lookupKeys.map(s => widgetClasses[s]);
			return classes.join(" ");
		}();

		const onClick = function () {
			const { x, y } = tileState;
			performAction("Cursor to coordinates", x, y);
		};

		return (
			<div key={o} className={className} onClick={onClick}>
				{"⛺\uFE0E"}
			</div>
		);
	});
}





function Board({ board }: UsesBoard) {
	const { performAction } = board;

	const onKeyDown = function (e: React.KeyboardEvent) {
		const finish = () => e.preventDefault();
		if (e.key == "ArrowUp") performAction("Cursor up"), finish();
		if (e.key == "ArrowDown") performAction("Cursor down"), finish();
		if (e.key == "ArrowLeft") performAction("Cursor left"), finish();
		if (e.key == "ArrowRight") performAction("Cursor right"), finish();
		if (e.key == " ") performAction("Select at cursor"), finish();
		if (e.key == "Enter") performAction("Swap with cursor"), finish();
		if (e.key == "0" && e.ctrlKey) performAction("Reset board"), finish();
		if (e.key == "Backspace") performAction("Undo last move"), finish();
		if (e.key == "z" && e.ctrlKey) performAction("Undo last move"), finish();
	};

	const attributes = {
		"className": widgetClasses["board"],
		"tabIndex": 0,
		"onKeyDown": onKeyDown
	};

	return <div {...attributes}><Tiles board={board} /></div>;
}



function Buttons({ board }: UsesBoard) {
	const { performAction, swapsMade, hasSelection, canUndo } = board;

	const oc = (s: string) => () => performAction(s);

	return (
		<div className={widgetClasses["buttons"]}>
			<span>{swapsMade} swaps made.</span>
			<hr />
			<button disabled={false} onClick={oc("Reset board")}>Reset (Ctrl-0)</button>
			<hr />
			<button disabled={false} onClick={oc("Cursor left")}>Left (←)</button>
			<button disabled={false} onClick={oc("Cursor right")}>Right (→)</button>
			<button disabled={false} onClick={oc("Cursor up")}>Up (↑)</button>
			<button disabled={false} onClick={oc("Cursor down")}>Down (↓)</button>
			<hr />
			<button disabled={false} onClick={oc("Select at cursor")}>Select (Space)</button>
			<button disabled={!hasSelection} onClick={oc("Swap with cursor")}>Swap (Enter)</button>
			<button disabled={!canUndo} onClick={oc("Undo last move")}>Undo (Ctrl-Z)</button>
		</div>
	);
}



export default function Widget() {
	const board = useBoard();

	return (
		<div className={widgetClasses["widget"]}>
			<Board board={board} />
			<Buttons board={board} />
		</div>
	);
}