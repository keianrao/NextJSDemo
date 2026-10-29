'use client'

import { useState } from "react";
import Controls from "./controls";
import Cards from "./cards";
import data from "./data";
import widgetClasses from "./widget.module.css";



export const dialects = function () {
  const set = data.reduce(
    (set, e) => set.add(e.dialect),
    new Set<typeof data[number]["dialect"]>()
  );
  return Array.from(set.values());
}();

export type Dialect = typeof dialects[number];



export function useFilterState() {
  const [selectedDialect, selectDialect] = useState(dialects[0]);
  const [titleFilter, setTitleFilter] = useState("");
  return { selectedDialect, selectDialect, titleFilter, setTitleFilter };
}

export type FilterState = ReturnType<typeof useFilterState>;



export default function Widget() {
  const filterState = useFilterState();

  return (
    <div className={widgetClasses.widget}>
      <Controls filterState={filterState} />
      <Cards filterState={filterState} />
    </div>
  );
}
