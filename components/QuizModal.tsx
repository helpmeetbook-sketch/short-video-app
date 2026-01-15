
import React, { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

interface QuizModalProps {
  quiz: Quiz;
  onComplete: (correct: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quiz, onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onComplete(selected === quiz.correctIndex);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
            <Award size={32} />
          </div>
        </div>
        
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest text-center mb-2">Check your knowledge</h2>
        <h3 className="text-xl font-bold text-white text-center mb-8 leading-tight">{quiz.question}</h3>

        <div className="space-y-3">
          {quiz.options.map((option, idx) => {
            let bgColor = "bg-white/5";
            let borderColor = "border-white/5";
            
            if (isSubmitted) {
              if (idx === quiz.correctIndex) {
                bgColor = "bg-green-500/20";
                borderColor = "border-green-500/50";
              } else if (idx === selected) {
                bgColor = "bg-red-500/20";
                borderColor = "border-red-500/50";
              }
            } else if (selected === idx) {
              borderColor = "border-blue-400";
              bgColor = "bg-blue-400/10";
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelected(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${bgColor} ${borderColor}`}
              >
                <span className={`font-semibold ${selected === idx ? 'text-white' : 'text-gray-400'}`}>{option}</span>
                {isSubmitted && idx === quiz.correctIndex && <CheckCircle2 className="text-green-500" size={20} />}
                {isSubmitted && idx === selected && idx !== quiz.correctIndex && <XCircle className="text-red-500" size={20} />}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selected === null || isSubmitted}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg transition-all ${
            selected !== null && !isSubmitted 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-zinc-800 text-zinc-500'
          }`}
        >
          {isSubmitted ? (selected === quiz.correctIndex ? 'Correct! +30 XP' : 'Incorrect') : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
