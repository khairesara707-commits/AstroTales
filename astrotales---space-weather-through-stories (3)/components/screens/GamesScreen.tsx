import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { quizQuestions, puzzleImages, pictureIdentifyData, crosswordGames } from '../../data/content';
import { PuzzleIcon, ArrowLeftIcon } from '../ui/Icons';
import { useAppContext } from '../../App';
import { PuzzleInfo, CrosswordData, CrosswordEntry } from '../../types';

type Game = 'Quiz' | 'Puzzle' | 'Identify' | 'Crossword' | null;

// --- Sound Effects ---
const SOUNDS = {
    CLICK: 'https://cdn.freesound.org/previews/270/270320_5122119-lq.mp3',
    CORRECT: 'https://cdn.freesound.org/previews/391/391539_5122119-lq.mp3',
    INCORRECT: 'https://cdn.freesound.org/previews/171/171493_2385411-lq.mp3',
    WIN: 'https://cdn.freesound.org/previews/270/270333_5122119-lq.mp3',
    DROP: 'https://cdn.freesound.org/previews/155/155609_2234403-lq.mp3'
};

const playSound = (src: string) => {
    try {
        const sound = new Audio(src);
        sound.volume = 0.4;
        sound.play().catch(e => console.error("Error playing sound:", e));
    } catch (e) {
        console.error("Could not create or play sound:", e);
    }
};
// --- End of Sound Effects ---

const GameMenu: React.FC<{ onSelect: (game: Game) => void }> = ({ onSelect }) => {
    const games: { name: string; type: Game, image: string }[] = [
        { name: 'Quiz Challenge', type: 'Quiz', image: '/Explore/space_quiz.jpg' },
        { name: 'Jigsaw Puzzle', type: 'Puzzle', image: '/Explore/space_puzzle.jpg' },
        { name: 'Identify Picture', type: 'Identify', image: '/Explore/guess.jpg' },
        { name: 'Cosmic Crossword', type: 'Crossword', image: '/Explore/space_crossword.jpg' },
    ];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Space Games</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                {games.map(game => (
                    <div key={game.type} onClick={() => onSelect(game.type)} className="group cursor-pointer aspect-square rounded-lg overflow-hidden relative shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-cyan-500/50">
                        <img src={game.image} alt={game.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{game.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};


const QuizGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { updateGameProgress } = useAppContext();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    useEffect(() => {
        if (currentQuestion >= quizQuestions.length) {
            playSound(SOUNDS.WIN);
        }
    }, [currentQuestion]);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(s => s + 10);
            playSound(SOUNDS.CORRECT);
        } else {
            playSound(SOUNDS.INCORRECT);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            if(currentQuestion + 1 >= quizQuestions.length) {
                updateGameProgress('Quiz Challenge', { bestScore: score + (isCorrect ? 10 : 0) });
            }
            setCurrentQuestion(q => q + 1);
        }, 1500);
    };
    
    if (currentQuestion >= quizQuestions.length) {
        return <div className="text-center p-8">
            <h3 className="text-3xl font-bold">Quiz Complete!</h3>
            <p className="text-2xl mt-4">Your final score: {score} / {quizQuestions.length * 10}</p>
            <button onClick={onBack} className="mt-8 px-6 py-2 bg-cyan-600 rounded-lg">Back to Games</button>
        </div>;
    }

    const { question, options, correctAnswer } = quizQuestions[currentQuestion];
    return <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <p className="text-lg text-gray-300 mb-2">Question {currentQuestion + 1}/{quizQuestions.length}</p>
        <h3 className="text-2xl font-bold mb-6">{question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map(opt => {
                let bgColor = 'bg-gray-700 hover:bg-gray-600';
                if (selectedAnswer) {
                    if (opt === correctAnswer) bgColor = 'bg-green-600';
                    else if (opt === selectedAnswer) bgColor = 'bg-red-600';
                    else bgColor = 'bg-gray-800 opacity-50';
                }
                return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selectedAnswer} className={`p-4 rounded-lg text-left transition-colors duration-300 ${bgColor}`}>{opt}</button>;
            })}
        </div>
    </div>;
};

