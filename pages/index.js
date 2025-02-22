import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import pleistosLogo from '../assets/Logo Pleistos 2.png';
import { useEffect, useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="headerSticky" id="stickyHeader">
      </div>
      <div className="container">
        <div className="header">
          <div className="header-title">
            
            <h1>Create whole poems from a few lines</h1>
          </div>
          <div className="header-subtitle">
            <h2>Provide a sample of your poetry and watch the magic</h2>
          </div>
        </div>
        {/* Add this code here*/}
        </div>    {/* New code I added here */}
        <div className="prompt-container">
        <textarea  className="prompt-box"  placeholder="Place your poetry here"  value={userInput}  onChange={onUserChangedText}/>;
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content"> 
      <p>{apiOutput}</p>
    </div>
  </div>
  )}
<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/juan-pablo-cadavid-aguirre/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="container">
            <Image src={pleistosLogo} alt="Pleistos logo" />
            <p>Hire me on Linkedin!</p>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Home;

