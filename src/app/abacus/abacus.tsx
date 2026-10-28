'use client'

import { useState } from "react";
import { Fragment } from "react";
import abacusCSS from "./abacus.module.css";





type digit = 0|1|2|3|4|5|6|7|8|9;

function createEditableDigitString(length: number) {
  function forceIntoDigitString(number: number, length: number) {
    const integerNumber = Math.floor(number);
    const integerString = integerNumber.toString();
    const overflow = Math.max(0, integerString.length - length);
    const underflow = Math.max(0, length - integerString.length);
    return "0".repeat(underflow) + integerString.substring(overflow);
  }

  const initial = forceIntoDigitString(0, length);

  const [digitString, setDigitString] = useState(initial);

  function editDigitString(digit: digit, offset: number) {
    setDigitString(function (digitString) {
      const prefix = digitString.substring(0, offset);
      const suffix = digitString.substring(offset + 1);
      return prefix + digit + suffix;
    });
  }

  return [digitString, editDigitString];
}

function numberRange(min: number, max: number) {
  const hyphens = "-".repeat(max + 1 - min).split("");
  const values = hyphens.map((_, o) => min + o);
  return values;
}

function iresc(dividend: number, multiplier: number, divisor: number) {
  const quotient = dividend * multiplier/divisor;
  return (dividend < 0 ? Math.ceil : Math.floor)(quotient);
}





type DigitWidgetProps = {
  digitString: string;
  offset: number;
  onDigitKeyDown?: (digit: digit, offset: number) => any;
};

function DigitWidget(props: DigitWidgetProps) {
  const { digitString, offset, onDigitKeyDown } = props;

  const value = digitString[offset];

  function onKeyDown({ code }) {
    if (!onDigitKeyDown) return;
    if (code == "Digit0") onDigitKeyDown(0, offset);
    if (code == "Digit1") onDigitKeyDown(1, offset);
    if (code == "Digit2") onDigitKeyDown(2, offset);
    if (code == "Digit3") onDigitKeyDown(3, offset);
    if (code == "Digit4") onDigitKeyDown(4, offset);
    if (code == "Digit5") onDigitKeyDown(5, offset);
    if (code == "Digit6") onDigitKeyDown(6, offset);
    if (code == "Digit7") onDigitKeyDown(7, offset);
    if (code == "Digit8") onDigitKeyDown(8, offset);
    if (code == "Digit9") onDigitKeyDown(9, offset);
  }

  const attributes = {
    "className": abacusCSS["digit"],
    "tabIndex": 0,
    "onKeyDown": onKeyDown
  };

  return <div {...attributes}>{value}</div>;
}





export type DigitStringWidgetProps = {
  digitString: ReturnType<typeof createEditableDigitString>[0],
  editDigitString: ReturnType<typeof createEditableDigitString>[1],
};

export function DigitStringWidget(props: DigitStringWidgetProps) {
  const { digitString, editDigitString } = props;

  const digitCount = digitString.length;

  const digitWidgets = function () {
    return numberRange(0, digitCount - 1).map(offset => (
      <DigitWidget
        key={offset}
        digitString={digitString}
        onDigitKeyDown={editDigitString}
        offset={offset}
      />
    ));
  }();

  const attributes = {
    "className": abacusCSS["digit-string"]
  };

  return <div {...attributes}>{digitWidgets}</div>;
}





type AbacusDisplayProps = {
  digitString: ReturnType<typeof createEditableDigitString>[0]
};

