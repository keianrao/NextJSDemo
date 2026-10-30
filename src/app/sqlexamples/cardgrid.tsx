'use client'

import { useCardData } from "./useCardData";
import { FilterState } from "./useFilterState";
import widgetClasses from "./widget.module.css";

export type CardGridProps ={
	filterState: FilterState;
};

export default function CardGrid(props: CardGridProps) {
	const { selectedDialect, titleFilter } = props.filterState;
	const { cardData } = useCardData(); 

	const matchingCardData = function () {
		return cardData
			.filter(function (item) {
				if (!selectedDialect) return true;
				return item.dialect == selectedDialect;
			})
			.filter(function (item) {
				if (!titleFilter) return true;
				const toKeywords = function (s: string) {
					return s.split(" ").filter(Boolean).map(s => s.toLowerCase());
				};
				const filterWords = toKeywords(titleFilter);
				const itemWords = [
					...toKeywords(item.title),
					...toKeywords(item.extra_keywords)
				]
				return filterWords.every(word => itemWords.includes(word));
			});
	}();

  	const cardGridItems = function () {
  	  return matchingCardData.map(function ({ title, statement }) {
  	  	return (
  	  		<div key={title}>
  	  			<h5>{title}</h5>
  	  			<pre>{statement}</pre>
  	  		</div>
  	  	);
  	  });
  	}();

	return (
   	    <div className={widgetClasses["card-grid"]}>
   	      {cardGridItems}
   	    </div>
	);
};
