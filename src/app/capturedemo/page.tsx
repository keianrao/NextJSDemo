
import type { Metadata } from "next";
import CaptureDemo from "./capturedemo";

export const metadata: Metadata = {
  title: "Screen capture",
  description: "Check for the Screen Capture API",
};

export default function Page() {
  return <>
    <CaptureDemo />
  </>;
}
