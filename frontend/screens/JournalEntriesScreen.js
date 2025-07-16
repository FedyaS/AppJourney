import React, { useContext } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { JournalContext } from "../context/JournalContext";
import JournalEntryItem from "../components/JournalEntryItem";
import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const JournalEntriesScreen = () => {
	const { entries } = useContext(JournalContext);
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Ionicons name="arrow-back" size={30} color={theme.colors.text} />
			</TouchableOpacity>
			<Text style={styles.title}>Journal Entries</Text>
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
	backButton: {
		position: "absolute",
		top: 50,
		left: 20,
		zIndex: 1,
		backgroundColor: "transparent",
		padding: 10,
	},
	title: {
		fontSize: 28,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		textAlign: "center",
		marginBottom: 20,
	},
	list: {
		paddingHorizontal: 20,
	},
});

export default JournalEntriesScreen;
