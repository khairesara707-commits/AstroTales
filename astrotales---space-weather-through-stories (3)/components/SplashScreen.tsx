import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div 
            className="h-full w-full flex flex-col justify-center items-center overflow-hidden p-4 relative"
            style={{
                backgroundImage: 'url(/Explore/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 3s ease-out forwards;
                }
            `}</style>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            
            {/* App Title */}
            <div className="relative z-10 text-center animate-fadeIn">
                <h1 
                    className="text-6xl md:text-8xl font-black text-white uppercase tracking-widest"
                    style={{ textShadow: '0 0 10px rgba(192, 132, 252, 0.7), 0 0 20px rgba(147, 51, 234, 0.5)' }}
                >
                    ASTROTALES
                </h1>
                <p className="mt-2 text-xl md:text-2xl text-cyan-400 tracking-wider">
                    Space Weather Through Stories
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;