
import cardData from "./carddata";
import pagewideCSS from "./page.module.css";



export default function Widget() {
  	const displayedCards = function () {
  	  return cardData.map(function ({ title, statement }) {
  	  	return (
  	  		<div key={title}>
  	  			<h5>{title}</h5>
  	  			<pre>{statement}</pre>
  	  		</div>
  	  	);
  	  });
  	}();

	return (
   	    <div className={pagewideCSS["cards"]}>
   	      {displayedCards}
   	    </div>
	);
};
