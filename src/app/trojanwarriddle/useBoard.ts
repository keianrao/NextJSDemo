'use client'

import { useState } from "react";
import { BoardData } from "./boardData";

export function useBoard() {
	const [boardData, setBoardData] = useState(BoardData.initial());

	function getTileStateList() {
		return BoardData.tileStateList(boardData);
	}

	function performAction(action: string) {
		if (action == "Cursor up") {
			setBoardData(BoardData.up(boardData));
		}
		if (action == "Cursor down") {
			setBoardData(BoardData.down(boardData));
		}
		if (action == "Cursor left") {
			setBoardData(BoardData.left(boardData));
		}
		if (action == "Cursor right") {
			setBoardData(BoardData.right(boardData));
		}
		if (action == "Select at cursor") {
			setBoardData(BoardData.select(boardData));
		}
		if (action == "Swap with cursor") {
			setBoardData(BoardData.swap(boardData));
		}
		if (action == "Reset board") {
			setBoardData(BoardData.initial());
		}
	}

	const swapsMade = boardData.swapsMade;

	const hasSelection = BoardData.hasSelection(boardData);

	return { getTileStateList, performAction, swapsMade, hasSelection };
}
