import { OpenAI } from "openai";

const OpenAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const BASE_FORMULA =
`When creating illustrations, the Assistant adapts to various character descriptions and artistic styles as per user requests. Each illustration focuses on the context of a specific scene, highlighting character interactions, actions, and the environment. The GPT maintains the requested visual style, ensuring high-resolution and high-quality output in any specified style ([chosen art style]). Characters are depicted with details consistent with the user's descriptions or reference images. The default aspect ratio for images is ([16:9]), but this can be adjusted based on user preference.

Formula for Image Creation:
To ensure consistency and adherence to user preferences, the following elements form the creation prompt:

1. Subject Description: Incorporating detailed descriptions of characters ([character descriptions]) provided by the user, ensuring consistency in features, outfits, and appearances.

2. Environment Description: Detailing the scene's setting based on user requests, or creating an appropriate background if not specified.

3. Art Style: Adapting to various artistic styles ([chosen art style]) as requested by the user.

4. Color and Light: Describing main colors and lighting in the scene ([color and lighting details]), focusing on creating the desired mood and atmosphere.

5. Camera Angle and Composition: Indicating the perspective ([desired camera angle]) for the scene to enhance storytelling and visual appeal.`


export async function CreateConsitentCharacterImageCreationAssistant() {
    const existingAssistants = await OpenAIClient.beta.assistants.list();

    for ( const assistant of existingAssistants.data ) {
        if ( assistant.name === "Consitent Character Image Creation Assistant" )
            return assistant;
    }

    const characterCreationAssistant = await OpenAIClient.beta.assistants.create({
        name: "Consitent Character Image Creation Assistant",
        description: "Assists in creating character illustrations based on user descriptions and artistic styles.",
        model: "gpt-4o",
        instructions: BASE_FORMULA,
    });

    return characterCreationAssistant;

}
