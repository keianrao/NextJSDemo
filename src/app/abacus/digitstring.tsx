'use client'

import { digit, numberRange } from "./util";
import { createEditableDigitString } from "./util";
import widgetCSS from "./digitstring.module.css";





type DigitDisplayProps = {
  digitString: string;
  offset: number;
  onDigitKeyDown?: (digit: digit, offset: number) => any;
};

function DigitDisplay(props: DigitDisplayProps) {
  const { digitString, offset, onDigitKeyDown } = props;

  const value = digitString[offset];

  function onKeyDown({ code }: { code: string }) {
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
    if (code == "Backspace") onDigitKeyDown(0, offset);
    if (code == "Delete") onDigitKeyDown(0, offset);
  }

  const attributes = {
    "className": widgetCSS["digit"],
    "tabIndex": 0,
    "onKeyDown": onKeyDown
  };

  return <div {...attributes}>{value}</div>;
}





export type DigitStringDisplayProps = {
  digitString: ReturnType<typeof createEditableDigitString>[0],
  editDigitString: ReturnType<typeof createEditableDigitString>[1],
};

export function DigitStringDisplay(props: DigitStringDisplayProps) {
  const { digitString, editDigitString } = props;

  const digitCount = digitString.length;

  const DigitDisplays = function () {
    return numberRange(0, digitCount - 1).map(offset => (
      <DigitDisplay
        key={offset}
        digitString={digitString}
        onDigitKeyDown={editDigitString}
        offset={offset}
      />
    ));
  }();

  const attributes = {
    "className": widgetCSS["digit-string"]
  };

  return <div {...attributes}>{DigitDisplays}</div>;
}
