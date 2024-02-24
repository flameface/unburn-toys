import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";

export async function POST(request: Request) {
    const { prompt } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: `Enhance the prompt to get awesome image output make it short and effective and send the output directly, no such things like "Output:", "Enhance:" should be in output.\n\nFor Example:\nInput:\ncute cat\n \nOutput:\nCat sitting with paws tucked under itself, fluffy texture, wide, innocent eyes enhancing cuteness, soft pink nose, placed gently on a plush velvet cushion in a sunlit room, sheer curtains diffusing the light, shadows playing across antique wooden floorboards, high-resolution digital painting, ultra-realistic, with a touch of whimsy.\n \nIf the provided input is not about image prompt, then send: "invalid-prompt"\n\nHere is the input:\n${prompt}` },
        ];

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings
        });

        return Response.json({ status: 200, output: `${result.response.text()}` })
    } catch {
        return Response.json({ status: 400, output: "The prompt you provided has been blocked for safety." })
    }
}