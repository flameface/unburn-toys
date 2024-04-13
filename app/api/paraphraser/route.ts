import { GoogleGenerativeAI } from '@google/generative-ai';
import { generationConfig, safetySettings } from '../config'

export async function POST(request: Request) {
    const { sentence } = await request.json();

    if (!sentence) {
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
            { text: `You are a paraphraser; your work is to rephrase the sencence in proper well format same as input given.\n\nKey points to keep in mind when rephrasing:\n1) Understand the Original Meaning: Make sure you fully comprehend the meaning of the original sentence before attempting to rephrase it.\n2) Use Synonyms: Replace words with synonyms to convey the same meaning. However, be cautious of changing the tone or nuance inadvertently.\n3) Change Sentence Structure: After the sentence structure by rearranging words, changing the order of phrases, or using different grammatical constructions.\n4) Maintain Clarity: Ensure that your paraphrased sentence is clear and easy to understand. Avoid overly complex structures or ambiguous language.\n5) Avoid Plagiarism: Paraphrasing should involve expressing ideas in your own words while acknowledging the source if necessary. Don't simply rearrange words without adding original thought.\n6) Capture Tone and Style: Try to maintain the tone and style of the original sentence, especially if it's important for the context.\n7) Check for Accuracy: Verify that your paraphrased sentence accurately represents the original meaning. Avoid unintentional distortions or misinterpretations.\n9) Be Concise: While paraphrasing, aim to convey the same meaning in a more concise manner if possible. Avoid unnecessary wordiness.\n\nNow rephrase this (no extra things, only one rephrased sentence with proper format):\n${sentence}` },
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
        return Response.json({ result: `The sentence you provided has been blocked for safety.` }, {
            status: 204
        })
    }
}