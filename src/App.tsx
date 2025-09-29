import './App.css'; // Component-level styles for the App
import { WordSearch } from './components/WordSearch'; // Search input + dispatch to fetch
import { DefinitionDisplay } from './components/DefinitionDisplay'; // Renders fetched definitions

function App() { // Top-level component composing page layout
  return (
    <>
      <WordSearch /> {/* Input + button to trigger lookup */}
      <hr /> {/* Visual separator */}
      <DefinitionDisplay /> {/* Displays loading/error/results */}
    </>
  );
}

export default App; // Default export for usage in main.tsx
