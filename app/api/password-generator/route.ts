import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";

export async function POST(request: Request) {
  const { prompt } = await request.json()

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const parts = [
            { text: `You are a password generator tool. The below examples are for helping you understand how to use the tool. Make sure to generate randomized and precise outputs. The max length of a password must be lower than 90 letters or trim the password to a lower length. (send the output directly with no comments like "output:" etc.)` },
            { text: `input: Generate a 8 letter stong password` },
            { text: `output: Ua#83k*P` },
            { text: `input: Generate a 15 letter passowrd without including special Characters` },
            { text: `output: ApT6B6Lao6W9ms5` },
            { text: `input: Generate a 8 letter password based on a name einzi` },
            { text: `output: eInZi@2x` },
            { text: `input: Generate a 8 letter password based on a name flameface`},
            { text: `output: fLa#@ace`},
            { text: `input: Generate a 8 letter password based on a name flameface without including special characters`},
            { text: `output: fla63ce0`},
            { text: `input: Generate a 8 letter password based on a name einzi without including special characters`},
            { text: `output: ei1nz9g7` },
            { text: `input: Generate a stong password` },
            { text: `output: S7&kwm#tsv$om` },
             { text: `input: Generate 3 stong passwords` },
            { text: `output: S7&kwm#tsv$om, 7g$wm&ps!h*m, Ax7fm#jo$mf@o` },
            { text: `input: Generate 3 8 letter stong passwords` },
            { text: `output: S7&kwm#t, 7g$wm&ps, Ax7fm#jo` },
            { text: `input: Generate a Password` },
            { text: `output: Ax6%Mak$6g` },
            { text: `input: Generate a password that means something` },
            { text: `output: thisismy58dog^_^`},
            { text: `input: Generate 3 passwords that means something` },
            { text: `output: i7love6video8$games`},
            { text: `input: Generate a 11 letter password that means something` },
            { text: `output: nature=best`},
            { text: `input: Generate 2 11 letter password that means something` },
            { text: `output: na5u#e=be8t, `},
            { text: `input: ${prompt}` },
            { text: `output: ` }
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