'use client'

import { useState } from "react";
import { BoardData } from "./boardData";
import type { BoardDataUndoToken } from "./boardData";

export function useBoard() {
	const [boardData, setBoardData] = useState(BoardData.initial());
	const [undoTokens, setUndoTokens] = useState<BoardDataUndoToken[]>([]);

	function getTileStateList() {
		return BoardData.tileStateList(boardData);
	}

	function performAction(action: string, ...args: any[]) {
		if (action == "Cursor up") {
			const { newBoardData, undoToken } = BoardData.up(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Cursor down") {
			const { newBoardData, undoToken } = BoardData.down(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Cursor left") {
			const { newBoardData, undoToken } = BoardData.left(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Cursor right") {
			const { newBoardData, undoToken } = BoardData.right(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Cursor to coordinates") {
			const [x, y] = args as [number, number];
			const { newBoardData, undoToken } = BoardData.to(boardData, x, y);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Select at cursor") {
			const { newBoardData, undoToken } = BoardData.select(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Swap with cursor") {
			const { newBoardData, undoToken } = BoardData.swap(boardData);
			if (newBoardData) setBoardData(newBoardData);
			if (undoToken) setUndoTokens(a => a.concat(undoToken));
		}
		if (action == "Reset board") {
			setBoardData(BoardData.initial());
			setUndoTokens([]);
		}
		if (action == "Undo last move") {
			if (undoTokens.length > 0) {
				const last = undoTokens.at(-1)!;
				const upto = undoTokens.slice(0, -1);
				setBoardData(BoardData.undo(boardData, last));
				setUndoTokens(upto);
			}
		}
	}

	const swapsMade = BoardData.countSwapsMade(undoTokens);

	const hasSelection = BoardData.hasSelection(boardData);

	const canUndo = undoTokens.length > 0;

	return { getTileStateList, performAction, swapsMade, hasSelection, canUndo };
}
