'use client'

import { useState } from "react";
import { Fragment } from "react";
import { DigitStringDisplay } from "./digitstring";
import { digit, numberRange, iresc } from "./util";
import { useEditableDigitString } from "./util";
import widgetClasses from "./abacus.module.css";





type AbacusDisplayProps = {
  digitString: ReturnType<typeof useEditableDigitString>[0]
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





export type AbacusProps = {
  columnCount: number,
  className?: string
};

export function Abacus(props: AbacusProps) {
  const { columnCount, className, ...otherAttrs } = props;
  
  const [digitString, editDigitString] = useEditableDigitString(columnCount);

  const attributes = {
    "className": [className, widgetClasses.abacus].filter(Boolean).join(" ")
  };

  return (
    <div {...attributes} {...otherAttrs}>
      <DigitStringDisplay
        digitString={digitString}
        editDigitString={editDigitString}
      />
      <AbacusDisplay
        digitString={digitString}
      />
    </div>
  );
}
