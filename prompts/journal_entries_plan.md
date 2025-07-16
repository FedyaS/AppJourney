# Journal Feature Implementation Plan

This plan outlines the steps to create a persistent journal feature.

---

### **Phase 1: Data & Storage Setup**

**1. Dependency Installation:**

- Install `AsyncStorage` for local data persistence.
  ```bash
  npm install @react-native-async-storage/async-storage
  ```
- Install `date-fns` for easy date formatting.
  ```bash
  npm install date-fns
  ```

**2. Storage Service (`frontend/services/journalService.js`):**

- **Purpose:** Create a dedicated module to abstract all `AsyncStorage` logic.
- **`saveEntries(entries)` function:** Takes an array of entries and saves it to AsyncStorage under the key `'journal_entries'`.
- **`getEntries()` function:** Retrieves and parses the entries array from AsyncStorage. Handles cases where no entries exist yet (returns an empty array).

**3. Data Context (`frontend/context/JournalContext.js`):**

- **Purpose:** To provide journal data across the app and avoid prop drilling.
- **State:**
  - `entries` (Array): Holds the list of journal entries.
  - `isLoading` (Boolean): Tracks the initial loading of data.
- **onMount (`useEffect`):**
  - On initial component mount, call `journalService.getEntries()` to load data into the `entries` state.
- **`addEntry(text)` function:**
  - Creates a new entry object: `{ id: Date.now().toString(), text: text, datetime: new Date() }`.
  - Prepends the new entry to the current `entries` array.
  - Updates the state with the new array.
  - Calls `journalService.saveEntries()` with the updated array to persist the data.
- **Provider:** Exposes `entries`, `isLoading`, and `addEntry` to its children.

**4. Integrate Provider (`frontend/App.js`):**

- Wrap the `<AppNavigator />` component with the `JournalProvider` to make the context available to all screens.

---

### **Phase 2: UI & Navigation**

**1. Create New Screens:**

- `frontend/screens/JournalEntriesScreen.js`:
  - Fetches `entries` from `JournalContext`.
  - Displays entries in a `FlatList`, sorted with the newest on top.
  - Each list item will be a `JournalEntryItem` component.
- `frontend/screens/SingleEntryScreen.js`:
  - Receives `entryId` via navigation params.
  - Fetches the specific entry from the `JournalContext` using the `entryId`.
  - Displays the full entry text and formatted date.

**2. Create New Component (`frontend/components/JournalEntryItem.js`):**

- **Props:** Receives a single `entry` object.
- **Display:**
  - Shows a preview of the entry text (e.g., first 100 characters).
  - Displays the formatted date (e.g., "June 15th, 2:30 PM") using `date-fns`.
- **Interaction:**
  - Make it pressable (`TouchableOpacity`).
  - On press, navigates to `SingleEntryScreen`, passing the `entry.id`.

**3. Update Existing Screens:**

- **`frontend/screens/HomeScreen.js`:**
  - Add a new button: "See Journal Entries".
  - On press, it navigates to `JournalEntriesScreen`.
- **`frontend/screens/JournalScreen.js`:**
  - Get the `addEntry` function from `JournalContext`.
  - Modify the "Save" button's `onPress` handler:
    1.  Call `addEntry(text)`.
    2.  Navigate to the entries list using `navigation.replace('JournalEntriesScreen')`. This resets the navigation stack so the back button goes to `Home`.

**4. Update Navigation (`frontend/navigation/AppNavigator.js`):**

- Add `JournalEntriesScreen` and `SingleEntryScreen` to the `StackNavigator`.

---

### **Summary of Navigation Flow:**

- **New Entry:** `Home` -> `JournalScreen` -> (Save) -> `JournalEntriesScreen` (Back goes to `Home`).
- **View Entries:** `Home` -> `JournalEntriesScreen` -> `SingleEntryScreen` (Back goes to `JournalEntriesScreen`).
