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
            { text: "Generate an enhanced text prompt for this image, for example:\n" },
            { text: "input: " }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/ip-one.png") } },
            { text: "output: A lion wearing sunglasses and a suit, standing in front of a blue sky. The lion should be muscular and well-groomed, and the suit should be tailored to fit him perfectly. He should have gold chains around his neck and a gold watch on his wrist. He should be looking at the camera with a confident expression." },

            { text: "input: " }, { inlineData: { mimeType: "image/png", data: await loadImageFromURL("https://raw.githubusercontent.com/unburn/assets/main/toys/training-images/ip-two.png") } },
            { text: "output: A young girl with short brown hair and green eyes, wearing a blue shirt and brown jacket. She should be smiling and looking at the camera. The background should be blurred and contain some white dandelion-like flowers." },

            { text: "input: " }, { inlineData: { mimeType: "image/jpeg", data: image } },
            { text: "output:" }
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings
        });

        return Response.json({ result: `${result.response.text()}` }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ result: `The image you provided has been blocked for safety.` }, {
            status: 204
        })
    }
}