'use client';

import { useState } from 'react';

export default function page() {
  const [showTextField, setShowTextField] = useState(false);
  const [text, setText] = useState('');
  const [firstGenerate, setFirstGenerate] = useState(false);
  const [userInput, setUserInput] = useState('');

  console.log(localStorage.getItem('supabase.auth.token'));

  const handleGenerateClick = () => {
    // Call your API here and set the text
    setText('Your API response text here');
    setShowTextField(true);
    setFirstGenerate(true);
    console.log('generated text')
  };

  const handlePublishClick = () => {
    // Call your publish function here
    console.log('published text');
  };

  return (
    <div className="w-full p-10">
      <p className="text-black text-4xl font-semibold mb-10">Post on your Social Networks</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full p-2 mb-4 border-2 border-gray-300 rounded"
        placeholder="Write something here..."
      />
      {!firstGenerate && (
        <button onClick={handleGenerateClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Generate
        </button>
      )}
      {showTextField && (
        <>
          <textarea value={text} readOnly className="w-full p-2 mb-4"></textarea>
          <button onClick={handlePublishClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
            Publish
          </button>
        </>
      )}
      {firstGenerate && (
        <button onClick={handleGenerateClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Generate Again
        </button>
      )}
    </div>
  );
}