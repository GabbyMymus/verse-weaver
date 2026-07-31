import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorViewProps {
  recipient: string;
  verses: string[];
  currentPageIndex: number;
  onVersesChange: (verses: string[]) => void;
  onPageChange: (index: number) => void;
  onPresent: () => void;
  onBack: () => void;
}

export default function EditorView({
  recipient,
  verses,
  currentPageIndex,
  onVersesChange,
  onPageChange,
  onPresent,
  onBack,
}: EditorViewProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  const currentVerse = verses[currentPageIndex] || '';
  const previousVerse = currentPageIndex > 0 ? verses[currentPageIndex - 1] : null;

  const updateCurrentVerse = (text: string) => {
    const newVerses = [...verses];
    newVerses[currentPageIndex] = text;
    onVersesChange(newVerses);
  };

  const addNewVerse = () => {
    const newVerses = [...verses];
    newVerses.splice(currentPageIndex + 1, 0, '');
    onVersesChange(newVerses);
    goToPage(currentPageIndex + 1);
  };

  const goToPage = (index: number) => {
    if (isAnimating || index < 0 || index >= verses.length) return;
    setIsAnimating(true);
    setAnimationDirection(index > currentPageIndex ? 'forward' : 'backward');
    setTimeout(() => {
      onPageChange(index);
      setIsAnimating(false);
    }, 700);
  };

  const canGoNext = currentPageIndex < verses.length - 1;
  const canGoPrev = currentPageIndex > 0;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-ui text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          data-testid="button-back-setup"
        >
          <span>←</span> Back
        </button>
        <div className="font-handwriting text-xl text-muted-foreground">
          For {recipient} ♡
        </div>
        <button
          onClick={onPresent}
          className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-ui text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          data-testid="button-present-poem"
        >
          Present My Poem
        </button>
      </div>

      {/* Book Container */}
      <div className="w-full max-w-5xl flex-1 flex items-center justify-center perspective-[2000px]">
        <div className="relative w-full h-[600px] max-h-[70vh] flex items-center justify-center">
          {/* Book Spread - Desktop */}
          <div className="hidden md:flex w-full h-full gap-0 items-center justify-center">
            {/* Left Page - Previous Verse (Read-only) */}
            <div className="w-1/2 h-full flex items-center justify-center pr-2">
              {previousVerse !== null ? (
                <div className="w-full h-full bg-card paper-texture rounded-l-2xl shadow-xl border-r-0 border border-card-border p-8 flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <pre className="font-display text-xl leading-relaxed text-foreground whitespace-pre-wrap text-center max-w-md">
                      {previousVerse || (
                        <span className="text-muted-foreground/40 italic font-ui">
                          (previous verse)
                        </span>
                      )}
                    </pre>
                  </div>
                  <div className="text-center font-ui text-xs text-muted-foreground">
                    Page {currentPageIndex}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>

            {/* Spine */}
            <div className="w-4 h-full bg-gradient-to-r from-primary via-accent to-primary shadow-inner" />

            {/* Right Page - Current Verse (Editable) */}
            <div className="w-1/2 h-full flex items-center justify-center pl-2">
              <div className="w-full h-full bg-card paper-texture rounded-r-2xl shadow-xl border-l-0 border border-card-border p-8 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <textarea
                    value={currentVerse}
                    onChange={(e) => updateCurrentVerse(e.target.value)}
                    placeholder="Write your verse here..."
                    className="w-full h-full max-w-md bg-transparent border-none outline-none font-handwriting text-2xl leading-relaxed text-foreground placeholder:text-muted-foreground/30 resize-none text-center"
                    data-testid="textarea-verse"
                  />
                </div>
                <div className="text-center font-ui text-xs text-muted-foreground">
                  Page {currentPageIndex + 1} of {verses.length}
                </div>
              </div>
            </div>
          </div>

          {/* Single Page - Mobile */}
          <div className="md:hidden w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-card paper-texture rounded-2xl shadow-xl border border-card-border p-6 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <textarea
                  value={currentVerse}
                  onChange={(e) => updateCurrentVerse(e.target.value)}
                  placeholder="Write your verse here..."
                  className="w-full h-full bg-transparent border-none outline-none font-handwriting text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/30 resize-none text-center"
                  data-testid="textarea-verse-mobile"
                />
              </div>
              <div className="text-center font-ui text-xs text-muted-foreground">
                Page {currentPageIndex + 1} of {verses.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-5xl mt-6 flex items-center justify-between">
        <button
          onClick={() => goToPage(currentPageIndex - 1)}
          disabled={!canGoPrev || isAnimating}
          className={`px-6 py-3 rounded-full font-ui text-sm font-medium transition-all duration-300 ${
            canGoPrev && !isAnimating
              ? 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
              : 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
          }`}
          data-testid="button-prev-page"
        >
          ← Previous
        </button>

        <button
          onClick={addNewVerse}
          className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-ui text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          data-testid="button-add-verse"
        >
          + Add Verse
        </button>

        <button
          onClick={() => goToPage(currentPageIndex + 1)}
          disabled={!canGoNext || isAnimating}
          className={`px-6 py-3 rounded-full font-ui text-sm font-medium transition-all duration-300 ${
            canGoNext && !isAnimating
              ? 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
              : 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
          }`}
          data-testid="button-next-page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
