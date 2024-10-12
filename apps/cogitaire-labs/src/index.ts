import { CharacterCreator } from "./utils";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function createRandomCharacter() {
    console.log("🧩 Generating random characters...");
    const randomCharacters = await CharacterCreator.CreateRandomCharacter();
    console.info("📖 Characters generated:", randomCharacters);

    for (const character of randomCharacters) {
        console.log("💡 Generating image for character:", character.coreTraits.name);
        const characterImage = await CharacterCreator.imageFromCharacter(character);
        console.info("🖼 Image generated:", characterImage);
    }
}

async function createCharacterVariation(characterName: string, additionalPrompt?: string) {
    console.log(`🔍 Loading character '${characterName}'...`);
    let character = CharacterCreator.loadCharacterFromFile(characterName);
    if (!character) return console.error("🚫 Character not found!");

    console.log("💡 Generating image variation...");
    const characterImage = await CharacterCreator.imageFromCharacter(character);
    console.info("🖼 Image variation generated:", characterImage);
}

async function main() {
    const argv = yargs(hideBin(process.argv))
        .command(
            "random",
            "Create a random character and generate an image",
            async () => {
                console.log("🚀 Starting random character creation process...");
                await createRandomCharacter();
            }
        )
        .command(
            "variation <name>",
            "Create a variation for the given character and generate an image",
            (yargs) => {
                yargs.positional("name", {
                    describe: "The name of the character to create a variation for",
                    type: "string",
                });
                yargs.option("additionalPrompt", {
                    describe: "Additional prompt to generate the image",
                    alias: "prompt",
                    type: "string",
                    requiresArg: false,
                });
            },
            async (argv) => {
                const characterName = argv.name;
                const additionalPrompt = argv.prompt;
                console.log("🚀 Starting character variation process...");
                await createCharacterVariation(characterName as string, additionalPrompt as string);
            }
        )
        .demandCommand(1, "🚧 You need to specify a command to run.")
        .help()
        .argv;
}

main();