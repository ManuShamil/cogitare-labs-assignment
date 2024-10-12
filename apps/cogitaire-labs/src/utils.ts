import OpenAI from "openai";
import { CHARACTER_CREATOR_PROMPT, CHARACTER_ILLUSTRATOR_PROMPT } from "./prompts";
import { Character } from "./types";
import fs from "fs";
import { v4 } from "uuid";
import yaml from "yaml";

const OpenAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export class CharacterCreator {

    public static loadCharacterFromFile(characterName: string): Character | null {
        const folderName = `exports/characters/${characterName}`;

        if (!fs.existsSync(folderName)) return null;

        const character = fs.readFileSync(`${folderName}/character.yaml`, "utf-8");
        return yaml.parse(character) as Character;
    }

    public static writeToFile(character: Character) {

        console.info(`Writing character to file: ${character.coreTraits.name}`);

        const characterName = character.coreTraits.name;
        const folderName = `exports/characters/${characterName}`;

        if (!fs.existsSync(folderName)) fs.mkdirSync(folderName, { recursive: true });
        fs.writeFileSync(`${folderName}/character.yaml`, yaml.stringify(character, null, 4));

        return true;
    }

    public static async writeImageURLToFile(character: Character, imageURL: string) {

        console.info(`Writing image URL to file: ${character.coreTraits.name}`);

        const characterName = character.coreTraits.name;
        const folderName = `exports/characters/${characterName}`;

        if (!fs.existsSync(folderName)) fs.mkdirSync(folderName, { recursive: true });

        if (!fs.existsSync(`${folderName}/exports.urls`))
            fs.writeFileSync(`${folderName}/exports.urls`, "");

        //! append the image URL to the file
        fs.appendFileSync(`${folderName}/exports.urls`, `${imageURL}\n`);

        //! download the image as well
        const response = await fetch(imageURL);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(`${folderName}/${v4()}.png`, Buffer.from(buffer));


        return true;
    }

    public static async imageFromCharacter(character: Character) {

        const prompt = `${CHARACTER_ILLUSTRATOR_PROMPT}\n${ yaml.stringify(character) }`;

        const imageResponse = await OpenAIClient.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            size: "1024x1024",
            n: 1,
        })

        const images = imageResponse.data.map(i => i.url).filter(i => i != undefined);

        if (images.length > 0) {
            const imageURL = images[0];
            await CharacterCreator.writeImageURLToFile(character, imageURL);
        }

        return images;
    }


    public static async CreateRandomCharacter(): Promise<Character[]> {
        const prompt = CHARACTER_CREATOR_PROMPT;

        const completion = await OpenAIClient.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: prompt
                },
                {
                    role: "user",
                    content: "Create a random character."
                }
            ]
        })

        console.info(completion.choices)

        const responses = completion.choices
            .map(c => {
                let content = c.message.content;
                if (!content) return null;
                //! remove ```yaml from the start of the response
                content = content.replace("```yaml", "");
                //! remove ``` from the end of the response
                content = content.replace("```", "");
                return content;
            })
            .filter(c => !c?.includes("FAILED"));
        const characters = responses.filter(c => c != undefined).map(c => {
            return {
                ...(yaml.parse(c) as Character),
            }
        });

        for (const character of characters)
            await CharacterCreator.writeToFile(character);

        return characters;
    }
}