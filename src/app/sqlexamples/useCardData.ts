'use client'

import { useState, useEffect } from "react";

export type CardDataItem = {
	dialect: string;
	title: string;
	statement: string;
	extra_keywords: string;
};

export type CardData = CardDataItem[];

export function useCardData() {
	// This hook is heavily used, can we centralise them in some way
	// without resorting to putting in container and passing by prop?

	const [cardData, setCardData] = useState<CardData>([]);
	const [cardDataError, setCardDataError] = useState<any>();

	const fetchCardData = async function() {
		try {
			setCardData([]);
			setCardDataError(undefined);

			const httpResponse = await fetch("/api/sqlexamples");
			if (!httpResponse.ok) {
				const { status, statusText } = httpResponse;
				throw new Error(status + ": " + statusText);
			}

			const jsonResponse = await httpResponse.json();
			if (!(jsonResponse instanceof Array)) {
				throw new Error("Data loaded is invalid");
			}

			setCardData(jsonResponse as CardData);
			setCardDataError(undefined);
		}
		catch (error: any) {
			setCardData([]);
			setCardDataError(error);
		}
	};

	useEffect(() => (fetchCardData(), undefined), []);

	return { cardData, cardDataError, fetchCardData };
}
