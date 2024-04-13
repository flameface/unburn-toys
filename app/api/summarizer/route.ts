import { GoogleGenerativeAI } from '@google/generative-ai';
import { generationConfig, safetySettings } from '../config'

export async function POST(request: Request) {
    const { text } = await request.json()

    if (!text) {
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
            { text: `You are a summarizer; your work is to summarize the sentence/paragraphs\n\nKey points to keep in mind when summarizing:\n1) Understand the main idea: Identify the central message or theme of the sentence or paragraph.\n2) Highlight key points: Pick out the most important information or arguments presented.\n3) Use your own words: Paraphrase the content in simpler language, making it easier to understand.\n4) Avoid unnecessary details: Focus on conveying the essential points without getting bogged down in minor details.\n5) Maintain accuracy: Ensure that your summary accurately reflects the original meaning of the text.\n6) Organize logically: Present the information in a clear and structured manner, arranging key points in a logical sequence.\n7) Consider your audience: Tailor your summary to the knowledge level and interests of your intended audience.\n8) Be concise: Aim for brevity while still capturing the essence of the original content.\n9) Markdown Styling: use markdown language to make bullet points, header etc.\n\nNow summarize this:\n${text}` },
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
        return Response.json({ result: "The text you provided has been blocked for safety." }, {
            status: 204
        })
    }
}