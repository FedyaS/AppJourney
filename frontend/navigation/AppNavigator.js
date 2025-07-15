import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import JournalScreen from "../screens/JournalScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "Home" }}
			/>
			<Stack.Screen
				name="JournalScreen"
				component={JournalScreen}
				options={{ title: "Journal" }}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
