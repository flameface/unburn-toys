import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro-vision-latest";

export async function POST(request: Request) {
    const { dataUrl } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: "Generate a beautiful caption for instagram, twitter etc. add hastags and emojis, below are some examples of captions generated from image:\n" },
            { text: "Enjoying a sunny picnic in the park with friends ☀️🌳 #PicnicFun #SunnyDays #Friends\n" },
            { text: "Just catching some z's 😴🐱 #CatNap #CozyCats #SleepyKitty\n" },
            { text: "Nature's masterpiece 🌅✨ #SunsetMagic #LakeViews #NaturePhotography\n" },
            { text: "City hustle and bustle 🏙️🚶‍♂️🚗 #UrbanLife #Cityscape #RushHour\n" },
            { text: "On top of the world 🏔️🌍 #MountainViews #NatureLovers #AdventureTime\n" },
            { text: `Here is the image (send the output directly with no comments like "output:" etc.)\n` },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: dataUrl
                }
            },
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
        return Response.json({ status: 400, output: `The image you provided has been blocked for safety.` })
    }
}