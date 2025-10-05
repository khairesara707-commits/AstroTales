import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { UserCircleIcon } from '../ui/Icons';
import ProfileScreen from './ProfileScreen';

const HomeScreen: React.FC = () => {
    const { user } = useAppContext();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(timer);
        };
    }, []);

    const getGreeting = () => {
        const hour = currentDateTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
    };

    return (
        <div 
            className="h-full w-full flex flex-col justify-center items-center p-4 relative"
        >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <button 
                onClick={() => setIsProfileOpen(true)}
                className="absolute top-6 right-6 p-2 bg-black/30 rounded-full text-white hover:bg-black/60 transition-colors z-30"
                aria-label="Open Profile"
            >
                <UserCircleIcon className="h-8 w-8" />
            </button>

            <div className="relative z-20 w-full max-w-2xl bg-black/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 border border-white/10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {getGreeting()}, {user?.name || 'Explorer'}!
                </h1>
                
                <div className="mt-4">
                    <p className="text-lg text-gray-300">{formatDate(currentDateTime)}</p>
                    <p className="text-6xl font-black text-white tracking-wider mt-1">{formatTime(currentDateTime)}</p>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-6">
                     <p className="text-xl text-cyan-300">
                        The galaxy is full of stories to tell!
                    </p>
                    <p className="mt-2 text-gray-400 max-w-xl mx-auto">
                        Continue your space weather learning journey with interactive stories, games, and exploration.
                    </p>
                </div>
            </div>

            {isProfileOpen && <ProfileScreen onClose={() => setIsProfileOpen(false)} />}
        </div>
    );
};

export default HomeScreen;