const PuzzleSetup: React.FC<{ onStart: (puzzle: PuzzleInfo, size: number) => void }> = ({ onStart }) => {
    const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleInfo>(puzzleImages[0]);
    const [size, setSize] = useState(3);
    return <div className="p-4 flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-6">Setup Your Puzzle</h3>
        <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3 text-center">Choose an Image</h4>
            <div className="flex gap-4">
                {puzzleImages.map(p => (
                    <img key={p.id} src={p.url} alt={p.name} onClick={() => { playSound(SOUNDS.CLICK); setSelectedPuzzle(p); }} className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-4 ${selectedPuzzle.id === p.id ? 'border-cyan-500' : 'border-transparent'}`} />
                ))}
            </div>
        </div>
        <div className="mb-8">
            <h4 className="text-xl font-semibold mb-3 text-center">Choose a Size</h4>
            <div className="flex gap-4">
                {[3, 4, 5].map(s => (
                    <button key={s} onClick={() => { playSound(SOUNDS.CLICK); setSize(s); }} className={`px-6 py-3 rounded-lg font-bold ${size === s ? 'bg-cyan-600 text-white' : 'bg-gray-700'}`}>{s}x{s}</button>
                ))}
            </div>
        </div>
        <button onClick={() => { playSound(SOUNDS.CLICK); onStart(selectedPuzzle, size); }} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg text-lg">Start Puzzle</button>
    </div>
}

const PuzzleGame: React.FC<{ puzzle: PuzzleInfo, gridSize: number, onBack: () => void }> = ({ puzzle, gridSize, onBack }) => {
    const { updateGameProgress, user } = useAppContext();
    const pieces = useMemo(() => Array.from({ length: gridSize * gridSize }, (_, i) => i), [gridSize]);
    const [shuffledPieces, setShuffledPieces] = useState(() => [...pieces].sort(() => Math.random() - 0.5));
    const [isComplete, setIsComplete] = useState(false);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const storageKey = `bestTime_${user?.email}_${puzzle.id}_${gridSize}x${gridSize}`;
    const [bestTime, setBestTime] = useState<number | null>(() => {
        const stored = localStorage.getItem(storageKey);
        return stored ? parseInt(stored, 10) : null;
    });

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = window.setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const checkCompletion = useCallback((currentPieces: number[]) => {
        const completed = currentPieces.every((p, i) => p === i);
        if (completed) {
            setIsComplete(true);
            setIsActive(false);
            playSound(SOUNDS.WIN);
            const gameId = `Puzzle: ${puzzle.name} ${gridSize}x${gridSize}`;
            updateGameProgress(gameId, { bestTime: time });
            if (bestTime === null || time < bestTime) {
                setBestTime(time);
                localStorage.setItem(storageKey, time.toString());
            }
        }
    }, [time, bestTime, gridSize, puzzle.name, storageKey, updateGameProgress]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        playSound(SOUNDS.DROP);
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (sourceIndex === targetIndex) return;

        const newPieces = [...shuffledPieces];
        [newPieces[sourceIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[sourceIndex]];
        setShuffledPieces(newPieces);
        checkCompletion(newPieces);
    };

    const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${('0' + seconds % 60).slice(-2)}`;
    
    const puzzleSize = Math.min(window.innerWidth * 0.8, 500);

    return <div className="p-4 flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-4">{puzzle.name} ({gridSize}x{gridSize})</h3>
        <div className="flex gap-8 mb-4 text-lg">
            <span>Time: {formatTime(time)}</span>
            <span>Best: {bestTime !== null ? formatTime(bestTime) : 'N/A'}</span>
        </div>
        {isComplete &&
            <>
                <div className="text-green-400 font-bold mb-4 text-2xl">Congratulations! Puzzle Solved in {formatTime(time)}!</div>
                <button onClick={onBack} className="mt-4 px-6 py-2 bg-cyan-600 rounded-lg">Back to Games</button>
            </>
        }
        <div onDrop={e => e.preventDefault()} style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: `${puzzleSize}px`, height: `${puzzleSize}px` }} className="gap-1 border-2 border-cyan-500 rounded-lg overflow-hidden">
            {shuffledPieces.map((piece, index) => (
                <div key={index}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDrop(e, index)}
                    onDragStart={e => e.dataTransfer.setData('text/plain', index.toString())}
                    draggable={!isComplete}
                    style={{
                        backgroundImage: `url(${puzzle.url})`,
                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                        backgroundPosition: `${(piece % gridSize) * 100 / (gridSize - 1)}% ${(Math.floor(piece / gridSize)) * 100 / (gridSize - 1)}%`,
                        cursor: isComplete ? 'default' : 'grab'
                    }}
                    className="w-full h-full transition-opacity duration-500"
                ></div>
            ))}
        </div>
    </div>;
};

