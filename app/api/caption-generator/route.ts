import { GoogleGenerativeAI } from '@google/generative-ai';
import { generationConfig, loadImageFromURL, safetySettings } from '../config'

export async function POST(request: Request) {
    const { image, tone, description } = await request.json();

    if (!image) {
        return new Response("Invalid Generation Parameters", {
            status: 400
        })
    }

    const d = description.length > 0 ? `Additional Description: ${description}` : ``
    const t = tone.length > 0 ? `Writing Tone: ${tone}` : ``;
    const dt = d + t

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME as string }, {
            apiVersion: "v1beta"
        });

        const parts = [
            { text: "You are a caption generator, generates short caption for Instagram with some hashtags, emojis, for example:\n" },

            // EXAMPLE 1
            { text: "input: Writing Tone: Casual\n\n" }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/cg-one.png") } },
            { text: "output: Rocking the red hair and shades combo like a boss! 😎🔥 #RedHairGoals #ShadesOnPoint #BossModeActivated" },

            // EXAMPLE 2
            { text: "input: Writing Tone: Beauty\n\n" }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/cg-two.png") } },
            { text: "output: Feeling the sunshine on my face and the wind in my hair. ☀️🍃 #SummerVibes #HairGoals #NoFilter" },

            // EXAMPLE 3
            { text: "input: " }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/cg-three.png") } },
            { text: "output: Looking for adventure in this beautiful world! 🗺️✨ #AdventureAwaits #Wanderlust #DreamDestination" },

            // EXAMPLE 4
            { text: "input: Writing Tone: Nature\n\n" }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/cg-four.png") } },
            { text: "output: Strolling through the city streets and enjoying the beautiful summer weather! ☀️🌳 #SummerVibes #CityLife #Exploring" },

            // RESULT
            { text: `input: ${dt}` },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: image
                }
            },
            { text: "output: " }
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings
        });

        return Response.json({ result: `${result.response.text()}` }, {
            status: 200
        })
    } catch (e) {
        console.log(e)
        return Response.json({ result: `The image you provided has been blocked for safety.` }, {
            status: 204
        })
    }
}