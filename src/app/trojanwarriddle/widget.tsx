'use client'

import { useBoardState } from "./useBoardState";
import widgetClasses from "./widget.module.css";


type FromUseBoardState = {
	fromUseBoardState: ReturnType<typeof useBoardState>;
};

function Board({ fromUseBoardState }: FromUseBoardState) {
	const { boardState, performAction } = fromUseBoardState;
	const { teamGrid, lockedGrid, selectedGrid } = boardState;

	const tiles = function () {
		const isGreek = (x: number, y: number) => teamGrid.read(x, y) == "G";
		const isTrojan = (x: number, y: number) => teamGrid.read(x, y) == "T";
		const isSelected = (x: number, y: number) => selectedGrid.read(x, y) == "S";
		const isLocked = (x: number, y: number) => lockedGrid.read(x, y) == "L";

		const returnee = [] as React.JSX.Element[];
		for (let y = 0; y < teamGrid.rows; ++y)
		for (let x = 0; x < teamGrid.columns; ++x) {
			const className = function () {
				const classNames = [];
				if (true) classNames.push("tile");
				if (isGreek(x, y)) classNames.push("greek");
				if (isTrojan(x, y)) classNames.push("trojan");
				if (isSelected(x, y)) classNames.push("selected");
				if (isLocked(x, y)) classNames.push("locked");
				return classNames.map(s => widgetClasses[s]).join(" ");
			}();

			const content = "⛺\uFE0E";

			const key = x + "," + y;

			returnee.push(<div key={key} className={className}>{content}</div>);
		}
		return returnee;
	}();

	const onKeyDown = function (e: React.KeyboardEvent) {
		if (e.key == "ArrowUp") performAction("Up");
		if (e.key == "ArrowDown") performAction("Down");
		if (e.key == "ArrowLeft") performAction("Left");
		if (e.key == "ArrowRight") performAction("Right");
		if (e.key == "Space") performAction("Select");
		if (e.key == "Return") performAction("Swap");
		if (e.key == "0" && e.ctrlKey) performAction("Reset");
	};

	const attributes = {
		"className": widgetClasses["board"],
		"tabIndex": 0,
		"onKeyDown": onKeyDown
	};

	return <div {...attributes}>{tiles}</div>;
}




function Buttons({ fromUseBoardState }: FromUseBoardState) {
	const { boardState, performAction } = fromUseBoardState;
	const { movesMade } = boardState;

	return (
		<div className={widgetClasses["buttons"]}>
			<span>{movesMade} moves made.</span>
			<button onClick={_ => performAction("Up")}>Up</button>
			<button onClick={_ => performAction("Down")}>Down</button>
			<button onClick={_ => performAction("Left")}>Left</button>
			<button onClick={_ => performAction("Right")}>Right</button>
			<button onClick={_ => performAction("Select")}>Select</button>
			<button onClick={_ => performAction("Swap")}>Swap</button>
			<button onClick={_ => performAction("Reset")}>Reset</button>
		</div>
	);
}



export default function Widget() {
	const fromUseBoardState = useBoardState();

	return (
		<div className={widgetClasses["widget"]}>
			<Board fromUseBoardState={fromUseBoardState} />
			<Buttons fromUseBoardState={fromUseBoardState} />
		</div>
	);
}