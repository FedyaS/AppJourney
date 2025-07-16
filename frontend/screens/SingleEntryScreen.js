import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { JournalContext } from "../context/JournalContext";
import { theme } from "../styles/theme";
import { format } from "date-fns";
import ScreenHeader from "../components/ScreenHeader";

const SingleEntryScreen = ({ route }) => {
	const { entries } = useContext(JournalContext);
	const { entryId } = route.params;
	const entry = entries.find((e) => e.id === entryId);

	if (!entry) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.text}>Entry not found.</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader title="" />
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.date}>
					{format(new Date(entry.datetime), "MMMM do, yyyy 'at' h:mm a")}
				</Text>
				<Text style={styles.text}>{entry.text}</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		paddingTop: 50,
	},
	scrollContent: {
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	date: {
		fontSize: 18,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginBottom: 20,
		textAlign: "center",
	},
	text: {
		fontSize: 16,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		lineHeight: 24,
	},
});

export default SingleEntryScreen;
