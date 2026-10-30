'use client'

import { useState, useEffect } from "react";

export type DialectCaveat = {
	dialect: string;
	text: string;
};

export type DialectReference = {
	dialect: string;
	link: string;
}

export function useDialectNotes() {
	const [dialectCaveats, setDialectCaveats] = useState<DialectCaveat[]>([]);
	const [dialectReferences, setDialectReferences] = useState<DialectReference[]>([]);
	const [dialectNotesError, setDialectNotesError] = useState<any>();

	const fetchDialectNotes = async function() {
		try {
			setDialectCaveats([]);
			setDialectReferences([]);
			setDialectNotesError(undefined);

			const httpResponse = await fetch("/api/sqlexamples/notes");
			if (!httpResponse.ok) {
				const { status, statusText } = httpResponse;
				throw new Error(status + ": " + statusText);
			}

			const jsonResponse = await httpResponse.json();
			if (!(jsonResponse instanceof Object)) {
				throw new Error("Data loaded is invalid");
			}

			// Moreso than ever now, it'd be nice to have a validator.

			setDialectCaveats(jsonResponse.caveats as DialectCaveat[]);
			setDialectReferences(jsonResponse.references as DialectReference[]);
			setDialectNotesError(undefined);
		}
		catch (error: any) {
			setDialectCaveats([]);
			setDialectReferences([]);
			setDialectNotesError(error);
		}
	};

	useEffect(() => (fetchDialectNotes(), undefined), []);

	return { dialectCaveats, dialectReferences, dialectNotesError, fetchDialectNotes };
}
