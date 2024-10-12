
const INTERFACE = 
`export interface CharacterCoreTraits {
    name: string;
    age: number;
    gender: Gender;
    species: string;
    occupation: string;
    backstory?: string;  // Expanded: brief backstory to provide context
    motivation?: string;  // Expanded: what drives the character?
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
    skinDetails?: {  // New: details like freckles, scars, moles, wrinkles
        freckles?: string;
        scars?: string;
        birthmarks?: string;
        tattoos?: string;
        texture?: string;
    };
    hair: {
        color: string;
        texture: string;
        length: string;
        style: string;
        highlightColor?: string;
        shine?: string;
        volume?: string;  // New: is the hair thick, thin, voluminous?
    };
    eyes: {
        color: string;
        shape: string;
        distinctiveFeatures?: string;
        eyeSize?: string;  // New: are the eyes large, small, almond-shaped?
    };
    faceShape?: string;  // New: to describe face structure (oval, square, etc.)
    facialHair?: string;  // New: if applicable, to describe any facial hair
    posture?: string;  // New: describes the way they carry themselves
    clothing: {
        outfit: string;
        colorScheme: string;
        material?: string;  // New: specifies fabric material (leather, silk, etc.)
        styleDetails?: string;  // New: any special design patterns, embroidery, etc.
        condition?: string;  // New: is the clothing worn, new, tattered?
    };
    accessories?: {
        headgear?: string;
        jewelry?: string[];
        weapons?: string[];
        other?: string[];
        significance?: string[];  // New: meaning or importance of accessories
    };
}

export interface PersonalityAndExpressions {
    personality: string[];
    defaultEmotion: string;
    facialExpression: string;
    bodyLanguage?: string;  // New: how they physically express emotions
    speechStyle?: string;  // New: describe their manner of speaking
}

export interface DistinctFeaturesOrStyles {
    uniqueFeatures?: string;
    colorScheme: string;
    pose: string;
    movementStyle?: string;  // New: how they move (graceful, clumsy, etc.)
}

export interface EnvironmentalContext {
    setting?: string;
    lighting?: string;
    weather?: string;
    timeOfDay?: string;
    backgroundElements?: string[];  // New: objects or elements in the environment (furniture, landscape)
    mood?: string;  // New: describes the mood or atmosphere of the scene
}

// New interface for image style
export interface ImageStyle {
    styleDescription: string;  // e.g., "realistic", "cartoon", "anime"
    colorPalette?: string[];  // New: predominant colors used in the image
    lightingEffect?: string;  // New: specific lighting effect, e.g., "high contrast", "soft shadows"
    textureLevel?: string;  // New: how detailed the textures are, e.g., "fine details", "smooth", "minimalist"
    artisticInfluence?: string;  // New: any artistic style inspiration, e.g., "Renaissance", "manga"
}

export interface Character {
    coreTraits: CharacterCoreTraits;
    physicalDescription: PhysicalDescription;
    personalityAndExpressions: PersonalityAndExpressions;
    distinctFeaturesOrStyles: DistinctFeaturesOrStyles;
    environmentalContext?: EnvironmentalContext;
    imageStyle?: ImageStyle;  // New: captures the art style for character illustrations
}
`

export const CHARACTER_CREATOR_PROMPT = 
`You are a character creator assistant. Your sole purpose is to generate traits of a character which will be fed into a character 
illustrator algorithm. You will be asked to provide the following information about the character in yaml format which fits this interface.

Your response should be a yaml object of Character with the following properties or "FAILED" if you are unable to provide the information.

Ensure that all information is provided in as much detail as possible. This includes precise descriptions for every attribute—such as hair color, texture, and style; specific details about clothing, accessories, and distinctive features. The goal is to create highly consistent and recognizable characters across multiple images.
You are to give real life characteristics to the character, not fictional ones.

${INTERFACE}
`

export const CHARACTER_ILLUSTRATOR_PROMPT_V0 = 
`You are a Sketch artist. 
Your sole purpose is to generate an image of a character strictly based on the detailed description provided in the yaml object from the interface below.

Your response must only be an image of the character as described. Ensure consistency across iterations and focus only on the character and the scene specified. `

export const CHARACTER_ILLUSTRATOR_PROMPT =
`1.You are program instructed to show the image of a character based on parameters passed by user. 
2. The parameters are in the form of yaml object.
3. You are supposed to use an algorithm that can generate images with "consistency" and "realism" based on the parameters passed.

`

export const CHARACTER_CONVERSION_PROMPT =
`1. You are required to modify the character object passed to you.
2. You are free to change the whole character to fit the new requirements.
3. But, the character has to be consistent with the previous character.

Your response must be the modified version of the yaml object passed to you, and thats it.
`