import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import JournalScreen from "../screens/JournalScreen";
import JournalEntriesScreen from "../screens/JournalEntriesScreen";
import SingleEntryScreen from "../screens/SingleEntryScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="JournalScreen" component={JournalScreen} />
			<Stack.Screen
				name="JournalEntriesScreen"
				component={JournalEntriesScreen}
			/>
			<Stack.Screen name="SingleEntryScreen" component={SingleEntryScreen} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
