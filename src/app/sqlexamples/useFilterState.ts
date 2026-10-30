'use client'

import { useState, useEffect } from "react";
import { useCardData, CardDataItem } from "./useCardData";

export function useFilterState() {
  const { cardData } = useCardData();

  const [selectedDialect, selectDialect] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  const dialects = function () {
    const set = cardData.reduce(
      (set, e) => set.add(e.dialect),
      new Set<CardDataItem["dialect"]>()
    );
    return Array.from(set.values());
  }();

  useEffect(
    function () {
      if (dialects.includes(selectedDialect)) return;
      selectDialect(dialects[0]);
    },
    [dialects]
  );

  return { selectedDialect, selectDialect, titleFilter, setTitleFilter, dialects };
}

export type FilterState = ReturnType<typeof useFilterState>;
