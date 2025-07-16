import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { JournalProvider } from "./context/JournalContext";

export default function App() {
	const [fontsLoaded] = useFonts({
		NovaMono: require("./assets/fonts/NovaMono-Regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<JournalProvider>
				<View style={styles.container} onLayout={onLayoutRootView}>
					<AppNavigator />
					<StatusBar style="light" translucent={true} />
				</View>
			</JournalProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
