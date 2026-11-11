
import type { CharGridType } from "./charGrid";
import { CharGrid } from "./charGrid";

type Point = [number, number];

export type BoardDataType = {
	teams: CharGridType;
	locks: CharGridType;
	selection: Point;
	cursor: Point;
};

export type BoardDataUndoToken = {
	type: string;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
};

export const BoardData = {
	initial: function () {
		happyPath: {
			const teams = function () {
				const a = "GGGGTGGGGG";
				const b = "TTTTGTTTTT";
				const chars = a.repeat(5) + b + a.repeat(5);
				return CharGrid.from(chars, 10, 11);
			}();
			const locks = function () {
				return CharGrid.blank(10, 11);
			}();
			const selection: Point = [-1, -1];
			const cursor: Point = [0, 0];
			return { teams, locks, selection, cursor };
		}
	},
	up: function (boardData: BoardDataType) {
		happyPath: {
			const [x, y] = boardData.cursor;
			if (y == 0) break happyPath;
			const newCursor: Point = [x, y - 1];
			const newBoardData = { ...boardData, cursor: newCursor };	
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	down: function (boardData: BoardDataType) {
		happyPath: {
			const [x, y] = boardData.cursor;
			if (y == (11 - 1)) break happyPath;
			const newCursor: Point = [x, y + 1];
			const newBoardData = { ...boardData, cursor: newCursor };
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	left: function (boardData: BoardDataType) {
		happyPath: {
			const [x, y] = boardData.cursor;
			if (x == 0) break happyPath;
			const newCursor: Point = [x - 1, y];
			const newBoardData = { ...boardData, cursor: newCursor };
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	right: function (boardData: BoardDataType) {
		happyPath: {
			const [x, y] = boardData.cursor;
			if (x == (10 - 1)) break happyPath;
			const newCursor: Point = [x + 1, y];
			const newBoardData = { ...boardData, cursor: newCursor };
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	to: function (boardData: BoardDataType, x: number, y: number) {
		happyPath: {
			const newBoardData = { ...boardData, cursor: [x, y] as Point };
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	select: function (boardData: BoardDataType) {
		happyPath: {
			const { locks, cursor: [xc, yc] } = boardData;
			
			const lockedAtCursor = CharGrid.read(locks, xc, yc) == "*";
			if (lockedAtCursor) break happyPath;
			
			const newSelection: Point = [xc, yc];
			const newBoardData = { ...boardData, selection: newSelection };
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	swap: function (boardData: BoardDataType) {
		happyPath: {
			const { swap, edit } = CharGrid;
			const { teams, locks } = boardData;
			const { selection: [xs, ys], cursor: [xc, yc] } = boardData;
			
			const lockedAtCursor = CharGrid.read(locks, xc, yc) == "*";
			if (lockedAtCursor) break happyPath;
			if (xs == -1 || ys == -1) break happyPath;
			if (xs == xc && ys == yc) break happyPath;
			
			const newBoardData = {
				...boardData,
				teams: swap(teams, xs, ys, xc, yc),
				locks: edit(edit(locks, xc, yc, "*"), xs, ys, "*"),
				selection: [-1, -1] as Point
			};
			const undoToken = { type: "swap", x1: xs, y1: ys, x2: xc, y2: yc };
			return { newBoardData, undoToken };
		}
		ignorePath: {
			const newBoardData = undefined;
			const undoToken = undefined;
			return { newBoardData, undoToken };
		}
	},
	undo: function (boardData: BoardDataType, undoToken: BoardDataUndoToken) {
		if (undoToken.type == "swap") {
			const { teams, locks } = boardData;
			const x1 = undoToken.x1!;
			const y1 = undoToken.y1!;
			const x2 = undoToken.x2!;
			const y2 = undoToken.y2!;
			const { swap, edit } = CharGrid;
			return {
				...boardData,
				teams: swap(teams, x1, y1, x2, y2),
				locks: edit(edit(locks, x1, y1, " "), x2, y2, " "),
				selection: [-1, -1] as Point
			};
		}
		return boardData;
	},
	tileStateList: function (boardData: BoardDataType) {
		const { teams, locks, selection, cursor } = boardData;
		const returnee = [];
		for (let y = 0; y < 11; ++y)
		for (let x = 0; x < 10; ++x) {
			const isGreek = CharGrid.read(teams, x, y) == "G";
			const isTrojan = CharGrid.read(teams, x, y) == "T";
			const isLocked = CharGrid.read(locks, x, y) == "*";
			const isSelected = x == selection[0] && y == selection[1];
			const isCursor = x == cursor[0] && y == cursor[1];
			const flags = { isGreek, isTrojan, isLocked, isSelected, isCursor };
			returnee.push({ x, y, ...flags });
		}
		return returnee;
	},
	hasSelection: function (boardData: BoardDataType) {
		const a = boardData.selection[0] != -1;
		const b = boardData.selection[1] != -1;
		return a && b;
	},
	countSwapsMade: function (undoTokens: BoardDataUndoToken[]) {
		return undoTokens.filter(e => e.type == "swap").length;
	}
};