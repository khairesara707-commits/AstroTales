// Fix: Centralize all type definitions in this file and export them.
export type View = 'Home' | 'Stories' | 'Library' | 'Games' | 'Explore' | 'AstroChat';

export interface User {
    name: string;
    email: string;
}

export interface GameProgress {
    [key: string]: {
        bestScore?: number;
        bestTime?: number;
    };
}

export type Character = 'Astronaut' | 'Farmer' | 'Pilot' | 'Engineer' | 'Kid';

export interface Story {
    id: string;
    character: Character;
    title: string;
    slides: {
        image: string;
        videoUrl?: string;
        text: string;
    }[];
    funFact: {
        image: string;
        text: string;
    };
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface PuzzleInfo {
    id: string;
    name: string;
    url: string;
}

export interface PictureIdentifyQuestion {
    image: string;
    options: string[];
    correctAnswer: string;
}

export interface ExploreMedia {
    id: number;
    type: 'image' | 'video';
    url: string;
    title: string;
}

export interface CrosswordEntry {
    clue: string;
    answer: string;
    direction: 'across' | 'down';
    row: number;
    col: number;
}

export interface CrosswordData {
    id: string;
    name: string;
    size: number;
    entries: CrosswordEntry[];
}