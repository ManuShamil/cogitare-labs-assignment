import { OpenAI } from 'openai';
import { v4 } from 'uuid';
import fs from 'fs';

const OpenAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


export const generateImage = async ( visualizationPrompt: string ) => {
    const generatedImage = await OpenAIClient.images.generate({
        prompt: visualizationPrompt,
        model: "dall-e-3",
        size: "1024x1024",
        quality: "standard",
        n: 1,
    })

    const url = generatedImage.data[0].url;
    if ( !url ) return null;

    console.info( url );
    
    //! download the image.
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const image = Buffer.from(buffer);

    //! save the image to the file system
    const folder = './exports';
    if ( !fs.existsSync(folder) ) fs.mkdirSync(folder, { recursive: true });

    const imageFileName = `./exports/${v4()}.png`;
    fs.writeFileSync(imageFileName, image);
    

    return generatedImage;
}