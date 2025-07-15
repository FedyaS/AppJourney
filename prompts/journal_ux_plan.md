# Journal Screen UX Enhancement Plan

## Core Problem

The current implementation for keyboard input has several UX issues:

- Poor layout management when keyboard appears/disappears.
- Unnatural scrolling.
- Clunky visual appearance.
- Save button position is not ideal.

## Proposed High-Level Approach

- Rebuild the screen layout to be fully responsive to the keyboard's presence.
- Ensure the "Save" button is always visible and accessible without interfering with the text input area.
- Refine the visual style for a cleaner, more modern feel.

## Phase 1: Keyboard and Layout Management

- **Primary Tool:** `KeyboardAvoidingView` will be the root component for the keyboard-enabled view.
- **Behavior:** Configure it with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` to handle platform differences correctly.
- **Scrolling:** A `ScrollView` will wrap the `TextInput` to allow for natural scrolling of the text content. It will automatically adjust to keep the cursor in view.
- **No Manual Spacers:** Remove the fixed-height `keyboardSpacer` in favor of the adaptive layout.
- **Focus Management:** Continue using `useEffect` and `inputRef.current.focus()` to programmatically show the keyboard and focus the input when `isKeyboardMode` is `true`.

## Phase 2: 'Save' Button Positioning

- **Layout Strategy:** The button will be placed in a `View` that acts as a footer.
- **Placement:** This footer will be a direct child of the `KeyboardAvoidingView`, alongside the `ScrollView`, not inside it.
- **Behavior:** This ensures the button remains in a fixed position at the bottom of the available screen area, pushed up by the keyboard, but never overlapping the text content. It will not scroll with the text.
- **Flexbox:** Use a flexbox layout where the `ScrollView` has `flex: 1` to occupy the remaining space, pushing the button's footer to the bottom.

## Phase 3: Visual Polish & Styling

- **Core Idea:** Create a clean, modern UI that emphasizes the background image.
- **No New Dependencies:** We will not add `expo-blur`. A semi-transparent background is sufficient.
- **Text Input Style:**
  - The `TextInput` will use a light, semi-transparent background (e.g., `rgba(255, 255, 255, 0.8)`) to provide a clean writing surface.
  - Text color will be black for optimal readability.
  - Remove horizontal margins from the `TextInput` and its containers to make it span the full screen width. Keep internal padding for the text.
- **Button Footer Style:**
  - The footer containing the save button will have a transparent background. The button itself will be styled, making it appear to "float."

## Implementation Summary

1.  **Rebuild Layout:** Use `KeyboardAvoidingView` as the root. Inside, place a `ScrollView` (for `TextInput`) and a `View` (for the button footer).
2.  **Full-Width Text:** The `ScrollView` and `TextInput` will be configured to span the full width of the screen, with no horizontal margins.
3.  **Sticky Footer:** The button's footer `View` will be transparent and positioned below the `ScrollView`. It will house the save button, keeping it visible above the keyboard.
4.  **Styling:** Use a light, semi-transparent `rgba` background and black text for the `TextInput`. No new dependencies are needed.
