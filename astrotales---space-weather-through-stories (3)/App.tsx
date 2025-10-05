import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import StoriesScreen from './components/screens/StoriesScreen';
import LibraryScreen from './components/screens/LibraryScreen';
import GamesScreen from './components/screens/GamesScreen';
import ExploreScreen from './components/screens/ExploreScreen';
import AstroChatScreen from './components/screens/AstroChatScreen';
import { User, View, GameProgress } from './types';
import { storyData } from './data/content';

// App Context
interface AppContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  activeView: View;
  setActiveView: (view: View) => void;
  completedStories: string[];
  addCompletedStory: (storyId: string) => void;
  gameProgress: GameProgress;
  updateGameProgress: (gameId: string, progress: { bestScore?: number; bestTime?: number }) => void;
}

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// App Component
const App: React.FC = () => {
    const [appState, setAppState] = useState<'SPLASH' | 'LOGIN' | 'MAIN'>('SPLASH');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (appState === 'SPLASH') {
                setAppState('LOGIN');
            }
        }, 10000); // Splash screen duration
        return () => clearTimeout(timer);
    }, [appState]);

    const renderContent = () => {
        switch (appState) {
            case 'SPLASH':
                return <SplashScreen />;
            case 'LOGIN':
                return <LoginScreen onLoginSuccess={() => setAppState('MAIN')} />;
            case 'MAIN':
                return <MainApp />;
            default:
                return <LoginScreen onLoginSuccess={() => setAppState('MAIN')} />;
        }
    };

    return (
        <AppProvider>
            <div className="h-screen w-screen bg-black text-white overflow-hidden">
                {renderContent()}
            </div>
        </AppProvider>
    );
};

// App Provider
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [activeView, setActiveView] = useState<View>('Home');
    const [completedStories, setCompletedStories] = useState<string[]>([]);
    const [gameProgress, setGameProgress] = useState<GameProgress>({});

    const login = (userData: User) => {
        setUser(userData);
        setActiveView('Home');
        // Load progress from local storage on login
        const savedProgress = localStorage.getItem(`gameProgress_${userData.email}`);
        if (savedProgress) {
            setGameProgress(JSON.parse(savedProgress));
        }
    };

    const logout = () => {
        setUser(null);
        setActiveView('Home');
        setGameProgress({});
    };

    const addCompletedStory = (storyId: string) => {
        if (!completedStories.includes(storyId)) {
            const story = storyData.find(s => s.id === storyId);
            if(story) {
                setCompletedStories(prev => [...prev, story.title]);
            }
        }
    };
    
    const updateGameProgress = (gameId: string, progress: { bestScore?: number; bestTime?: number }) => {
        setGameProgress(prev => {
            const newProgress = { ...prev };
            const current = newProgress[gameId] || {};
            
            if (progress.bestScore !== undefined && (!current.bestScore || progress.bestScore > current.bestScore)) {
                current.bestScore = progress.bestScore;
            }
            if (progress.bestTime !== undefined && (!current.bestTime || progress.bestTime < current.bestTime)) {
                current.bestTime = progress.bestTime;
            }

            newProgress[gameId] = current;

            if(user) {
                localStorage.setItem(`gameProgress_${user.email}`, JSON.stringify(newProgress));
            }
            return newProgress;
        });
    };


    return (
        <AppContext.Provider value={{ user, login, logout, activeView, setActiveView, completedStories, addCompletedStory, gameProgress, updateGameProgress }}>
            {children}
        </AppContext.Provider>
    );
};


// Main App Layout
const MainApp: React.FC = () => {
    const { activeView } = useAppContext();

    const renderActiveView = () => {
        switch (activeView) {
            case 'Home':
                return <HomeScreen />;
            case 'Stories':
                return <StoriesScreen />;
            case 'Library':
                return <LibraryScreen />;
            case 'Games':
                return <GamesScreen />;
            case 'Explore':
                return <ExploreScreen />;
            case 'AstroChat':
                return <AstroChatScreen />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <div className="h-full w-full flex flex-col app-main-bg">
            <main className="flex-grow overflow-y-auto pb-20">
                {renderActiveView()}
            </main>
            <BottomNav />
        </div>
    );
};

export default App;