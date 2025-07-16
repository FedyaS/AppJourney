import React, { createContext, useState, useEffect } from "react";
import * as journalService from "../services/journalService";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
	const [entries, setEntries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadEntries = async () => {
			const storedEntries = await journalService.getEntries();
			setEntries(storedEntries);
			setIsLoading(false);
		};

		loadEntries();
	}, []);

	const addEntry = async (text) => {
		const newEntry = {
			id: Date.now().toString(),
			text: text,
			datetime: new Date(),
		};
		const updatedEntries = [newEntry, ...entries];
		setEntries(updatedEntries);
		await journalService.saveEntries(updatedEntries);
	};

	return (
		<JournalContext.Provider value={{ entries, isLoading, addEntry }}>
			{children}
		</JournalContext.Provider>
	);
};