const IdentifyPictureGame: React.FC<{onBack: () => void}> = ({onBack}) => {
    const { updateGameProgress } = useAppContext();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

     useEffect(() => {
        if (currentQuestion >= pictureIdentifyData.length) {
            playSound(SOUNDS.WIN);
        }
    }, [currentQuestion]);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        const correct = answer === pictureIdentifyData[currentQuestion].correctAnswer;
        if (correct) {
            setScore(s => s + 10);
            playSound(SOUNDS.CORRECT);
        } else {
            playSound(SOUNDS.INCORRECT);
        }
        
        setTimeout(() => {
            setSelectedAnswer(null);
            if(currentQuestion + 1 >= pictureIdentifyData.length) {
                updateGameProgress('Identify the Picture', { bestScore: score + (correct ? 10 : 0) });
            }
            setCurrentQuestion(q => q + 1);
        }, 1500);
    };

    if (currentQuestion >= pictureIdentifyData.length) {
        return <div className="text-center p-8">
            <h3 className="text-3xl font-bold">Game Complete!</h3>
            <p className="text-2xl mt-4">Your final score: {score} / {pictureIdentifyData.length * 10}</p>
            <button onClick={onBack} className="mt-8 px-6 py-2 bg-cyan-600 rounded-lg">Play Again</button>
        </div>;
    }

    const { image, options, correctAnswer } = pictureIdentifyData[currentQuestion];
    return <div className="p-4 md:p-8 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">What is this?</h3>
        <img src={image} alt="Identify this" className="w-full max-w-md mx-auto rounded-lg mb-6"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map(opt => {
                let bgColor = 'bg-gray-700 hover:bg-gray-600';
                if (selectedAnswer) {
                    if (opt === correctAnswer) bgColor = 'bg-green-600';
                    else if (opt === selectedAnswer) bgColor = 'bg-red-600';
                    else bgColor = 'bg-gray-800 opacity-50';
                }
                return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selectedAnswer} className={`p-4 rounded-lg transition-colors duration-300 ${bgColor}`}>{opt}</button>;
            })}
        </div>
    </div>;
};

// --- Crossword Game Components ---
const CrosswordSelection: React.FC<{ onSelect: (puzzle: CrosswordData) => void }> = ({ onSelect }) => (
    <div className="p-4 flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-6">Choose a Crossword</h3>
        <div className="space-y-4">
            {crosswordGames.map(puzzle => (
                <button key={puzzle.id} onClick={() => onSelect(puzzle)} className="w-full md:w-96 text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    {puzzle.name} ({puzzle.size}x{puzzle.size})
                </button>
            ))}
        </div>
    </div>
);

