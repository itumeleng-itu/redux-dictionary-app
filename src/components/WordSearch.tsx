import React, { useState } from 'react'; // React + local state hook
import { useAppDispatch } from '../store/hooks'; // Typed dispatch hook
import { fetchWordDefinition } from '../features/dictionary/dictionarySlice'; // Async thunk action
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const WordSearch: React.FC = () => {
  const [word, setWord] = useState(''); // Controlled input value for the search field
  const dispatch = useAppDispatch(); // Access Redux dispatch

  const handleSearch = () => { // Trigger fetch if input is non-empty
    if (word.trim()) {
      dispatch(fetchWordDefinition(word.trim())); // Dispatch async thunk
    }
  };

  return (
    <div className='flex gap-1'>
        <Input 
        className='bg-black/30 font-medium'
        type="text" // Text input for entering a word
        value={word} // Controlled value
        onChange={(e) => setWord(e.target.value)} // Update local state on change
        placeholder="Enter a word" // Placeholder hint/
      />
      <Button
      className='bg-black/30 font-medium'
       variant="outline" 
       onClick={handleSearch}>Search</Button>
    </div>
  );
};