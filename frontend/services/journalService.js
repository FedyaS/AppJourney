import AsyncStorage from "@react-native-async-storage/async-storage";

const ENTRIES_KEY = "journal_entries";

export const saveEntries = async (entries) => {
	try {
		const jsonValue = JSON.stringify(entries);
		await AsyncStorage.setItem(ENTRIES_KEY, jsonValue);
	} catch (e) {
		console.error("Failed to save entries.", e);
	}
};

export const getEntries = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(ENTRIES_KEY);
		return jsonValue != null ? JSON.parse(jsonValue) : [];
	} catch (e) {
		console.error("Failed to fetch entries.", e);
		return [];
	}
};
