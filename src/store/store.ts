import { configureStore } from "@reduxjs/toolkit"; // Import helper to create a Redux store
import dictionaryReducer from '../features/dictionary/dictionarySlice'; // Dictionary feature reducer

export const store = configureStore({ // Create and configure the global Redux store
    reducer: {
      dictionary: dictionaryReducer, // Register the dictionary slice reducer under 'dictionary'
    },
  })

export type RootState = ReturnType<typeof store.getState>; // Inferred state shape from the store
export type AppDispatch = typeof store.dispatch; // Type of the store's dispatch function