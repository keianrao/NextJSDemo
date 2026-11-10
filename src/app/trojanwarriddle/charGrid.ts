
export type CharGridType = {
	chars: string;
	columns: number;
	rows: number;
};

export const CharGrid = {
	blank: function (columns: number, rows: number) {
		const chars = " ".repeat(rows * columns);
		return { chars, columns, rows };
	},
	from: function (chars: string, columns: number, rows: number) {
		const newChars = function () {
			const providedLength = chars.length;
			const targetLength = rows * columns;
			const paddingLength = Math.max(0, targetLength - providedLength); 
			const truncated = chars.substring(0, targetLength);
			const padding = " ".repeat(paddingLength);
			return truncated + padding;
		}();
		return { chars: newChars, columns, rows };
	},
	edit: function (chargrid: CharGridType, x: number, y: number, char: string) {
		const newChars = function () {
			const { chars, columns } = chargrid;
			const o = (y * columns) + x;
			const before = chars.substring(0, o);
			const after = chars.substring(o + 1);
			return before + char + after;
		}();
		return { ...chargrid, chars: newChars };
	},
	swap: function (chargrid: CharGridType, x1: number, y1: number, x2: number, y2: number) {
		const newChars = function () {
			const { chars, columns } = chargrid;
			const [o1, o2] = function () {
				const o1 = (y1 * columns) + x1;
				const o2 = (y2 * columns) + x2;
				if (o1 < 0)  throw "Coordinates of first point invalid";
				if (o1 >= chars.length) throw "Coordinates of first point invalid";
				if (o2 < 0)  throw "Coordinates of second point invalid";
				if (o2 >= chars.length) throw "Coordinates of second point invalid";
				return [Math.min(o1, o2), Math.max(o1, o2)];
			}();
			const before = chars.substring(0, o1);
			const between = chars.substring(o1 + 1, o2);
			const after = chars.substring(o2 + 1);
			const first = chars[o1], second = chars[o2];
			return before + second + between + first + after;
		}();
		return { ...chargrid, chars: newChars };
	},
	read: function ({ chars, columns }: CharGridType, x: number, y: number) {
		return chars[(y * columns) + x];
	},
	find: function ({ chars }: CharGridType, char: string) {
		for (let o = 0; o < chars.length; ++o) if (chars[o] == char) return o;
		return -1;
	}
};
