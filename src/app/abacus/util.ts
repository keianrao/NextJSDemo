
import { useState } from "react";



export type digit = 0|1|2|3|4|5|6|7|8|9;



export function createEditableDigitString(length: number) {
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



export function numberRange(min: number, max: number) {
  const hyphens = "-".repeat(max + 1 - min).split("");
  const values = hyphens.map((_, o) => min + o);
  return values;
}

export function iresc(dividend: number, multiplier: number, divisor: number) {
  const quotient = dividend * multiplier/divisor;
  return (dividend < 0 ? Math.ceil : Math.floor)(quotient);
}
