import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";

export async function POST(request: Request) {
    const { prompt } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: `You are a paraphrasing tool. The below examples are for helping you understand how to use the tool. Make sure to generate randomized and precise outputs. (send the output directly with no comments like "output:" etc.)` },
            { text: "input: The cat is sitting on the mat." },
            { text: "output: The feline is lounging on the floor covering." },
            { text: "input: She is studying for her exams." },
            { text: "output: She's preparing for her tests." },
            { text: "input: He enjoys playing basketball." },
            { text: "output: Playing basketball brings him joy." },
            { text: "input: They went to the beach for vacation." },
            { text: "output: Their vacation involved a trip to the shore." },
            { text: "input: The weather forecast predicts rain tomorrow." },
            { text: "output: Tomorrow's weather forecast anticipates precipitation." },
            { text: "input: She's reading a book in the garden." },
            { text: "output: In the garden, she's engrossed in a book." },
            { text: "input: He's cooking dinner for his family." },
            { text: "output: His family will be treated to his culinary skills." },
            { text: "input: The car broke down on the highway." },
            { text: "output: The vehicle malfunctioned while on the freeway." },
            { text: "input: They're planning a surprise party for her." },
            { text: "output: A surprise celebration is in the works for her." },
            { text: "input: The movie starts at 8 PM." },
            { text: "output: The film commences at eight in the evening." },
            { text: "input: She's walking her dog in the park." },
            { text: "output: In the park, she's taking her canine for a stroll." },
            { text: "input: He's teaching a class on mathematics." },
            { text: "output: Mathematics is the subject of his current teaching." },
            { text: "input: They're renovating their house this summer." },
            { text: "output: Their home is undergoing renovations this summer." },
            { text: "input: She's listening to music on her headphones." },
            { text: "output: Her ears are occupied with music from her headphones." },
            { text: "input: He's jogging in the park for exercise." },
            { text: "output: Exercise is the purpose of his jog in the park." },
            { text: "input: They're planning a trip to Europe next year." },
            { text: "output: Next year, they intend to travel to Europe." },
            { text: "input: She's attending a conference for work." },
            { text: "output: Work-related matters have her at a conference." },
            { text: "input: He's repairing his bicycle in the garage." },
            { text: "output: The garage is where he's fixing his bicycle." },
            { text: "input: They're organizing a charity event for the homeless." },
            { text: "output: A philanthropic event to aid the homeless is in progress." },
            { text: "input: She's chatting with her friends online." },
            { text: "output: Online, she's engaging in conversation with friends." },
            { text: "input: He's practicing the guitar for the concert." },
            { text: "output: His rehearsal is in preparation for the concert." },
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