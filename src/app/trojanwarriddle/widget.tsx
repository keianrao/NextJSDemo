'use client'

import { useState } from "react";
import widgetClasses from "./widget.module.css";



type BoardState = {
	charArray: string;
	movesMade: number;
};

function useBoardState(){
	const initialBoardState = function (): BoardState {
		const charArray = function () {
			const a = "ggggtggggg";
			const b = "ttttgttttt";
			return a.repeat(5) + b + a.repeat(5);
		}();
		const movesMade = 0;
		return { charArray, movesMade };
	}();
	// (This does not need to be a constructor since
	// the all board states should be immutable.)

	const [boardState, setBoardState] = useState(initialBoardState);

	return { boardState, setBoardState, initialBoardState };
}




type CommonProps = {
	boardStateUsage: ReturnType<typeof useBoardState>;
};

function Board({ boardStateUsage }: CommonProps) {
	const { boardState, setBoardState } = boardStateUsage;

	return (
		<div className={widgetClasses["board"]}>
		</div>
	);
}




function Buttons({ boardStateUsage }: CommonProps) {
	const { boardState, setBoardState, initialBoardState } = boardStateUsage;
	const { movesMade } = boardState;

	const handleOnClick = {
		Up: function () {
			setBoardState({ ...boardState, movesMade: movesMade + 1 });
		},
		Down: function () {

		},
		Left: function () {

		},
		Right: function () {

		},
		Select: function () {

		},
		Swap: function () {

		},
		Reset: function () {
			setBoardState(initialBoardState);
		}
	};

	return (
		<div className={widgetClasses["buttons"]}>
			<span>{movesMade} moves made.</span>
			<button onClick={handleOnClick.Up}>Up</button>
			<button onClick={handleOnClick.Down}>Down</button>
			<button onClick={handleOnClick.Left}>Left</button>
			<button onClick={handleOnClick.Right}>Right</button>
			<button onClick={handleOnClick.Select}>Select</button>
			<button onClick={handleOnClick.Swap}>Swap</button>
			<button onClick={handleOnClick.Reset}>Reset</button>
		</div>
	);
}



export default function Widget() {
	const boardStateUsage = useBoardState();

	return <>
		<Board boardStateUsage={boardStateUsage} />
		<Buttons boardStateUsage={boardStateUsage} />
	</>
}