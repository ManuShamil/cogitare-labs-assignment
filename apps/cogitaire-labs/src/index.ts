import { CharacterCreator } from "./utils";

async function main() {

    // const randomCharacters = await CharacterCreator.CreateRandomCharacter();

    // console.info( randomCharacters );

    // for ( const character of randomCharacters ) {
    //     const characterImage = await CharacterCreator.imageFromCharacter( character );
    //     console.info( characterImage );
    // }

    const character = CharacterCreator.loadCharacterFromFile("Evelyn Sanders");
    if ( !character ) return console.error("Character not found!");

    const characterImage = await CharacterCreator.imageFromCharacter( character );
    console.info( characterImage );


}

main();