'use client'

import { useBoard } from "./useBoard";
import widgetClasses from "./widget.module.css";



type UsesBoard = {
	board: ReturnType<typeof useBoard>;
};

function Board({ board }: UsesBoard) {
	const { getTileStateList, performAction } = board;

	const tiles = function () {
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
			return <div key={o} className={className}>{"⛺\uFE0E"}</div>;
		});
	}();

	const onKeyDown = function (e: React.KeyboardEvent) {
		let caught = false;
		if (e.key == "ArrowUp") performAction("Cursor up"), caught = true;
		if (e.key == "ArrowDown") performAction("Cursor down"), caught = true;
		if (e.key == "ArrowLeft") performAction("Cursor left"), caught = true;
		if (e.key == "ArrowRight") performAction("Cursor right"), caught = true;
		if (e.key == " ") performAction("Select at cursor"), caught = true;
		if (e.key == "Enter") performAction("Swap with cursor"), caught = true;
		if (e.key == "0" && e.ctrlKey) performAction("Reset board"), caught = true;
		if (e.key == "Backspace") performAction("Undo last move"), caught = true;
		if (caught) e.preventDefault();
	};

	const attributes = {
		"className": widgetClasses["board"],
		"tabIndex": 0,
		"onKeyDown": onKeyDown
	};

	return <div {...attributes}>{tiles}</div>;
}



function Buttons({ board }: UsesBoard) {
	const { performAction, swapsMade, hasSelection } = board;

	const pa = (...args: Parameters<typeof performAction>) => performAction(...args);

	return (
		<div className={widgetClasses["buttons"]}>
			<span>{swapsMade} swaps made.</span>
			<button disabled={false} onClick={_ => pa("Cursor up")}>Up</button>
			<button disabled={false} onClick={_ => pa("Cursor down")}>Down</button>
			<button disabled={false} onClick={_ => pa("Cursor left")}>Left</button>
			<button disabled={false} onClick={_ => pa("Cursor right")}>Right</button>
			<button disabled={false} onClick={_ => pa("Select at cursor")}>Select</button>
			<button disabled={!hasSelection} onClick={_ => pa("Swap with cursor")}>Swap</button>
			<button disabled={false} onClick={_ => pa("Reset board")}>Reset</button>
			<button disabled={true} onClick={_ => pa("Undo last move")}>Undo</button>
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