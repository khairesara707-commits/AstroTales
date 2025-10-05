
import React from 'react';
import { useAppContext } from '../../App';
import { storyData } from '../../data/content';
import { CollectionIcon, PuzzleIcon, CheckCircleIcon } from '../ui/Icons';

const LibraryScreen: React.FC = () => {
    const { completedStories, gameProgress } = useAppContext();
    const totalStories = storyData.length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">My Library</h2>
            
            <div className="mb-10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Story Progress</h3>
                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg">
                     <div className="flex justify-between items-center mb-2">
                        <p className="text-lg text-white">Stories Completed</p>
                        <p className="text-lg font-semibold text-white">{completedStories.length} / {totalStories}</p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${(completedStories.length / totalStories) * 100}%` }}></div>
                    </div>
                </div>
                {completedStories.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {completedStories.map((storyTitle, index) => (
                            <div key={index} className="bg-gray-800 bg-opacity-50 p-3 rounded-lg flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                                <p className="text-md text-gray-200">{storyTitle}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Game Records</h3>
                {Object.keys(gameProgress).length > 0 ? (
                    <div className="space-y-4">
                        {Object.entries(gameProgress).map(([gameId, progress]) => {
                            // FIX: Cast progress to `any` to resolve type inference issue with `Object.entries`.
                            const p = progress as any;
                            return (
                                <div key={gameId} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg flex items-center shadow-lg">
                                    <div className="p-2 bg-purple-500 rounded-full mr-4">
                                        <PuzzleIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg text-white font-semibold">{gameId.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <p className="text-sm text-gray-300">
                                            {p.bestScore !== undefined && `Best Score: ${p.bestScore}`}
                                            {p.bestTime !== undefined && `Best Time: ${formatTime(p.bestTime)}`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-10">
                        <PuzzleIcon className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-xl">No game records yet.</p>
                        <p>Play some games to set a new record!</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LibraryScreen;
