import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { JournalContext } from "../context/JournalContext";
import JournalEntryItem from "../components/JournalEntryItem";
import { theme } from "../styles/theme";
import ScreenHeader from "../components/ScreenHeader";

const JournalEntriesScreen = () => {
	const { entries } = useContext(JournalContext);

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="Journal Entries" />
			<FlatList
				data={entries}
				renderItem={({ item }) => <JournalEntryItem entry={item} />}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		paddingTop: 50,
	},
	list: {
		paddingTop: 20,
		paddingHorizontal: 20,
	},
});

export default JournalEntriesScreen;
