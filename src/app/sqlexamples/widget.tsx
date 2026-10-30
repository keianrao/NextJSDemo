'use client'

import { useFilterState } from "./useFilterState";
import FilterControls from "./filtercontrols";
import CardGrid from "./cardgrid";
import widgetClasses from "./widget.module.css";

export default function Widget() {
  const filterState = useFilterState();

  return (
    <div className={widgetClasses.widget}>
      <FilterControls filterState={filterState} />
      <CardGrid filterState={filterState} />
    </div>
  );
}
