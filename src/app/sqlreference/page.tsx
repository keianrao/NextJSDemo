import type { Metadata } from "next";
import Widget from "./widget";

export const metadata: Metadata = {
  title: "Basic SQL reference",
  description: "Diagram of basic operations in various SQL dialects",
};

export default function Page() {
  return <Widget />;
}
