'use client'

import { useState } from "react";
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
    function numberRange(min: number, max: number) {
      const hyphens = "-".repeat(max - min).split("");
      const values = hyphens.map((_, o) => min + o);
      return values;
    }

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

  // We need to define the width of the frame and each bar.
  // Then we determine the width required.
  // Height would be constant based on our bar type.
  // Maybe we can configure the bead width and height.
  const w = 80, h = 40;
  const we = 2;
  const he = 2;
  const ce = "#603030";

  const topEdge = function () {
    const attributes = {
      x: 0,
      y: 0,
      width: 100,
      height: he,
      fill: ce,
    };
    return <rect {...attributes} />;
  }();

  const bottomEdge = function () {
    const attributes = {
      x: 0,
      y: h - he,
      width: 100,
      height: he,
      fill: ce,
    };
    return <rect {...attributes} />;
  }();

  const leftEdge = function () {
    const attributes = {
      x: 0,
      y: 0,
      width: we,
      height: h,
      fill: ce,
    };
    return <rect {...attributes} />;
  }();

  const rightEdge = function () {
    const attributes = {
      x: w - we,
      y: 0,
      width: we,
      height: h,
      fill: ce,
    };
    return <rect {...attributes} />;
  }();

  return (
    <svg viewBox={[0, 0, w, h].join(" ")} role="img">
      {topEdge}{bottomEdge}{leftEdge}{rightEdge}
    </svg>
  );
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
