
import type { Metadata } from "next";
import Widget from "./widget";

export const metadata: Metadata = {
  title: "Basic SQL examples",
  description: "Reference of examples of basic operations in different SQL dialects",
};

export default function Page() {
  return <Widget />;
}
