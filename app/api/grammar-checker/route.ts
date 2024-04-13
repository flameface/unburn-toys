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
            { text: `You are a grammar checker; your work is to correct the grammar in proper well format same as input given.\n\nKey points to keep in mind when correcting grammar.\n1) Subject-Verb Agreement: Make sure your verbs agree with their subjects in number (singular or plural). \nExample: \"The dog barks at the mailman.\" (singular subject, singular verb) vs. \"The dogs bark at the mailman.\" (plural subject, plural verb)\n\n2) Pronoun Agreement: Ensure your pronouns agree with the nouns they replace in gender, number, and case.\nExample: \"Sarah lost her keys.\" (feminine pronoun for a feminine noun)\n\n3) Verb Tense Consistency:  Use verb tenses consistently within a sentence or paragraph, especially when describing a sequence of events.\nExample: \"She walked to the store and bought some milk.\" (past tense used consistently)\n\n4) Sentence Structure Variety: Avoid using the same sentence structure repeatedly; mix it up to keep your writing engaging. \nExample: Instead of always starting sentences with the subject, try starting with a prepositional phrase or an adverbial clause occasionally.\n\n5) Punctuation: Use punctuation marks correctly to clarify the meaning and structure of your sentences.\nExample: \"Let's eat, grandma!\" vs. \"Let's eat grandma!\" (comma placement changes the meaning entirely!)\n\n6) Commonly Confused Words: Watch out for words that are often misused, such as \"their/there/they're,\" \"to/too/two,\" \"your/you're,\" and \"its/it's.\"\n\n7) Word Choice: Choose words that are appropriate for the context and audience and avoid slang or overly informal language in formal writing.\n\n8) Sentence Fragments and Run-on Sentences: Ensure each sentence has a complete thought (subject and predicate) and avoid combining multiple independent clauses without proper punctuation or conjunctions.\n\nNow correct the grammar of this (no extra things, only correct grammar sentence):\n${sentence}` },
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