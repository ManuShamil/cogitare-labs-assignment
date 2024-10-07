import { OpenAI } from "openai";
import { CreateConsitentCharacterImageCreationAssistant } from "./image-generator";
import { createCharacterDescription } from "./character-generator";
import { threadId } from "worker_threads";

const OpenAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


let characterDescription!: string | null;
let characterCreationAssistant !: OpenAI.Beta.Assistants.Assistant;

describe('index', () => {

    it (`Can create a character description`, async () => {
        characterDescription = await createCharacterDescription();
        console.log( characterDescription );
        expect(characterDescription).toBeDefined();
    });

    it(`Can create or retrieve an assistant`, async () => {
        characterCreationAssistant = await CreateConsitentCharacterImageCreationAssistant();
        console.log( characterCreationAssistant );
        expect(characterCreationAssistant).toBeDefined();
    })

    it(`can create a character image`, async () => {

        const thread = await OpenAIClient.beta.threads.create();
        const message1 = await OpenAIClient.beta.threads.messages.create( thread.id, {
            role: "user",
            content: `Create me a character image based on the following description: ${characterDescription}`
        });


        const response1 = await OpenAIClient.beta.threads.runs.create( thread.id, {
            assistant_id: characterCreationAssistant.id,
        });

        console.log( response1 );

        const message2 = await OpenAIClient.beta.threads.messages.create( thread.id, {
            role: "user",
            content: `Create me another image`
        });

        const response2 = await OpenAIClient.beta.threads.runs.create( thread.id, {
            assistant_id: characterCreationAssistant.id,
        });

        console.log( response2 );



        expect(response1).toBeDefined();
        expect(response2).toBeDefined();

    })

});
