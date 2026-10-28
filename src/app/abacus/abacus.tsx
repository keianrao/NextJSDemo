
import abacusCSS from "./abacus.module.css";



function forceIntoDigitString(number: number, length: number) {
  const integerNumber = Math.floor(number);
  const integerString = integerNumber.toString();
  const overflow = Math.max(0, integerString.length - length);
  const underflow = Math.max(0, length - integerString.length);
  return "0".repeat(underflow) + integerString.substring(overflow);
}



type NumberDigitProps = {
  renderedInteger: string;
  offset: number;
};

function NumberDigit({ renderedInteger, offset }: NumberDigitProps) {
  const value = renderedInteger[offset];
  const classes = abacusCSS["number-digit"];
  return <div className={classes} tabIndex={0}>{value}</div>;
}



export type NumberStringProps = {
  value: number;
};

export function NumberString({ value }: NumberStringProps) {
  const renderedInteger = forceIntoDigitString(value, 10);
  const classes = abacusCSS["number-string"];
  const ndCommon = { renderedInteger };
  return (
    <div className={classes}>
      <NumberDigit {...ndCommon} offset={0} />
      <NumberDigit {...ndCommon} offset={1} />
      <NumberDigit {...ndCommon} offset={2} />
      <NumberDigit {...ndCommon} offset={3} />
      <NumberDigit {...ndCommon} offset={4} />
      <NumberDigit {...ndCommon} offset={5} />
      <NumberDigit {...ndCommon} offset={6} />
      <NumberDigit {...ndCommon} offset={7} />
      <NumberDigit {...ndCommon} offset={8} />
      <NumberDigit {...ndCommon} offset={9} />
    </div>
  );
}