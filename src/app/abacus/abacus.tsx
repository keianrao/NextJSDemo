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
    "className": abacusCSS["number-digit"],
    "tabIndex": 0,
    "onKeyDown": onKeyDown
  };

  return <div {...attributes}>{value}</div>;
}





export type DigitStringWidgetProps = {};

export function DigitStringWidget(props: DigitStringWidgetProps) {
  const [digitString, editDigitString] = createEditableDigitString(10);

  const attributes = {
    "className": abacusCSS["number-string"]
  };

  const digitWidgets = function () {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(offset => (
      <DigitWidget
        key={offset}
        digitString={digitString}
        onDigitKeyDown={editDigitString}
        offset={offset}
      />
    ));
  }();

  return <div {...attributes}>{digitWidgets}</div>;
}