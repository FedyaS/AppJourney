import React from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
} from "react-native";
import { theme } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const homeBackground = require("../assets/images/home_background.jpg");

const HomeScreen = () => {
	const navigation = useNavigation();

	return (
		<ImageBackground
			source={homeBackground}
			style={styles.background}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["rgba(100,100,100,0.4)", "rgba(100,256,256,0.4)"]} // Single color effect
				style={styles.gradient}
			/>
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Your Personal Journal</Text>
				<Text style={styles.filler}>Your Journal is Your Journey</Text>
				<Button
					title="Make Journal Entry"
					color={theme.colors.primary}
					onPress={() => navigation.navigate("JournalScreen")}
				/>
				<View style={styles.buttonSpacer} />
				<Button
					title="See Journal Entries"
					color={theme.colors.primary}
					onPress={() => navigation.navigate("JournalEntriesScreen")}
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
		height: "100%",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginBottom: 10,
		textShadowColor: "rgba(256, 256, 256, 0.9)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 2000,
	},
	filler: {
		fontSize: 18,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginBottom: 20,
		textShadowColor: "rgba(256, 256, 256, 0.9)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 2000,
	},
	buttonSpacer: {
		height: 10,
	},
});

export default HomeScreen;
