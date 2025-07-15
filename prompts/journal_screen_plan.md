# JournalYourThoughts Screen Plan

## Overview

- New screen for journaling thoughts.
- Background: User-provided image with gradient blur (max at top, 0 at bottom).
- Modes: Toggle between Keyboard and Microphone.
- Keyboard: Auto-focused text input, Save button (#FAAC52 orange).
- Microphone: Large mic icon + "COMING SOON".
- Navigation: Back to home on save (no actual saving yet).
- Styles: Centralize in a theme file or StyleSheet.
- Font: NovaMono for text.

## Image Handling

- Placement: frontend/assets/images/journal_background.jpg (4000x3000)
- Dimensions: High-res (4000x3000), suitable for scaling.
- Display: Use ImageBackground with resizeMode='cover' to fill screen.
- Blur: Overlay with gradient view using BlurView or linear gradient.

## Code Structure

- Create new file: frontend/screens/JournalScreen.js
- Import necessary from react-native, navigation.
- Use state for mode toggle.
- Conditional render based on mode.

## Central Styles

- Create frontend/styles/theme.js with colors, fonts.

## Potential Challenges

- Blur implementation: May need third-party library.
- Auto-focus input: Use useEffect.
- Expandable: Easy to add actual saving later.

## Next Steps

- Confirm image details.
- Decide on blur method.

## Concrete Implementation Plan

### 1. Create Central Styles (frontend/styles/theme.js)

- Export constants: colors { primary: '#FAAC52', text: '#000000' }, fonts { main: 'NovaMono' }

### 2. Load Font (if needed, in App.js or root)

- Use expo-font to load NovaMono.

### 3. Home Screen (Create/Edit frontend/screens/HomeScreen.js)

- Import { View, Text, Button, StyleSheet } from 'react-native';
- Import theme.
- Structure: View with background styles.
- Text: 'Your Personal Journal' and 'Your Journal is Your Journey' using theme.fonts.main.
- Button: 'Make Journal Entry' (color: theme.colors.primary) to navigate to 'JournalScreen'.

### 4. Journal Screen (frontend/screens/JournalScreen.js)

- Import necessary: View, Text, TextInput, Button, ImageBackground, Switch, etc. from 'react-native';
- Import { useNavigation } from '@react-navigation/native';
- Import theme.
- Import image: require('../assets/images/journal_background.jpg')
- State: useState for mode (keyboard true/false), text input.
- useEffect: Auto-focus TextInput in keyboard mode.
- Structure:
  - ImageBackground with source, style={flex:1, resizeMode:'cover'}
  - Overlay for blur: Use LinearGradient or BlurView from top blurred to bottom clear.
  - Back button: TouchableOpacity or navigation.goBack().
  - Title: 'Journal Your Thoughts' in NovaMono.
  - Toggle: Switch for mode, colored #FAAC52.
  - If keyboard: TextInput (multiline, autoFocus, style with theme).
  - Save Button: Button onPress={navigation.goBack} color={theme.colors.primary}
  - If mic: Large mic icon (e.g., from @expo/vector-icons) + Text 'COMING SOON'

### 5. Navigation Integration (frontend/navigation/AppNavigator.js or similar)

- Add Stack.Screen for HomeScreen and JournalScreen.
- Set initialRouteName='Home'

### 6. Potential Additions

- Install needed packages: @react-native-community/blur, expo-font, @expo/vector-icons if not present.
- Ensure expandability: Later add saving to state/local storage.
