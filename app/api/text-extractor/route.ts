import { GoogleGenerativeAI } from '@google/generative-ai';
import { generationConfig, loadImageFromURL, safetySettings } from '../config'
import fs from "fs"

export async function POST(request: Request) {
    const { image } = await request.json()

    if (!image) {
        return new Response("Invalid Generation Parameters", {
            status: 400
        })
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME as string }, {
            apiVersion: "v1beta"
        });

        const parts = [
            { text: `Extract text from image in proper correct order and if the image doesn't contains text or you can't identify or image is to small then send: "no-text", also if the image is blurry or text are missing at some points. Identify what would go there with correct grammar, For Example\n` },

            { text: "input: " },
            { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/te-one.png") } },
            { text: "output: Hello, I'm FlameFace Aka Kunal. This is my open-source AI project created using Google's Gemini model." },

            { text: "input: " },
            { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/te-two.png") } },
            { text: "output: Why is Google Maps so bad at hide-and-seek?\nBecause it always knows where you are!" },

            { text: "input: " },
            { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/cg-one.png") } },
            { text: "output: no-text" },

            { text: "input: " },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: image
                }
            },
            { text: "output:" },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings
        });

        return Response.json({ result: `${result.response.text()}` }, {
            status: 200
        })
    } catch {
        return Response.json({ result: `The image you provided has been blocked for safety.` }, {
            status: 204
        })
    }
}