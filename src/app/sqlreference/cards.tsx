
import data from "./data";
import { FilterState } from "./widget";
import widgetClasses from "./widget.module.css";



export type CardsProps ={
	filterState: FilterState
};

export default function Cards(props: CardsProps) {
	const { selectedDialect, titleFilter } = props.filterState;

	const matchingData = function () {
		return data
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
				const itemWords = toKeywords(item.title);
				return itemWords.some(word => filterWords.includes(word));
			});
	}();

  	const displayedCards = function () {
  	  return matchingData.map(function ({ title, statement }) {
  	  	return (
  	  		<div key={title}>
  	  			<h5>{title}</h5>
  	  			<pre>{statement}</pre>
  	  		</div>
  	  	);
  	  });
  	}();

	return (
   	    <div className={widgetClasses["cards"]}>
   	      {displayedCards}
   	    </div>
	);
};
