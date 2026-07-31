import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ViewerViewProps {
  recipient: string;
  occasion: string;
  mood: string;
  verses: string[];
  onStartOver: () => void;
}

export default function ViewerView({
  recipient,
  occasion,
  mood,
  verses,
  onStartOver,
}: ViewerViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  const copyPoem = () => {
    const poemText = `A Poem for ${recipient}\n${occasion}\n\n${verses.filter((v) => v.trim()).join('\n\n---\n\n')}`;
    navigator.clipboard.writeText(poemText);
    toast({
      title: 'Poem copied!',
      description: 'Your beautiful verse is ready to share.',
    });
  };

  const canGoNext = currentPage < verses.length - 1;
  const canGoPrev = currentPage > 0;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            A Poem for {recipient}
          </h2>
          <p className="font-handwriting text-xl text-muted-foreground">
            {occasion} • {mood}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={copyPoem}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-ui text-sm font-medium hover:bg-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
            data-testid="button-copy-poem"
          >
            Copy Poem
          </button>
          <button
            onClick={onStartOver}
            className="px-6 py-2 bg-muted text-muted-foreground rounded-full font-ui text-sm font-medium hover:bg-muted/80 hover:shadow-lg transition-all duration-300 hover:scale-105"
            data-testid="button-start-over"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Book Display */}
      <div className="w-full max-w-4xl flex-1 flex items-center justify-center perspective-[2000px]">
        <motion.div
          className="relative w-full h-[600px] max-h-[70vh] flex items-center justify-center"
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Desktop - Two page spread */}
          <div className="hidden md:flex w-full h-full gap-0 items-center justify-center">
            {/* Left Page */}
            <div className="w-1/2 h-full flex items-center justify-center pr-2">
              {currentPage > 0 ? (
                <div className="w-full h-full bg-card paper-texture rounded-l-2xl shadow-xl border-r-0 border border-card-border p-8 flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <pre className="font-display text-xl leading-relaxed text-foreground whitespace-pre-wrap text-center max-w-md">
                      {verses[currentPage - 1] || ''}
                    </pre>
                  </div>
                  <div className="text-center font-ui text-xs text-muted-foreground">
                    Page {currentPage}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>

            {/* Spine */}
            <div className="w-4 h-full bg-gradient-to-r from-primary via-accent to-primary shadow-inner" />

            {/* Right Page */}
            <div className="w-1/2 h-full flex items-center justify-center pl-2">
              <div className="w-full h-full bg-card paper-texture rounded-r-2xl shadow-xl border-l-0 border border-card-border p-8 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <pre className="font-display text-xl leading-relaxed text-foreground whitespace-pre-wrap text-center max-w-md">
                    {verses[currentPage] || ''}
                  </pre>
                </div>
                <div className="text-center font-ui text-xs text-muted-foreground">
                  Page {currentPage + 1} of {verses.length}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile - Single page */}
          <div className="md:hidden w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-card paper-texture rounded-2xl shadow-xl border border-card-border p-6 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <pre className="font-display text-lg leading-relaxed text-foreground whitespace-pre-wrap text-center">
                  {verses[currentPage] || ''}
                </pre>
              </div>
              <div className="text-center font-ui text-xs text-muted-foreground">
                Page {currentPage + 1} of {verses.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-4xl mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={!canGoPrev}
          className={`px-6 py-3 rounded-full font-ui text-sm font-medium transition-all duration-300 ${
            canGoPrev
              ? 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
              : 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
          }`}
          data-testid="button-viewer-prev"
        >
          ← Previous
        </button>

        <div className="font-handwriting text-lg text-muted-foreground flex items-center gap-2">
          <span>✦</span>
          <span>
            {currentPage + 1} / {verses.length}
          </span>
          <span>✦</span>
        </div>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!canGoNext}
          className={`px-6 py-3 rounded-full font-ui text-sm font-medium transition-all duration-300 ${
            canGoNext
              ? 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
              : 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
          }`}
          data-testid="button-viewer-next"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
