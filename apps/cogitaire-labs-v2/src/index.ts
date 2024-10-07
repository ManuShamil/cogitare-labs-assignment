import yargs from "yargs";
import { v4 } from "uuid";
import { generateImage } from "./utils";

yargs.command({
    command: "generate-image",
    describe: "Generate an image",
    builder: (yargs) => {
        return yargs
            .option('vPrompt', {
                describe: 'Your prompt for the image',
                type: 'string',
                requiresArg: true
            })
    },
    handler: async (argv) => {

        const vPrompt = argv.vPrompt;
        if (!vPrompt) {
            console.error("No vPrompt provided");
            return;
        }

        console.info(`Input prompt: ${vPrompt}`);
        console.info(`Length of input prompt: ${vPrompt.length}`);

        if ( vPrompt.length > 4000 ) {
            process.exit(1);
        }



        const generatedImage = await generateImage(vPrompt);
        console.info(generatedImage);
    }
})
.help()
.argv;