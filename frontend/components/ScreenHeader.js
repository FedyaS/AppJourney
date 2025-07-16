import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

const ScreenHeader = ({ title }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Ionicons name="arrow-back" size={30} color={theme.colors.text} />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		minHeight: 50,
		paddingHorizontal: 20, // Match JournalScreen's container padding
	},
	backButton: {
		position: "absolute",
		left: 10, // Match JournalScreen
		top: 0,
		bottom: 0,
		justifyContent: "center",
		padding: 10,
		zIndex: 1,
		backgroundColor: "transparent",
	},
	title: {
		fontSize: 28,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		textAlign: "center",
	},
});

export default ScreenHeader;
