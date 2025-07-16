import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	ImageBackground,
} from "react-native";
import { JournalContext } from "../context/JournalContext";
import { theme } from "../styles/theme";
import { format } from "date-fns";
import ScreenHeader from "../components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";

const entryBackground = require("../assets/images/entry_background.jpg");

const SingleEntryScreen = ({ route }) => {
	const { entries } = useContext(JournalContext);
	const { entryId } = route.params;
	const entry = entries.find((e) => e.id === entryId);

	if (!entry) {
		return (
			<ImageBackground
				source={entryBackground}
				style={styles.background}
				resizeMode="cover"
			>
				<LinearGradient
					colors={["rgba(0,0,0,0.4)", "transparent"]}
					style={styles.gradient}
				/>
				<SafeAreaView style={styles.container}>
					<Text style={styles.text}>Entry not found.</Text>
				</SafeAreaView>
			</ImageBackground>
		);
	}

	return (
		<ImageBackground
			source={entryBackground}
			style={styles.background}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["rgba(256,256,256,0.4)", "rgba(256,256,256,0.6)"]}
				style={styles.gradient}
			/>
			<SafeAreaView style={styles.container}>
				<ScreenHeader title="" />
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<Text style={styles.date}>
						{format(new Date(entry.datetime), "MMMM do, yyyy 'at' h:mm a")}
					</Text>
					<Text style={styles.text}>{entry.text}</Text>
				</ScrollView>
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
		height: "100%",
	},
	container: {
		flex: 1,
		paddingTop: 50,
	},
	scrollContent: {
		paddingTop: 20,
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	date: {
		fontSize: 18,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginBottom: 20,
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	text: {
		fontSize: 16,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		lineHeight: 24,
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});

export default SingleEntryScreen;
