'use client'

import { useState } from "react";





class CharGrid {
	dataAsCharArray: string;
	columns: number;
	rows: number;

	constructor(dataAsCharArray: string | null, columns: number, rows: number) {
		if (dataAsCharArray) this.dataAsCharArray = dataAsCharArray;
		else this.dataAsCharArray = " ".repeat(rows * columns);
		// For this codebase, assume argument is correct. Private functions.
		this.columns = columns;
		this.rows = rows;
	}

	edit(this: CharGrid, x: number, y: number, v: string) {
		const o = (y * this.columns) + x;
		const before = this.dataAsCharArray.substring(0, o);
		const after = this.dataAsCharArray.substring(o + 1);
		this.dataAsCharArray = before + v + after;
	}

	read(this: CharGrid, x: number, y: number) {
		const o = (y * this.columns) + x;
		return this.dataAsCharArray[o];
	}

	coordinatesOfFirst(this: CharGrid, v: string) {
		const o = function (this: CharGrid) {
			for (let o = 0; o < this.dataAsCharArray.length; ++o) {
				const v2 = this.dataAsCharArray[o];
				if (v2 == v) return o;
			}
			return -1;
		}.apply(this);
		const y = o == - 1 ? -1 : Math.floor(o / this.columns);
		const x = o == - 1 ? -1 : o % this.columns;
		return { x, y };
	}

	swap(this: CharGrid, x1: number, y1: number, x2: number, y2: number) {
		let o1 = (y1 * this.columns) + x1;
		let o2 = (y2 * this.columns) + x2;
		if (o2 < o1) [o1, o2] = [o2, o1];
		const before = this.dataAsCharArray.substring(0, o1);
		const between = this.dataAsCharArray.substring(o1 + 1, o2);
		const after = this.dataAsCharArray.substring(o2 + 1);
		const first = this.dataAsCharArray[o1];
		const second = this.dataAsCharArray[o2];
		this.dataAsCharArray = before + second + between + first + after;
	}
}





export type BoardState = {
	teamGrid: CharGrid;
	lockedGrid: CharGrid;
	selectedGrid: CharGrid;
	movesMade: number;
};





function generateInitialBoardState(): BoardState {
	const teamGrid = function () {
		const dataAsCharArray = function () {
			const a = "GGGGTGGGGG";
			const b = "TTTTGTTTTT";
			return a.repeat(5) + b + a.repeat(5);
		}();
		const returnee = new CharGrid(dataAsCharArray, 10, 11);
		return returnee;
	}();

	const lockedGrid = function () {
		const returnee = new CharGrid(null, 10, 11);
		return returnee;
	}();

	const selectedGrid = function () {
		const returnee = new CharGrid(null, 10, 11);
		returnee.edit(0, 0, "S");
		return returnee;
	}();
	
	const movesMade = 0;
	
	return { teamGrid, lockedGrid, selectedGrid, movesMade };
}





export function useBoardState(){
	const initialBoardState = generateInitialBoardState();
	// Okay to reuse this because board states should be used immutably.

	const [boardState, setBoardState] = useState(initialBoardState);

	function performAction(action: string) {
		const { teamGrid, lockedGrid, selectedGrid, movesMade } = boardState;
		// Woops! We made an object class with mutable state, not immutability.

		const { x: selectedX, y: selectedY } = selectedGrid.coordinatesOfFirst("S");

		if (action == "Up") {
			setBoardState({
				...boardState,
			});
		}
		if (action == "Down") {
			setBoardState({
				...boardState,
			});
		}
		if (action == "Left") {
			setBoardState({
				...boardState,
			});
		}
		if (action == "Right") {
			setBoardState({
				...boardState,
			});
		}
		if (action == "Select") {
			setBoardState({
				...boardState,
			});
		}
		if (action == "Swap") {
			setBoardState({
				...boardState,
				movesMade: movesMade + 1
			});
		}
		if (action == "Reset") {
			setBoardState(initialBoardState);
		}
	}

	return { boardState, performAction };
}
