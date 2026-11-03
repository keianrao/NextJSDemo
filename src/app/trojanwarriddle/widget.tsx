'use client'

import { useState, useMemo } from "react";
import widgetClasses from "./widget.module.css";



type BoardState = {
	charArray: string;
	movesMade: number;
};

function useBoardState(){
	const initialBoardState = function (): BoardState {
		const charArray = function () {
			const a = "GGGGTGGGGG";
			const b = "TTTTGTTTTT";
			return a.repeat(5) + b + a.repeat(5);
		}();
		const movesMade = 0;
		return { charArray, movesMade };
	}();

	const [boardState, setBoardState] = useState(initialBoardState);

	function performAction(action: string) {
		const { charArray, movesMade } = boardState;

		if (action == "Up") {
			setBoardState({ ...boardState, movesMade: movesMade + 1 });
		}
		if (action == "Down") {

		}
		if (action == "Left") {

		}
		if (action == "Right") {

		}
		if (action == "Select") {

		}
		if (action == "Swap") {

		}
		if (action == "Reset") {
			setBoardState(initialBoardState);
			// It's okay to reuse that object, as board
			// state is supposed to be used immutably.
		}
	}

	return { boardState, performAction };
}




type CommonProps = {
	boardStateUsage: ReturnType<typeof useBoardState>;
};

function Board({ boardStateUsage }: CommonProps) {
	const { boardState, performAction } = boardStateUsage;
	const { charArray } = boardState;

	const tiles = function () {
		const selectedOffsets = useMemo(function () {
			return [Math.floor(Math.random() * charArray.length)];
		}, [boardStateUsage]);

		const lockedOffsets = useMemo(function () {
			return Array.from(charArray)
				.map((_, o) => Math.random() < 0.05 ? o : -1)
				.filter(o => o != -1);
		}, [boardStateUsage]);

		return Array.from(charArray).map(function (char, o) {
			const className = function () {
				const classNames = [];
				if (true) classNames.push("tile");
				if (char == "G") classNames.push("greek");
				if (char == "T") classNames.push("trojan");
				if (selectedOffsets.includes(o)) classNames.push("selected");
				if (lockedOffsets.includes(o)) classNames.push("locked");
				return classNames.map(s => widgetClasses[s]).join(" ");
			}();
			const content = "⛺\uFE0E";
			return <div key={o} className={className} suppressHydrationWarning>{content}</div>;
		});
	}();

	const onKeyDown = function (e) {
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




function Buttons({ boardStateUsage }: CommonProps) {
	const { boardState, performAction } = boardStateUsage;
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
	const boardStateUsage = useBoardState();

	return (
		<div className={widgetClasses["widget"]}>
			<Board boardStateUsage={boardStateUsage} />
			<Buttons boardStateUsage={boardStateUsage} />
		</div>
	);
}