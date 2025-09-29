
# 📖 Redux Dictionary App

A simple and clean dictionary web application built to demonstrate the core principles of modern Redux with Redux Toolkit. Users can search for a word and view its definitions, parts of speech, and phonetic spelling, fetched from a public API.  

This project serves as a practical, hands-on example for anyone learning state management in React.  

---

## ✨ Features
- **Word Search:** Input a word to look up its definition.  
- **Dynamic Results:** Fetches and displays definitions, phonetics, parts of speech, and examples.  
- **State Management:** Utilizes a centralized Redux store to manage application state, including loading, error, and data states.  
- **Asynchronous Logic:** Handles API calls gracefully using `createAsyncThunk`.  
- **Responsive:** Simple, mobile-first design.  

---

## 🛠️ Tech Stack
- **Framework:** [React](https://reactjs.org/)  
- **Build Tool:** [Vite](https://vitejs.dev/)  
- **Language:** [TypeScript](https://www.typescriptlang.org/)  
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)  
- **API Client:** [Axios](https://axios-http.com/) for making HTTP requests  
- **Styling:** Plain CSS  

---

## 🧠 Core Concepts Illustrated
This project is designed to make complex Redux concepts intuitive and easy to grasp.  

### Project Task Sheet & Learning Plan
For a step-by-step guide on how this project was built from scratch, you can follow the detailed task sheet here:  
[🔗 Project Build Task Sheet](https://docs.google.com/document/d/1JXp-NHJz7-rd7rQ8b02X38qm7dcrugh1AXuKHVc1Tck/edit?usp=drive_link)  

### The Redux Fairytale 🏰
To understand *why* Redux is so useful and how its core parts (Store, Actions, Reducers, `useSelector`) work together, we created a simple story. This analogy explains Redux by comparing it to a family building a central store to share items, solving the problem of "prop drilling."  

[🔗 Read the Redux Fairytale Analogy Here](https://docs.google.com/document/d/1xhsnvB-m90zo7C8lxv8kCu5BPWwigN5Ehqg7oruufOw/edit?usp=drive_link)  

---

## 🧩 How Redux Works — Step by Step (with this project)
This section walks you through Redux in the exact order data flows in this app. File paths are included so you can open them side-by-side.

### 1) Create the Store (the single source of truth)
- File: `src/store/store.ts`
- We call `configureStore` and register our feature reducer under the `dictionary` key. We also export helpful types `RootState` and `AppDispatch`.

What this gives us:
- A central container that holds the entire app state
- A `dispatch` function to send actions
- A `getState` function used by selectors

### 2) Provide the Store to React
- File: `src/main.tsx`
- We wrap `<App />` in `<Provider store={store}>`. This makes the Redux store available to every component in the tree via React context, so components can `dispatch` actions and `select` state without prop drilling.

### 3) Create Typed Hooks for DX (developer experience)
- File: `src/store/hooks.ts`
- We create `useAppDispatch` and `useAppSelector` by typing React-Redux’s `useDispatch` and `useSelector` with `AppDispatch` and `RootState`. This gives autocompletion and type safety when dispatching and selecting.

### 4) Model the Feature State and Async Logic
- File: `src/features/dictionary/dictionarySlice.ts`
- Define TypeScript interfaces for the data we care about: `Definition`, `Meaning`, `WordEntry`, and `DictionaryState`.
- Define `initialState` with `entries`, `loading`, and `error`.
- Create an async thunk `fetchWordDefinition` using `createAsyncThunk`. It calls the public Dictionary API and returns the array of `WordEntry` results or a typed error.
- Create the slice with `createSlice`. Instead of manual switch statements, we add cases for the thunk lifecycle:
  - `pending` → mark `loading` as `'pending'` and clear previous `error`
  - `fulfilled` → mark `loading` as `'succeeded'` and put results into `entries`
  - `rejected` → mark `loading` as `'failed'`, clear `entries`, and set `error`

Why this matters:
- The slice holds the definitive shape and rules of this feature’s state
- Thunks encapsulate side effects (like API calls) and keep components simple

### 5) Dispatch Actions from Components
- File: `src/components/WordSearch.tsx`
- The component manages a local `word` input state.
- On button click, if the word is non-empty, it dispatches `fetchWordDefinition(word.trim())`.

What happens when you dispatch:
- Redux Toolkit sends a `pending` action immediately
- After the API resolves, it sends either `fulfilled` (with data) or `rejected` (with error)
- The slice reducer updates the store accordingly

### 6) Select State and Render UI
- File: `src/components/DefinitionDisplay.tsx`
- We read `{ entries, loading, error }` with `useAppSelector((state) => state.dictionary)`.
- The UI conditionally renders:
  - `Loading...` while the request is in flight
  - An error message if the request failed
  - The list of word entries, meanings, and definitions on success

This is the core React-Redux feedback loop:
1. User interacts → component dispatches an action
2. Middleware/thunk runs side effects (API call)
3. Slice reducers update the store based on results
4. Selectors read the new state
5. React re-renders the subscribed components

### 7) App Composition
- File: `src/App.tsx`
- `App` composes `WordSearch` and `DefinitionDisplay`. It doesn’t hold data or perform side effects — Redux does the heavy lifting.

---

## 🧪 Quick Verification Checklist
- Can you dispatch `fetchWordDefinition('test')` from `WordSearch`?
- Does `DefinitionDisplay` show `Loading...`, then results or an error?
- If you search again, does it reset `error` and update `entries`?

---

## 🧭 Common Redux FAQs
- Why Redux when React has state?  
  - Redux centralizes state, avoids prop drilling, and provides predictable flows. With Toolkit, it’s concise and batteries-included.
- Why `createAsyncThunk`?  
  - It standardizes async action lifecycles (`pending/fulfilled/rejected`) and integrates neatly with slices.
- Why typed hooks?  
  - TypeScript safety prevents dispatching wrong payloads and selecting non-existent state keys.

---

## 📚 File Map
- Store: `src/store/store.ts`
- Typed hooks: `src/store/hooks.ts`
- Feature slice + thunk: `src/features/dictionary/dictionarySlice.ts`
- Search component (dispatch): `src/components/WordSearch.tsx`
- Display component (select): `src/components/DefinitionDisplay.tsx`
- App composition: `src/App.tsx`
- Provider setup: `src/main.tsx`

## 🚀 Getting Started
Follow these instructions to get a local copy of the project up and running.  

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)  
- [npm](https://www.npmjs.com/) or a compatible package manager  

### Installation & Setup
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/dlozilab/redux-dictionary-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd redux-dictionary-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running on [http://localhost:5173](http://localhost:5173).