function AbacusDisplay(props: AbacusDisplayProps) {
  const { digitString } = props;

  const digitCount = digitString.length;

  const beadWidth = 8;
  const beadHeight = 4;
  const reckoningBarWidth = 2;
  const horizontalEdgeWidth = 2;
  const verticalEdgeWidth = 2;
  
  const columnWidth = iresc(beadWidth, 3, 2);
  const columnHeight = (7 * beadHeight) + (reckoningBarWidth);
  const barWidth = iresc(beadWidth, 1, 8);
  const barHeight = columnHeight;
  const hollowX = horizontalEdgeWidth;
  const hollowY = verticalEdgeWidth;
  const hollowWidth = columnWidth * digitCount;
  const hollowHeight = columnHeight;
  const reckoningBarTop = hollowY + (beadHeight * 2);
  const reckoningBarBottom = reckoningBarTop + reckoningBarWidth;
  const frameX = 0;
  const frameY = 0;
  const frameWidth = hollowWidth + (horizontalEdgeWidth * 2);
  const frameHeight = hollowHeight + (verticalEdgeWidth * 2);
  const viewX = frameX;
  const viewY = frameY;
  const viewWidth = frameWidth;
  const viewHeight = frameHeight;

  const bars = function () {
    const barColour = "#A08060";

    return numberRange(1, digitCount).map(function (index) {
      return (
        <rect
          key={index}
          fill={barColour}
          width={barWidth}
          height={barHeight}
          y={hollowY}
          x={hollowX + (index * columnWidth) - (columnWidth / 2) - (barWidth / 2)}
        />
      );
    });
  }();

  const beads = function () {
    const beadTopColour = "#404080";
    const beadBottomColour = "#202040";

    return numberRange(1, digitCount).map(function (index) {
      function beadAtY(yo: number) {
        const xo = hollowX + (index * columnWidth) - (columnWidth / 2);
        const x1 = xo + iresc(beadWidth, -4, 8), y1 = yo + beadHeight / 2;
        const x2 = xo + iresc(beadWidth, +4, 8), y2 = yo + beadHeight / 2;
        const x3 = xo + iresc(beadWidth, +1, 8), y3 = yo + 0;
        const x4 = xo + iresc(beadWidth, -1, 8), y4 = yo + 0;
        const x5 = x1, y5 = y1;
        const x6 = x2, y6 = y2;
        const x7 = x3, y7 = yo + beadHeight;
        const x8 = x4, y8 = yo + beadHeight;
        const topPoints = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
        const bottomPoints = [[x5, y5], [x6, y6], [x7, y7], [x8, y8]];
        const sTopPoints = topPoints.map(v => v.join(",")).join(" ");
        const sBottomPoints = bottomPoints.map(v => v.join(",")).join(" ");
        const upper = <polygon fill={beadTopColour} points={sTopPoints} />;
        const lower = <polygon fill={beadBottomColour} points={sBottomPoints}/>;
        return <>{upper}{lower}</>;
      }

      const digit = Number(digitString[index - 1]);
      const showHeaven1 = digit < 5;
      const showHeaven2 = digit >= 5;
      const showEarth1 = (digit % 5) != 0; 
      const showEarth2 = (digit % 5) != 1; 
      const showEarth3 = (digit % 5) != 2; 
      const showEarth4 = (digit % 5) != 3; 
      const showEarth5 = (digit % 5) != 4;

      const yHeaven1 = reckoningBarTop + (beadHeight * -2);
      const yHeaven2 = reckoningBarTop + (beadHeight * -1);
      const yEarth1 = reckoningBarBottom + (beadHeight * +0);
      const yEarth2 = reckoningBarBottom + (beadHeight * +1);
      const yEarth3 = reckoningBarBottom + (beadHeight * +2);
      const yEarth4 = reckoningBarBottom + (beadHeight * +3);
      const yEarth5 = reckoningBarBottom + (beadHeight * +4);

      return (
        <Fragment key={index}>
          {showHeaven1 && beadAtY(yHeaven1)}
          {showHeaven2 && beadAtY(yHeaven2)}
          {showEarth1 && beadAtY(yEarth1)}
          {showEarth2 && beadAtY(yEarth2)}
          {showEarth3 && beadAtY(yEarth3)}
          {showEarth4 && beadAtY(yEarth4)}
          {showEarth5 && beadAtY(yEarth5)}
        </Fragment>
      );
    });
  }();

  const frame = function () {
    const frameColour = "#603030";

    const top = (
      <rect
        fill={frameColour}
        width={frameWidth}
        height={verticalEdgeWidth}
        x={frameX + 0}
        y={frameY + 0}
      />
    );

    const bottom = (
      <rect
        fill={frameColour}
        width={frameWidth}
        height={verticalEdgeWidth}
        x={frameX + 0}
        y={frameY + frameHeight - verticalEdgeWidth}
      />
    );

    const middle = (
      <rect
        fill={frameColour}
        width={frameWidth}
        height={reckoningBarWidth}
        x={frameX + 0}
        y={reckoningBarTop}
      />
    );

    const left = (
      <rect
        fill={frameColour}
        width={horizontalEdgeWidth}
        height={frameHeight}
        y={frameX + 0}
        x={frameY + 0}
      />
    );

    const right = (
      <rect
        fill={frameColour}
        width={horizontalEdgeWidth}
        height={frameHeight}
        y={frameX + 0}
        x={frameY + frameWidth - horizontalEdgeWidth}
      />
    );

    return <>{top}{bottom}{middle}{left}{right}</>;
  }();

  const attributes = {
    "viewBox": [viewX, viewY, viewWidth, viewHeight].join(" "),
    "role": "img"
  };

  return <svg {...attributes}>{bars}{beads}{frame}</svg>;
}




export type AbacusProps = {};

export function Abacus(props: AbacusProps) {
  const [digitString, editDigitString] = createEditableDigitString(16);

  const attributes = {
    "className": abacusCSS["abacus"]
  };

  return (
    <div {...attributes}>
      <DigitStringWidget
        digitString={digitString}
        editDigitString={editDigitString}
      />
      <AbacusDisplay
        digitString={digitString}
      />
    </div>
  );
}
