
const INTERFACE = 
`export interface CharacterCoreTraits {
    name: string;
    age: number;
    gender: Gender;
    species: string;
    occupation: string;
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    NonBinary = "Non-binary",
    Other = "Other"
}

export interface PhysicalDescription {
    bodyType: string;
    skinTone: string;
    hair: {
        color: string;
        texture: string;
        length: string;
        style: string;
        highlightColor?: string;
        shine?: string;
    };
    eyes: {
        color: string;
        shape: string;
        distinctiveFeatures?: string;
    };
    clothing: {
        outfit: string;
        colorScheme: string;
    };
    accessories?: {
        headgear?: string;
        jewelry?: string[];
        weapons?: string[];
        other?: string[];
    };
}

export interface PersonalityAndExpressions {
    personality: string[];
    defaultEmotion: string;
    facialExpression: string;
}

export interface DistinctFeaturesOrStyles {
    uniqueFeatures?: string;
    colorScheme: string;
    pose: string;
}

export interface EnvironmentalContext {
    setting?: string;
    lighting?: string;
    weather?: string;
    timeOfDay?: string;
}

export interface Character {
    coreTraits: CharacterCoreTraits;
    physicalDescription: PhysicalDescription;
    personalityAndExpressions: PersonalityAndExpressions;
    distinctFeaturesOrStyles: DistinctFeaturesOrStyles;
    environmentalContext?: EnvironmentalContext;
}`

export const CHARACTER_CREATOR_PROMPT = 
`You are a character creator assistant. Your sole purpose is to generate traits of a character which will be fed into a character 
illustrator algorithm. You will be asked to provide the following information about the character in JSON format which fits this interface.

Your response should be a JSON object of Character with the following properties or "FAILED" if you are unable to provide the information.

Ensure that all information is provided in as much detail as possible. This includes precise descriptions for every attribute—such as hair color, texture, and style; specific details about clothing, accessories, and distinctive features. The goal is to create highly consistent and recognizable characters across multiple images.
You are to give real life characteristics to the character, not fictional ones.

${INTERFACE}
`

export const CHARACTER_ILLUSTRATOR_PROMPT = 
`You are a character Illustrator assistant. 
Your sole purpose is to generate an image of a character strictly based on the detailed description provided in the JSON object from the interface below.

${INTERFACE}

Your response must only be an image of the character as described. Ensure consistency across iterations and focus only on the character and the scene specified. `
