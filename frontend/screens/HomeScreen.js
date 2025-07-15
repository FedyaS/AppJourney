import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Personal Journal</Text>
			<Text style={styles.filler}>Your Journal is Your Journey</Text>
			<Button
				title="Make Journal Entry"
				color={theme.colors.primary}
				onPress={() => navigation.navigate("JournalScreen")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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
	},
	filler: {
		fontSize: 18,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginBottom: 20,
	},
});

export default HomeScreen;