const CrosswordGame: React.FC<{ puzzle: CrosswordData; onBack: () => void }> = ({ puzzle, onBack }) => {
    type GridState = (string | null)[][];
    type ValidationState = (boolean | null)[][];

    const [gridState, setGridState] = useState<GridState>(() => Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill(null)));
    const [activeCell, setActiveCell] = useState<{ row: number; col: number }>({ row: puzzle.entries[0].row, col: puzzle.entries[0].col });
    const [direction, setDirection] = useState<'across' | 'down'>(puzzle.entries[0].direction);
    const [validationState, setValidationState] = useState<ValidationState>(() => Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill(null)));
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

    const { gridLayout, clues, findClueForCell } = useMemo(() => {
        const layout: ({ number: number | null, solution: string | null })[][] = Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill({ number: null, solution: null }));
        const acrossClues: { number: number, clue: string, entry: CrosswordEntry }[] = [];
        const downClues: { number: number, clue: string, entry: CrosswordEntry }[] = [];
        let clueNumber = 1;

        const sortedEntries = [...puzzle.entries].sort((a, b) => a.row - b.row || a.col - b.col);
        const placedStarts = new Set<string>();

        for (const entry of sortedEntries) {
            const startKey = `${entry.row},${entry.col}`;
            let currentClueNumber = layout[entry.row][entry.col].number;
            if (!placedStarts.has(startKey)) {
                currentClueNumber = clueNumber;
                layout[entry.row][entry.col] = { ...layout[entry.row][entry.col], number: clueNumber };
                placedStarts.add(startKey);
                clueNumber++;
            }
            
            const clueObj = { number: currentClueNumber!, clue: entry.clue, entry };
            if (entry.direction === 'across') acrossClues.push(clueObj);
            else downClues.push(clueObj);

            for (let i = 0; i < entry.answer.length; i++) {
                const r = entry.row + (entry.direction === 'down' ? i : 0);
                const c = entry.col + (entry.direction === 'across' ? i : 0);
                if(r < puzzle.size && c < puzzle.size) {
                    layout[r][c] = { ...layout[r][c], solution: entry.answer[i] };
                }
            }
        }
        
        const findClue = (row: number, col: number, dir: 'across' | 'down') => {
            return puzzle.entries.find(e => {
                if (e.direction !== dir) return false;
                if (dir === 'across') return e.row === row && col >= e.col && col < e.col + e.answer.length;
                return e.col === col && row >= e.row && row < e.row + e.answer.length;
            });
        };

        return { gridLayout: layout, clues: { across: acrossClues, down: downClues }, findClueForCell: findClue };
    }, [puzzle]);

    const activeClue = findClueForCell(activeCell.row, activeCell.col, direction);

    const handleCellClick = (row: number, col: number) => {
        if (gridLayout[row][col].solution === null) return;
        if (activeCell.row === row && activeCell.col === col) {
            const otherDirection = direction === 'across' ? 'down' : 'across';
            if (findClueForCell(row, col, otherDirection)) {
                setDirection(otherDirection);
            }
        } else {
             const hasAcross = findClueForCell(row, col, 'across');
             const hasDown = findClueForCell(row, col, 'down');
             if(hasAcross && !hasDown) setDirection('across');
             else if (!hasAcross && hasDown) setDirection('down');
             // if both, keep current or default to across
             else if(hasAcross && hasDown) setDirection(d => findClueForCell(row, col, d) ? d : 'across');

        }
        setActiveCell({ row, col });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        const key = e.key.toUpperCase();
        if (key.match(/^[A-Z]$/)) {
            const newGridState = gridState.map(r => [...r]);
            newGridState[row][col] = key;
            setGridState(newGridState);

            // Move to next cell
            let nextRow = row, nextCol = col;
            do {
                if (direction === 'across') nextCol++;
                else nextRow++;
                if (nextRow >= puzzle.size || nextCol >= puzzle.size || !gridLayout[nextRow][nextCol].solution) break;
            } while(!gridLayout[nextRow][nextCol].solution);
            
            if (nextRow < puzzle.size && nextCol < puzzle.size && gridLayout[nextRow][nextCol].solution) {
                 setActiveCell({ row: nextRow, col: nextCol });
            }
        } else if (e.key === 'Backspace') {
            const newGridState = gridState.map(r => [...r]);
            if (newGridState[row][col]) {
                newGridState[row][col] = null;
                setGridState(newGridState);
            } else {
                let prevRow = row, prevCol = col;
                if (direction === 'across') prevCol--;
                else prevRow--;

                if (prevRow >= 0 && prevCol >= 0) {
                    setActiveCell({ row: prevRow, col: prevCol });
                }
            }
        } else if (e.key.startsWith('Arrow')) {
            e.preventDefault();
            let {row: r, col: c} = activeCell;
            if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
            if (e.key === 'ArrowDown') r = Math.min(puzzle.size - 1, r + 1);
            if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
            if (e.key === 'ArrowRight') c = Math.min(puzzle.size - 1, c + 1);
            if(gridLayout[r][c].solution) setActiveCell({row: r, col: c});
        }
    };
    
    useEffect(() => {
        inputRefs.current[activeCell.row]?.[activeCell.col]?.focus();
    }, [activeCell]);
    
     const checkPuzzle = () => {
        const newValidationState: ValidationState = gridState.map((row, r) =>
            row.map((cell, c) => {
                if (gridLayout[r][c].solution === null) return null;
                return cell === gridLayout[r][c].solution;
            })
        );
        setValidationState(newValidationState);
        setTimeout(() => setValidationState(Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill(null))), 2000);
    };

    return <div className="p-2 md:p-4 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">{puzzle.name}</h3>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <div className="flex-shrink-0">
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }} className="border-2 border-gray-500">
                    {gridLayout.map((row, r) => row.map((cell, c) => {
                        const isActive = activeCell.row === r && activeCell.col === c;
                        const inActiveWord = activeClue && (
                            (direction === 'across' && activeClue.row === r && c >= activeClue.col && c < activeClue.col + activeClue.answer.length) ||
                            (direction === 'down' && activeClue.col === c && r >= activeClue.row && r < activeClue.row + activeClue.answer.length)
                        );
                        
                        let cellBg = 'bg-gray-800';
                        if(inActiveWord) cellBg = 'bg-cyan-900';
                        if(isActive) cellBg = 'bg-cyan-700';
                        if(validationState[r][c] === true) cellBg = 'bg-green-700 animate-pulse';
                        if(validationState[r][c] === false) cellBg = 'bg-red-700 animate-pulse';

                        if (cell.solution === null) return <div key={`${r}-${c}`} className="w-8 h-8 md:w-10 md:h-10 bg-black" />;
                        
                        return <div key={`${r}-${c}`} onClick={() => handleCellClick(r, c)} className={`relative w-8 h-8 md:w-10 md:h-10 border border-gray-600 ${cellBg} transition-colors`}>
                            {cell.number && <span className="absolute top-0 left-0.5 text-xs text-gray-400">{cell.number}</span>}
                             <input
                                ref={el => {
                                    if (!inputRefs.current[r]) inputRefs.current[r] = [];
                                    inputRefs.current[r][c] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={gridState[r][c] || ''}
                                onChange={(e) => {
                                    const val = e.target.value.toUpperCase();
                                    if (val.match(/^[A-Z]$/)) {
                                       handleKeyDown({key: val} as React.KeyboardEvent<HTMLInputElement>, r, c);
                                    }
                                }}
                                onKeyDown={(e) => handleKeyDown(e, r, c)}
                                className="w-full h-full bg-transparent text-white text-center text-lg uppercase focus:outline-none"
                            />
                        </div>
                    }))}
                </div>
                 <button onClick={checkPuzzle} className="w-full mt-4 px-6 py-2 bg-blue-600 rounded-lg">Check Puzzle</button>
            </div>
            <div className="w-full md:w-80 h-96 overflow-y-auto p-2 bg-gray-800 rounded-lg">
                <h4 className="text-xl font-bold text-cyan-400">Across</h4>
                {clues.across.map(({ number, clue, entry }) => <p key={`a-${number}`} onClick={() => { setActiveCell({row: entry.row, col: entry.col}); setDirection('across');}} className={`cursor-pointer p-1 rounded ${activeClue === entry && direction === 'across' ? 'bg-cyan-800' : ''}`}>{number}. {clue}</p>)}
                <h4 className="text-xl font-bold mt-4 text-cyan-400">Down</h4>
                {clues.down.map(({ number, clue, entry }) => <p key={`d-${number}`} onClick={() => { setActiveCell({row: entry.row, col: entry.col}); setDirection('down');}} className={`cursor-pointer p-1 rounded ${activeClue === entry && direction === 'down' ? 'bg-cyan-800' : ''}`}>{number}. {clue}</p>)}
            </div>
        </div>
    </div>;
};
// --- End of Crossword Components ---


const GamesScreen: React.FC = () => {
    const [activeGame, setActiveGame] = useState<Game>(null);
    const [puzzleConfig, setPuzzleConfig] = useState<{ puzzle: PuzzleInfo, size: number} | null>(null);
    const [crosswordConfig, setCrosswordConfig] = useState<CrosswordData | null>(null);

    const handleSelectGame = (game: Game) => {
        playSound(SOUNDS.CLICK);
        setActiveGame(game);
    };

    const handleBack = () => {
        playSound(SOUNDS.CLICK);
        setActiveGame(null);
        setPuzzleConfig(null);
        setCrosswordConfig(null);
    };

    const renderGame = () => {
        switch (activeGame) {
            case 'Quiz': return <QuizGame onBack={handleBack} />;
            case 'Puzzle': 
                if (puzzleConfig) return <PuzzleGame puzzle={puzzleConfig.puzzle} gridSize={puzzleConfig.size} onBack={handleBack} />;
                return <PuzzleSetup onStart={(puzzle, size) => { playSound(SOUNDS.CLICK); setPuzzleConfig({ puzzle, size }); }} />;
            case 'Identify': return <IdentifyPictureGame onBack={handleBack} />;
            case 'Crossword':
                if (crosswordConfig) return <CrosswordGame puzzle={crosswordConfig} onBack={handleBack} />;
                return <CrosswordSelection onSelect={(puzzle) => { playSound(SOUNDS.CLICK); setCrosswordConfig(puzzle); }} />;
            default: return <GameMenu onSelect={handleSelectGame} />;
        }
    };
    
    return (
      <div className="w-full h-full relative">
        {(activeGame || puzzleConfig || crosswordConfig) && (
          <button onClick={handleBack} className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/80">
            <ArrowLeftIcon />
          </button>
        )}
        {renderGame()}
      </div>
    );
};

export default GamesScreen;