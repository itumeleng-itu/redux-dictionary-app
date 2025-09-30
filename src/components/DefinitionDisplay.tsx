import React from 'react'; // React for JSX
import { useAppSelector } from '../store/hooks'; // Typed selector hook

export const DefinitionDisplay: React.FC = () => {
  const { entries, loading, error } = useAppSelector((state) => state.dictionary); // Read slice state

  if (loading === 'pending') { // Show progress while fetching
    return <p>Loading...</p>;
  }

  if (error) { // Render error state
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className='bg-rgb(192, 197, 197)-900 p-10 m-5 rounded-3xl'>
      {entries.map((entry, index) => (
      <article key={index}>
        {/* Word Header */}
        <div className='mb-8'>
          <p className='text-xs font-semibold uppercase tracking-wider mb-2'>
            {entry.meanings[0]?.partOfSpeech}
          </p>
          <h2 className='text-6xl font-bold mb-2 text-black'>
            {entry.word}
            <small className='text-lg font-normal ml-3 align-middle'>
              {entry.phonetic}
            </small>
          </h2>
        </div>
  
        {/* Meanings Section */}
        {entry.meanings.map((meaning, mIndex) => (
          <div key={mIndex} className='mb-6'>
            <h3 className='text-xs font-semibold uppercase tracking-wider mb-4 text-black'>
              {meaning.partOfSpeech}
            </h3>
            
            {/* Definitions List */}
            <ul className='space-y-2'>
              {meaning.definitions.map((def, dIndex) => (
                <li key={dIndex} className='flex gap-2 text-black'>
                  <span className='font-bold'>•</span>
                  <div>
                    <p className='font-medium'>{def.definition}</p>
                    {def.example && (
                      <p className='text-sm italic mt-1'>"{def.example}"</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    ))}
  </div>
  );
};