import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";

export async function POST(request: Request) {
    const { prompt } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: `You are a grammar checker tool. The below examples are for helping you understand how to use the tool. Make sure to generate randomized and precise outputs. (send the output directly with no comments like "output:" etc.)` },
            { text: "input: He go to school every day." },
            { text: "output: He goes to school every day." },
            { text: "input: She don't like coffee." },
            { text: "output: She doesn't like coffee." },
            { text: "input: They is going to the park." },
            { text: "output: They are going to the park." },
            { text: "input: I am going too the store." },
            { text: "output: I am going to the store." },
            { text: "input: The cat lays on the sofa." },
            { text: "output: The cat lies on the sofa." },
            { text: "input: He have three cats." },
            { text: "output: He has three cats." },
            { text: "input: She plays piano very good." },
            { text: "output: She plays the piano very well." },
            { text: "input: The dog bark loudly." },
            { text: "output: The dog barks loudly." },
            { text: "input: We was at the party last night." },
            { text: "output: We were at the party last night." },
            { text: "input: She speak three languages." },
            { text: "output: She speaks three languages." },
            { text: "input: He write a letter yesterday." },
            { text: "output: He wrote a letter yesterday." },
            { text: "input: They are swim in the pool." },
            { text: "output: They are swimming in the pool." },
            { text: "input: I don't has any money." },
            { text: "output: I don't have any money." },
            { text: "input: The children plays in the yard." },
            { text: "output: The children play in the yard." },
            { text: "input: She don't has a car." },
            { text: "output: She doesn't have a car." },
            { text: "input: He is running fastly." },
            { text: "output: He is running fast." },
            { text: "input: The book is laying on the table." },
            { text: "output: The book is lying on the table." },
            { text: "input: She eat pizza for dinner." },
            { text: "output: She eats pizza for dinner." },
            { text: "input: He are sleeping in his bed." },
            { text: "output: He is sleeping in his bed." },
            { text: "input: I is going to the store." },
            { text: "output: I am going to the store." },
            { text: `input: ${prompt}` },
            { text: "output: " },
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