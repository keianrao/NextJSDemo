
import type { Metadata } from "next";
import Widget from "./widget";
import widgetClasses from "./widget.module.css";

function Context() {
  return (
    <div className={widgetClasses["context"]}>
      <p>
        This page was created to let visitors try out the
        first riddle described in the following video:
      </p>
      <p>
        <span>Title</span><span>:</span>
        <span>Can you solve the Trojan War riddle?</span>
        <span>Presenter</span><span>:</span>
        <span>Dennis E. Shasha</span>
        <span>Channel</span><span>:</span>
        <span>TED-Ed</span>
        <span>Link</span><span>:</span>
        <span>
          <a href="https://www.youtube.com/watch?v=MJ5CRZFSlAU">
            https://www.youtube.com/watch?v=MJ5CRZFSlAU
          </a>
        </span>
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Trojan War riddle",
  description: "A page to try out a board-based riddle from a video",
};

export default function Page() {
  return <>
    <Context />
    <Widget />
  </>;
}
