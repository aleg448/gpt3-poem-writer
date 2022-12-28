import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.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,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "Continue the following song: \n Song: ";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `
  Cntinue writing this song

  verse 1:${req.body.userInput}

  verse 2:${basePromptOutput.text}

  verse 3:

  chorus 1:

  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 500,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;