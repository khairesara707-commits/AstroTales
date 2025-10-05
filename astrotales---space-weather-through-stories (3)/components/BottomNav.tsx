import React from 'react';
import { useAppContext } from '../App';
import { View } from '../types';
import { HomeIcon, BookOpenIcon, CollectionIcon, PuzzleIcon, SparklesIcon, ChatIcon } from './ui/Icons';

const NavItem: React.FC<{ view: View; label: string; icon: React.ReactNode }> = ({ view, label, icon }) => {
    const { activeView, setActiveView } = useAppContext();
    const isActive = activeView === view;

    return (
        <button
            onClick={() => setActiveView(view)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
        >
            <div className={`transform transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}>{icon}</div>
            <span className={`text-xs mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>{label}</span>
        </button>
    );
};

const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black bg-opacity-70 backdrop-blur-lg border-t border-gray-800 flex justify-around items-center z-50">
            <NavItem view="Home" label="Home" icon={<HomeIcon />} />
            <NavItem view="Stories" label="Stories" icon={<BookOpenIcon />} />
            <NavItem view="Games" label="Games" icon={<PuzzleIcon />} />
            <NavItem view="Explore" label="Explore" icon={<SparklesIcon />} />
            <NavItem view="AstroChat" label="Chat" icon={<ChatIcon />} />
            <NavItem view="Library" label="Library" icon={<CollectionIcon />} />
        </nav>
    );
};

export default BottomNav;