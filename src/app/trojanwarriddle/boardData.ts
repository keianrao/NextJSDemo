
import type { CharGridType } from "./charGrid";
import { CharGrid } from "./charGrid";

type Point = [number, number];

export type BoardDataType = {
	teams: CharGridType;
	locks: CharGridType;
	selection: Point;
	cursor: Point;
	swapsMade: number;
};

export const BoardData = {
	initial: function () {
		const teams = function () {
			const a = "GGGGTGGGGG";
			const b = "TTTTGTTTTT";
			const chars = a.repeat(5) + b + a.repeat(5);
			return CharGrid.from(chars, 10, 11);
		}();
		const locks = function () {
			return CharGrid.blank(10, 11);
		}();
		const selection = [-1, -1] as Point;
		const cursor = [0, 0] as Point;
		const swapsMade = 0;
		return { teams, locks, selection, cursor, swapsMade };
	},
	up: function (boardData: BoardDataType) {
		const [x, y] = boardData.cursor;
		if (y == 0) return boardData;
		return { ...boardData, cursor: [x, y - 1] as Point };
	},
	down: function (boardData: BoardDataType) {
		const [x, y] = boardData.cursor;
		if (y == (11 - 1)) return boardData;
		return { ...boardData, cursor: [x, y + 1] as Point };
	},
	left: function (boardData: BoardDataType) {
		const [x, y] = boardData.cursor;
		if (x == 0) return boardData;
		return { ...boardData, cursor: [x - 1, y] as Point };
	},
	right: function (boardData: BoardDataType) {
		const [x, y] = boardData.cursor;
		if (x == (10 - 1)) return boardData;
		return { ...boardData, cursor: [x + 1, y] as Point };
	},
	select: function (boardData: BoardDataType) {
		return { ...boardData, selection: [...boardData.cursor] as Point };
	},
	swap: function (boardData: BoardDataType) {
		const { teams, locks, selection, cursor, swapsMade } = boardData;
		const { swap, edit } = CharGrid;
		const [xs, ys, xc, yc] = [...selection, ...cursor];
		return {
			...boardData,
			teams: swap(teams, xs, ys, xc, yc),
			locks: edit(edit(locks, xc, yc, "*"), xs, ys, "*"),
			selection: [-1, -1] as Point,
			swapsMade: swapsMade + 1
		};
	},
	tileStateList: function (boardData: BoardDataType) {
		const { teams, locks, selection, cursor } = boardData;
		const returnee = [];
		for (let y = 0; y < 11; ++y)
		for (let x = 0; x < 10; ++x) {
			const isGreek = CharGrid.read(teams, x, y) == "G";
			const isTrojan = CharGrid.read(teams, x, y) == "T";
			const isLocked = CharGrid.read(teams, x, y) == "*";
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
	}
};