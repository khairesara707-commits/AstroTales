
import React, { useState } from 'react';
import { exploreData } from '../../data/content';
import { PlayIcon, XIcon } from '../ui/Icons';

const ExploreScreen: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Explore the Cosmos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exploreData.map(item => (
                    <div 
                        key={item.id} 
                        className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => item.type === 'video' && setSelectedVideo(item.url)}
                    >
                        {item.type === 'video' ? (
                            <video loop muted playsInline className="w-full h-64 object-cover">
                                <source src={item.url} type="video/mp4" />
                            </video>
                        ) : (
                            <img src={item.url} alt={item.title} className="w-full h-64 object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                                    <PlayIcon className="h-16 w-16 text-white" />
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedVideo && (
                <div 
                    className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                        <video src={selectedVideo} controls autoPlay className="w-full h-auto max-h-[90vh] rounded-lg" />
                        <button 
                            onClick={() => setSelectedVideo(null)} 
                            className="absolute -top-3 -right-3 md:top-0 md:-right-10 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
                            aria-label="Close video player"
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExploreScreen;