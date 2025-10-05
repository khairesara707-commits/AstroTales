import React, { useState } from 'react';
import { useAppContext } from '../../App';
import { UserCircleIcon, StarIcon, InformationCircleIcon, LogoutIcon, StarIconSolid, ArrowLeftIcon } from '../ui/Icons';
import Modal from '../ui/Modal';

interface ProfileScreenProps {
    onClose: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
    const { user, logout } = useAppContext();
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    const handleRateSubmit = () => {
        alert(`Thank you for your feedback!\nRating: ${rating} stars\nComment: ${comment}`);
        setShowRateModal(false);
        setRating(0);
        setComment('');
    };

    const aboutText = `Our project AstroTales is an interactive educational app designed to introduce kids to the fascinating world of space weather through storytelling, animations, Games, and exploration modules. Instead of teaching with complex scientific jargon, our app narrates cosmic phenomena from the perspective of everyday characters such as a farmer, astronaut, pilot, engineer, and child. Each story highlights how space weather events—like solar flares, auroras, or geomagnetic storms—can impact life on Earth and beyond.
The app offers two engaging formats for stories: Read Mode and Animation Mode. At the end of every story, children are presented with a Fun Fact Section, powered by real NASA/NOAA APIs and images, which links the fictional story to real scientific data. This creates a bridge between imagination and reality, making the learning both fun and meaningful.
Beyond stories, Stellar Stories provides:
A Library Section with growth, history, and simplified learning material about space weather.
An Explore Section where kids can interactively learn about planets, cosmic events, and stellar life cycles using APIs and visual content.
A Games Section with gamified quizzes that award points, encouraging engagement and retention.
A Profile Section for account details, achievements, ratings, and feedback.
Our vision is to make space weather education accessible, interactive, and inspiring for kids worldwide.`;


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 p-4 md:p-8 animate-slideIn">
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
            `}</style>
            
            <button onClick={onClose} className="absolute top-6 left-6 p-2 text-gray-300 hover:text-white">
                <ArrowLeftIcon className="h-7 w-7" />
            </button>
            
            <div className="max-w-2xl mx-auto mt-16">
                 <h2 className="text-4xl font-bold text-center mb-8 text-white">Profile & Settings</h2>
                <div className="space-y-4">
                    <div className="menu-item">
                        <UserCircleIcon />
                        <div>
                            <p className="font-bold">{user?.name}</p>
                            <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                    <button className="menu-item w-full" onClick={() => setShowRateModal(true)}>
                        <StarIcon />
                        <span>Rate & Comment</span>
                    </button>
                    <button className="menu-item w-full" onClick={() => setShowAboutModal(true)}>
                        <InformationCircleIcon />
                        <span>About ASTROTALES</span>
                    </button>
                    <button onClick={handleLogout} className="menu-item w-full text-red-400">
                        <LogoutIcon />
                        <span>Log Out</span>
                    </button>
                </div>
                 <style>{`
                    .menu-item { 
                        display: flex; 
                        align-items: center; 
                        gap: 1rem; 
                        background-color: rgba(31, 41, 55, 0.7); 
                        padding: 1rem; 
                        border-radius: 0.5rem;
                        transition: background-color 0.2s;
                        text-align: left;
                    }
                    .menu-item:hover {
                        background-color: rgba(55, 65, 81, 0.7);
                    }
                 `}</style>
            </div>
            
            <Modal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} title="About ASTROTALES">
                <p className="whitespace-pre-wrap leading-relaxed">{aboutText}</p>
            </Modal>
            
            <Modal isOpen={showRateModal} onClose={() => setShowRateModal(false)} title="Rate & Comment">
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-lg font-medium text-white mb-2">Your Rating</label>
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <button
                                        key={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHoverRating(ratingValue)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="text-yellow-400 focus:outline-none"
                                    >
                                        {ratingValue <= (hoverRating || rating) ? (
                                            <StarIconSolid className="h-8 w-8" />
                                        ) : (
                                            <StarIcon className="h-8 w-8" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                         <label htmlFor="comment" className="block text-lg font-medium text-white mb-2">Your Comments</label>
                         <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Tell us what you think..."
                         />
                    </div>
                    <button 
                        onClick={handleRateSubmit} 
                        className="self-end bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={rating === 0}
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileScreen;
