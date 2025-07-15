import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	ImageBackground,
	Switch,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const journalBackground = require("../assets/images/journal_background.jpg");

const JournalScreen = () => {
	const navigation = useNavigation();
	const [isKeyboardMode, setIsKeyboardMode] = useState(true);
	const [text, setText] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		if (isKeyboardMode && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isKeyboardMode]);

	return (
		<ImageBackground
			source={journalBackground}
			style={styles.background}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["rgba(0,0,0,0.5)", "transparent"]}
				style={styles.gradient}
			/>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Ionicons name="arrow-back" size={30} color={theme.colors.text} />
				</TouchableOpacity>
				<Text style={styles.title}>Journal Your Thoughts</Text>
				<View style={styles.toggleContainer}>
					<Text style={styles.toggleLabel}>Keyboard</Text>
					<Switch
						trackColor={{ false: "#767577", true: theme.colors.primary }}
						thumbColor={isKeyboardMode ? "#f4f3f4" : "#f4f3f4"}
						onValueChange={() => setIsKeyboardMode(!isKeyboardMode)}
						value={isKeyboardMode}
					/>
					<Text style={styles.toggleLabel}>Microphone</Text>
				</View>
				{isKeyboardMode ? (
					<>
						<TextInput
							ref={inputRef}
							style={styles.input}
							multiline
							value={text}
							onChangeText={setText}
							placeholder="Type your thoughts here..."
							placeholderTextColor={theme.colors.text + "80"}
						/>
						<Button
							title="Save"
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
						/>
					</>
				) : (
					<View style={styles.micContainer}>
						<Ionicons name="mic" size={100} color={theme.colors.primary} />
						<Text style={styles.comingSoon}>COMING SOON</Text>
					</View>
				)}
			</View>
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
		height: "50%", // Adjust for blur fade
	},
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	backButton: {
		position: "absolute",
		top: 40,
		left: 20,
	},
	title: {
		fontSize: 28,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		textAlign: "center",
		marginBottom: 20,
	},
	toggleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	toggleLabel: {
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginHorizontal: 10,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		backgroundColor: "rgba(255,255,255,0.8)",
	},
	micContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	comingSoon: {
		fontSize: 24,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginTop: 20,
	},
});

export default JournalScreen;
