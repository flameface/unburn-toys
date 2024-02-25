<img src="https://ik.imagekit.io/unburn/ubtoys.svg?updatedAt=1708754248309">

<h1 align="center">Unburn Toys</h1>
<p align="center">An open-source AI project with a bunch of useful tools.</p>

<p align="center">
<a href="#about"><b>About</b></a> •
<a href="#tools"><b>Tools</b></a> •
<a href="#deploy-your-own"><b>Deploy Your Own</b></a> •
<a href="#manual-installation"><b>Manual Installation</b></a> •
<a href="https://toys.unburn.tech/"><b>Live Preview</b></a>

</p>

## About
I built this using the latest Gemini Pro model and Next.js

## Tools
- Caption Generator
- Image to Prompt
- Prompt Enhancer
- Image Text Extractor
- Grammar Checker
- Paraphraser
- Summarizer

## Deploy Your Own
Deploying to Vercel just requires a single click:

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fflameface%2Funburn-toys&env=GOOGLE_API_KEY&project-name=unburn-toys&repository-name=unburn-toys"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

## Manual Installation
Clone this project using git.
```
git clone https://github.com/flameface/unburn-toys.git
```

Installing all dependencies.
```
npm install
```

Create `.env.local` file in **root** directory and put your API key. (Get it here: [AI Studio](https://aistudio.google.com/)).
```
GOOGLE_API_KEY=XXXXXXXXXXXXXXXXX
```

Finally run the following command to start the app.
```
npm run dev
```

You should now be able to access your app at [localhost:3000](http://localhost:3000/).

***
