export interface CharacterCoreTraits {
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