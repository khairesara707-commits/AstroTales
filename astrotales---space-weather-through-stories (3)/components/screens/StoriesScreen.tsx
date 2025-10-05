import React, { useState, useEffect, useCallback } from 'react';
// Fix: Import types from the correct source file.
import { storyData } from '../../data/content';
import { Character, Story } from '../../types';
import { useAppContext } from '../../App';
import { ArrowLeftIcon, PlayIcon, BookOpenIcon as ReadIcon, SpeakerphoneIcon, XIcon, CheckCircleIcon } from '../ui/Icons';

// Character Selection Screen
const CharacterSelection: React.FC<{ onSelect: (char: Character) => void }> = ({ onSelect }) => {
    const characters: Character[] = ['Astronaut', 'Farmer', 'Pilot', 'Engineer', 'Kid'];
    const charImages: Record<Character, string> = {
        Astronaut: '/Explore/Astronaut.jpg',
        Farmer: '/Explore/farmer.jpg',
        Pilot: '/Explore/pilot.jpg',
        Engineer: '/Explore/engineer.jpg',
        Kid: '/Explore/kid.jpg',
    };
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Choose Your Character</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {characters.map(char => (
                    <div key={char} onClick={() => onSelect(char)} className="group cursor-pointer aspect-[3/4] rounded-lg overflow-hidden relative shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-cyan-500/50">
                        <img src={charImages[char]} alt={char} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{char}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mode Selection Screen
const ModeSelection: React.FC<{ story: Story; onSelect: (mode: 'read' | 'watch') => void }> = ({ story, onSelect }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h2 className="text-4xl font-bold mb-4">{story.title}</h2>
        <p className="text-lg text-gray-300 mb-8">How would you like to experience this story?</p>
        <div className="flex flex-col md:flex-row gap-4">
            <button onClick={() => onSelect('read')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105">
                <ReadIcon /> Read Story
            </button>
            <button onClick={() => onSelect('watch')} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105">
                <PlayIcon /> Watch Animation
            </button>
        </div>
    </div>
);

// Story Viewer
const StoryViewer: React.FC<{ story: Story; mode: 'read' | 'watch'; onFinish: () => void }> = ({ story, mode, onFinish }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const { addCompletedStory } = useAppContext();
    const totalSlides = story.slides.length;
    const slide = story.slides[currentSlide];

    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(s => s + 1);
        } else {
            addCompletedStory(story.id);
            setIsFinished(true);
        }
    };
    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(s => s - 1);
        }
    };

    // Text-to-speech hook logic
    const [isSpeaking, setIsSpeaking] = useState(false);
    const stopSpeech = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);
    
    const speak = useCallback((text: string) => {
        stopSpeech();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    }, [stopSpeech]);

    useEffect(() => {
        if (mode === 'watch' && !isFinished) {
            speak(slide.text);
        }
        return () => {
            stopSpeech();
        };
    }, [currentSlide, mode, slide.text, isFinished, speak, stopSpeech]);
    

    if (isFinished) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center">
                <img src={story.funFact.image} alt="Fun Fact" className="max-w-md w-full h-auto rounded-lg mb-6 shadow-2xl"/>
                <h3 className="text-3xl font-bold text-cyan-400 mb-4">Fun Fact!</h3>
                <p className="text-xl text-white max-w-2xl mb-8">{story.funFact.text}</p>
                <button onClick={onFinish} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
                    <CheckCircleIcon /> Finished
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
             <style>{`
                @keyframes textFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-textFadeIn {
                    animation: textFadeIn 1s ease-out forwards;
                }
            `}</style>
             {mode === 'watch' && slide.videoUrl ? (
                <video key={slide.videoUrl} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                    <source src={slide.videoUrl} type="video/mp4" />
                </video>
            ) : (
                <img src={slide.image} alt={`Slide ${currentSlide + 1}`} className="absolute top-0 left-0 w-full h-full object-cover z-0" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            <div className="relative z-20 flex flex-col justify-end h-full w-full p-4 md:p-8">
                <div key={currentSlide} className="bg-black bg-opacity-60 backdrop-blur-md p-4 md:p-6 rounded-lg mb-20 max-w-4xl mx-auto w-full animate-textFadeIn">
                    <p className="text-lg md:text-xl text-white text-center">{slide.text}</p>
                     {mode === 'watch' && (
                        <button onClick={() => speak(slide.text)} disabled={isSpeaking} className="mx-auto mt-4 flex items-center gap-2 text-cyan-300 disabled:text-gray-500">
                           <SpeakerphoneIcon /> {isSpeaking ? 'Speaking...' : 'Read Aloud'}
                        </button>
                    )}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 z-30 flex justify-between items-center max-w-4xl mx-auto">
                    <button onClick={handlePrev} disabled={currentSlide === 0} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg">Previous</button>
                    <span className="text-white">{currentSlide + 1} / {totalSlides}</span>
                    <button onClick={handleNext} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg">{currentSlide === totalSlides - 1 ? 'Finish' : 'Next'}</button>
                </div>
            </div>
        </div>
    );
};

// Main Stories Screen Component
const StoriesScreen: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState<Character | null>(null);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [storyMode, setStoryMode] = useState<'read' | 'watch' | null>(null);

    useEffect(() => {
        if(selectedChar) {
            const story = storyData.find(s => s.character === selectedChar);
            setSelectedStory(story || null);
        }
    }, [selectedChar]);

    const resetState = () => {
        setSelectedChar(null);
        setSelectedStory(null);
        setStoryMode(null);
    };

    if (selectedStory && storyMode) {
        return (
            <div className="h-full w-full relative">
                <button onClick={resetState} className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/80">
                    <ArrowLeftIcon />
                </button>
                <StoryViewer story={selectedStory} mode={storyMode} onFinish={resetState} />
            </div>
        );
    }

    if (selectedStory) {
        return (
            <div className="h-full w-full relative">
                 <button onClick={() => setSelectedStory(null)} className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/80">
                    <ArrowLeftIcon />
                </button>
                <ModeSelection story={selectedStory} onSelect={setStoryMode} />
            </div>
        );
    }
    
    return <CharacterSelection onSelect={setSelectedChar} />;
};

export default StoriesScreen;