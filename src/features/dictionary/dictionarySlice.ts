import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Toolkit helpers for thunk and slice
import axios from 'axios'; // HTTP client for API calls


//defining data structures

export interface Definition { // One textual definition and an optional usage example
    definition: string;
    example?: string;
  }
  
  export interface Meaning { // Group of definitions for a particular part of speech
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  export interface WordEntry { // Structure returned by the dictionary API for a word
    word: string;
    phonetic: string;
    meanings: Meaning[];
  }
  
  export interface DictionaryState { // Redux state for the dictionary feature
    entries: WordEntry[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: DictionaryState = { // Initial state before any search
    entries: [],
    loading: 'idle',
    error: null,
  };

  export const fetchWordDefinition = createAsyncThunk( // Async action for fetching a word
    'dictionary/fetchWord',
    async (word: string, { rejectWithValue }) => {
      try {
        const response = await axios.get<WordEntry[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); // Call public API
        return response.data; // Return entries to the fulfilled action
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data.title || 'Could not find definition.'); // Surface server message
        }
        return rejectWithValue('An unknown error occurred.'); // Fallback error
      }
    }
  );

//dictionary/fetchWord' = "I want to order pizza" (your intention)
//async (word) = "Call the pizza place and ask for a pepperoni pizza"
//try block = "Wait for the pizza to be delivered"
//return response.data = "Pizza arrives! 🍕 Here's your food"
//catch block = "Oops, pizza place is closed or wrong address" 🚫
//rejectWithValue = "Tell your friends: 'Sorry, no pizza tonight'"


  export const dictionarySlice = createSlice({ // Slice bundles reducer logic and actions
    name: 'dictionary',
    initialState,
    reducers: {
      // Place synchronous reducers here if needed in the future
    },
    extraReducers: (builder) => { // Handle async lifecycle actions
      builder
        .addCase(fetchWordDefinition.pending, (state) => {
          state.loading = 'pending'; // Indicate loading
          state.error = null; // Reset error on new request
        })
        .addCase(fetchWordDefinition.fulfilled, (state, action) => {
          state.loading = 'succeeded'; // Done loading
          state.entries = action.payload; // Store fetched entries
        })
        .addCase(fetchWordDefinition.rejected, (state, action) => {
          state.loading = 'failed'; // Mark as failed
          state.entries = []; // Clear old entries
          state.error = action.payload as string; // Save error message
        });
    },
  });
  export default dictionarySlice.reducer; // Export reducer for store registration


  
//pizza analogy to understand

// "Order received, start cooking!"	orderPizza.pending
// "Pizza ready, serve to table"	orderPizza.fulfilled
// "Burnt pizza, apologize"	orderPizza.rejected
// Kitchen status board	state.status
// Actual pizza	state.pizza
// Chef's apology note	state.error