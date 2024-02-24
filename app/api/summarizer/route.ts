import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";

export async function POST(request: Request) {
    const { prompt } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: `You are summarizer, summarize paragraphs and text in simple and formatted way, and send the output directly, no need to add \"Output:\" or \"Summarized:\" etc.\n\nFor Example:\nInput:\nThe cat (Felis catus), commonly referred to as the domestic cat or house cat, is the only domesticated species in the family Felidae. Recent advances in archaeology and genetics have shown that the domestication of the cat occurred in the Near East around 7500 BC. It is commonly kept as a house pet and farm cat, but also ranges freely as a feral cat avoiding human contact.\n\nOutput:\n- The cat, a domesticated species in the Felidae family, was domesticated around 7500 BC in the Near East.\n- It is commonly kept as a house pet or farm cat, but can also be feral and avoid human contact.\n\nHere is the input:\n${prompt}` },
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
        return Response.json({ status: 400, output: "The text you provided has been blocked for safety." })
    }
}