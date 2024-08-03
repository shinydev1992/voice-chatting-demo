# Deepgram AI Agent Technical Demo

Combine Text-to-Speech and Speech-to-Text into a conversational agent.

The purpose of this demo is to showcase how you can build a Conversational AI application that engages users in natural language interactions, mimicking human conversation through natural language processing using [Deepgram](https://deepgram.com/).

Examples of where you would see this type of application include: virtual assistants for tasks like answering queries and controlling smart devices, educational tutors for personalized learning, healthcare advisors for medical information, and entertainment chat bots for engaging conversations and games.

These applications aim to enhance user experiences by offering efficient and intuitive interactions, reducing the need for human intervention in various tasks and services.

## Demo features

- Capture streaming audio using [Deepgram Streaming Speech to Text](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio).
- Natural Language responses using an OpenAI LLM.
- Speech to Text conversion using [Deepgram Aura Text to Speech](https://developers.deepgram.com/docs/text-to-speech).

## What is Deepgram?

[Deepgram](https://deepgram.com/) is a foundational AI company providing speech-to-text and language understanding capabilities to make data readable and actionable by human or machines.

## Sign-up to Deepgram

Want to start building using this project? [Sign-up now for Deepgram and create an API key](https://console.deepgram.com/signup?jump=keys).

## Quickstart

### Manual

Follow these steps to get started with this starter application.

#### Clone the repository

Go to GitHub and [clone the repository](https://github.com/shinydev1992/voice-chatting-demo.git).

#### Install dependencies

Install the project dependencies.

```bash
npm install
```

#### Edit the config file

Copy the code from `sample.env.local` and create a new file called `.env.local`.

```bash
DEEPGRAM_STT_DOMAIN=https://api.deepgram.com
DEEPGRAM_API_KEY=YOUR-DG-API-KEY
OPENAI_API_KEY=YOUR-OPENAI-API-KEY
```

1. For `DEEPGRAM_API_KEY` paste in the key you generated in the [Deepgram console](https://console.deepgram.com/).
2. Set `DEEPGRAM_STT_DOMAIN` to be `https://api.deepgram.com`.
3. `OPENAI_API_KEY` should be an OpenAI API Key that can access the chat completions API.

#### Run the application

Once running, you can [access the application in your browser](http://localhost:3000).

```bash
npm run dev
```
