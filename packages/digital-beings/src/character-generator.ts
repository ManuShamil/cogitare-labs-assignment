import { OpenAI } from "openai";
import { BASE_FORMULA } from "./image-generator";

const OpenAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const CHARACTER_CREATION_INSTRUCTIONS =
`You are a helpful assistant. Based on ${BASE_FORMULA}, You create all the required descriptions.`

export async function createCharacterDescription() {
    const completion = await OpenAIClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: CHARACTER_CREATION_INSTRUCTIONS },
            {
                role: "user",
                content: "Create me a random character description.",
            },
        ],
    });

    return completion.choices[0].message.content;
}
