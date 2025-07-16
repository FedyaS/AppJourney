import React, { useContext } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import { JournalContext } from "../context/JournalContext";
import JournalEntryItem from "../components/JournalEntryItem";
import { theme } from "../styles/theme";
import ScreenHeader from "../components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";

const entriesBackground = require("../assets/images/entries_background.jpg");

const JournalEntriesScreen = () => {
	const { entries } = useContext(JournalContext);

	return (
		<ImageBackground
			source={entriesBackground}
			style={styles.background}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["rgba(0,0,0,0.3)", "transparent"]}
				style={styles.gradient}
			/>
			<SafeAreaView style={styles.container}>
				<ScreenHeader title="Journal Entries" />
				<FlatList
					data={entries}
					renderItem={({ item }) => <JournalEntryItem entry={item} />}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.list}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: "50%",
	},
	container: {
		flex: 1,
		paddingTop: 50,
	},
	list: {
		paddingTop: 20,
		paddingHorizontal: 20,
	},
});

export default JournalEntriesScreen;
