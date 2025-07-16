import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { theme } from "../styles/theme";

const JournalEntryItem = ({ entry }) => {
	const navigation = useNavigation();
	const preview = entry.text.substring(0, 100);

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigation.navigate("SingleEntryScreen", { entryId: entry.id })
			}
		>
			<Text style={styles.date}>
				{format(new Date(entry.datetime), "MMMM do, h:mm a")}
			</Text>
			<Text style={styles.preview}>{preview}...</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(255, 255, 255, 0.6)",
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		borderColor: theme.colors.primary,
		borderWidth: 1,
	},
	date: {
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		fontSize: 16,
		marginBottom: 5,
	},
	preview: {
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		fontSize: 14,
		opacity: 0.8,
	},
});

export default JournalEntryItem;
