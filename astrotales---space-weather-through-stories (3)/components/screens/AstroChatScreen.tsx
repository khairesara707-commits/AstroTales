import React, { useState, useRef, useEffect, FormEvent } from 'react';
// Fix: Import GoogleGenAI and Chat from @google/genai.
import { GoogleGenAI, Chat } from '@google/genai';
// Fix: Import necessary icons from the newly created Icons.tsx file.
import { PaperAirplaneIcon, SparklesIcon } from '../ui/Icons';
import { useAppContext } from '../../App';

interface Message {
    sender: 'user' | 'model';
    text: string;
    isStreaming?: boolean;
}

const suggestedPrompts = [
    "What is a solar flare?",
    "Tell me a fun fact about Jupiter.",
    "How are auroras created?",
    "What's inside a black hole?",
];

const AstroChatScreen: React.FC = () => {
    const { user } = useAppContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                if (!process.env.API_KEY) {
                    console.error("API_KEY is not set in the execution environment.");
                    setError("Could not connect to Astro. The required API_KEY environment variable is missing. Please ensure it is set in your development or deployment environment for the chat to function.");
                    return;
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are Astro, a friendly and enthusiastic space expert who loves talking to kids. Your goal is to explain complex space and space weather topics in a simple, fun, and engaging way for a young audience (ages 7-12). Keep your answers concise (usually 2-3 sentences), exciting, and easy to understand. Use analogies kids can relate to. Never break character. Always be cheerful and encouraging. The user's name is ${user?.name || 'Explorer'}.`,
                    },
                });
                setMessages([{ sender: 'model', text: `Hi ${user?.name || 'Explorer'}! I'm Astro, your friendly guide to the cosmos. ✨ What amazing space question is on your mind today? Ask me anything!` }]);
            } catch (e) {
                console.error("Error initializing chat:", e);
                const detailedError = e instanceof Error ? e.message : "An unknown error occurred.";
                setError(`Failed to initialize chat: ${detailedError}`);
            }
        };
        initChat();
    }, [user?.name]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        setMessages(prev => [...prev, { sender: 'model', text: '', isStreaming: true }]);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: messageText });

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage?.sender === 'model') {
                        lastMessage.text += chunkText;
                    }
                    return newMessages;
                });
            }

        } catch (e) {
            console.error("Error sending message:", e);
            const errorMessage: Message = { sender: 'model', text: "Oops! My signal got lost in a solar flare. Could you ask me again?" };
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage?.sender === 'model' && lastMessage.text === '' && lastMessage.isStreaming) {
                    newMessages.pop();
                }
                return [...newMessages, errorMessage];
            });
            const detailedError = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to get a response: ${detailedError}`);
        } finally {
            setIsLoading(false);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage?.sender === 'model') {
                    lastMessage.isStreaming = false;
                }
                return newMessages;
            });
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    return (
        <div className="h-full w-full flex flex-col p-2 md:p-4">
            <style>{`
                @keyframes message-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-message-in { animation: message-in 0.3s ease-out forwards; }
                @keyframes blink { 50% { opacity: 0; } }
                .animate-blink { animation: blink 1s step-end infinite; }
            `}</style>
            <h2 className="text-3xl font-bold text-center mb-4 text-white">Chat with Astro</h2>
            <div className="flex-grow bg-black/30 backdrop-blur-md rounded-lg overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => {
                    if (msg.sender === 'model' && msg.isStreaming && msg.text === '') {
                        return (
                             <div key={index} className="flex items-start gap-3 animate-message-in">
                                <div className="p-2 bg-purple-500 rounded-full flex-shrink-0"><SparklesIcon className="h-6 w-6 text-white" /></div>
                                <div className="bg-gray-700 text-white rounded-2xl rounded-bl-none px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''} animate-message-in`}>
                            {msg.sender === 'model' && <div className="p-2 bg-purple-500 rounded-full flex-shrink-0"><SparklesIcon className="h-6 w-6 text-white" /></div>}
                            <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
                               <p className="whitespace-pre-wrap leading-relaxed">{msg.text}{msg.isStreaming && <span className="inline-block w-2 h-4 bg-white ml-1 animate-blink"></span>}</p>
                            </div>
                        </div>
                    );
                })}
                 {messages.length === 1 && !isLoading && (
                    <div className="p-4 flex flex-wrap gap-2 justify-center animate-message-in">
                        {suggestedPrompts.map((prompt) => (
                            <button 
                                key={prompt}
                                onClick={() => handleSendMessage(prompt)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm text-cyan-300 rounded-full transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
                {error && <p className="text-red-400 text-center animate-message-in">{error}</p>}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about planets, stars, or black holes..."
                    className="flex-grow bg-gray-800/50 border border-gray-600 rounded-full py-3 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={isLoading || !input.trim()}
                >
                    <PaperAirplaneIcon className="h-6 w-6" />
                </button>
            </form>
        </div>
    );
};

export default AstroChatScreen;