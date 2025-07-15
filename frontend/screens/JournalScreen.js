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
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	Animated,
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
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (isKeyboardMode && inputRef.current) {
			// Always keep keyboard up in keyboard mode
			inputRef.current.focus();
			// Animate text input appearance
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [isKeyboardMode]);

	const handleTextInputBlur = () => {
		// Prevent keyboard from dismissing in keyboard mode
		if (isKeyboardMode && inputRef.current) {
			inputRef.current.focus();
		}
	};

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
			<SafeAreaView style={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Ionicons name="arrow-back" size={30} color={theme.colors.text} />
				</TouchableOpacity>
				<Text style={styles.title}>Journal Your Thoughts</Text>
				<View style={styles.toggleContainer}>
					<Text style={styles.toggleLabel}>Microphone</Text>
					<Switch
						trackColor={{ false: "#767577", true: theme.colors.primary }}
						thumbColor={isKeyboardMode ? "#f4f3f4" : "#f4f3f4"}
						onValueChange={() => setIsKeyboardMode(!isKeyboardMode)}
						value={isKeyboardMode}
					/>
					<Text style={styles.toggleLabel}>Keyboard</Text>
				</View>
				{isKeyboardMode ? (
					<KeyboardAvoidingView
						style={styles.keyboardAvoidingView}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
					>
						<Animated.View
							style={[styles.textContainer, { opacity: fadeAnim }]}
						>
							<ScrollView
								style={styles.textScrollView}
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps="handled"
								contentContainerStyle={styles.scrollContentContainer}
							>
								<TextInput
									ref={inputRef}
									style={styles.input}
									multiline
									value={text}
									onChangeText={setText}
									placeholder="Pour your thoughts onto the page..."
									placeholderTextColor={"#666666"}
									textAlignVertical="top"
									scrollEnabled={false}
									maxLength={5000}
									onBlur={handleTextInputBlur}
									autoFocus={true}
									blurOnSubmit={false}
								/>
							</ScrollView>
						</Animated.View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.saveButton}
								onPress={() => navigation.goBack()}
							>
								<LinearGradient
									colors={[theme.colors.primary, "#FF8C42"]}
									style={styles.saveButtonGradient}
								>
									<Text style={styles.saveButtonText}>Save Entry</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				) : (
					<View style={styles.micContainer}>
						<Ionicons name="mic" size={100} color={theme.colors.primary} />
						<Text style={styles.comingSoon}>COMING SOON</Text>
					</View>
				)}
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
		height: "50%", // Adjust for blur fade
	},
	container: {
		flex: 1,
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
	title: {
		fontSize: 28,
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		textAlign: "center",
		marginBottom: 20,
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	toggleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 25,
		padding: 15,
	},
	toggleLabel: {
		fontFamily: theme.fonts.main,
		color: theme.colors.text,
		marginHorizontal: 15,
		fontSize: 16,
		fontWeight: "600",
	},
	keyboardAvoidingView: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	textContainer: {
		flex: 1,
		paddingTop: 5,
	},
	textScrollView: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 20,
	},
	input: {
		minHeight: 250,
		fontFamily: theme.fonts.main,
		color: "#000000",
		fontSize: 20,
		lineHeight: 32,
		textAlignVertical: "top",
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: 12,
		padding: 20,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		paddingBottom: 10,
		backgroundColor: "transparent",
	},
	saveButton: {
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	saveButtonGradient: {
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	saveButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: theme.fonts.main,
		fontWeight: "600",
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
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
