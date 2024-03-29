'use client';

import { useState } from 'react';

export default function page() {
  const [showTextField, setShowTextField] = useState(false);
  const [text, setText] = useState('');
  const [firstGenerate, setFirstGenerate] = useState(false);
  const [userInput, setUserInput] = useState('');

  function getTokens() {
    const url = window.location.href;
    const accessToken = url.split('access_token=')[1].split('&')[0];
    const secretToken = url.split('refresh_token=')[1].split('&')[0];
    return { accessToken, secretToken };
  }

  const getData = async () => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const json = JSON.stringify({ text: userInput });

    const response = await fetch(`${API}/generate_post` as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: json
    });

    const data = await response.json();
    return data;
  }

  const handleGenerateClick = () => {
    // Call your API here and set the text
    getData()
      .then(data => {
        setText(data['data'][0]);
        setShowTextField(true);
        setFirstGenerate(true);
      });
  };

  const handlePublishClick = () => {
    tweet()
      .then(data => {
        console.log(data);
      });
  }

  async function tweet() {
    const response = await fetch('https://influencer-tools.vercel.app/api/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ text: text, tokens: getTokens()})
    });
    return response.json();
  }


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
