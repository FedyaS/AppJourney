import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { JournalContext } from "../context/JournalContext";
import { theme } from "../styles/theme";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SingleEntryScreen = ({ route }) => {
	const { entries } = useContext(JournalContext);
	const { entryId } = route.params;
	const entry = entries.find((e) => e.id === entryId);
	const navigation = useNavigation();

	if (!entry) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.text}>Entry not found.</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Ionicons name="arrow-back" size={30} color={theme.colors.text} />
			</TouchableOpacity>
			<ScrollView>
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
		padding: 20,
		paddingTop: 50,
	},
	backButton: {
		position: "absolute",
		top: 50,
		left: 20,
		zIndex: 1,
		backgroundColor: "transparent",
		padding: 10,
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
