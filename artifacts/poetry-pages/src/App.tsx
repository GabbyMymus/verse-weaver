import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import HomeView from '@/components/HomeView';
import SetupView from '@/components/SetupView';
import EditorView from '@/components/EditorView';
import ViewerView from '@/components/ViewerView';

const queryClient = new QueryClient();

type AppView = 'home' | 'setup' | 'editor' | 'viewer';

interface PoemData {
  recipient: string;
  occasion: string;
  mood: string;
  verses: string[];
  currentPageIndex: number;
}

function PetalAndVerse() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [poemData, setPoemData] = useState<PoemData>({
    recipient: '',
    occasion: '',
    mood: '',
    verses: [''],
    currentPageIndex: 0,
  });

  const handleBegin = () => {
    setCurrentView('setup');
  };

  const handleBeginWriting = (recipient: string, occasion: string, mood: string) => {
    setPoemData({
      recipient,
      occasion,
      mood,
      verses: [''],
      currentPageIndex: 0,
    });
    setCurrentView('editor');
  };

  const handleVersesChange = (verses: string[]) => {
    setPoemData((prev) => ({ ...prev, verses }));
  };

  const handlePageChange = (index: number) => {
    setPoemData((prev) => ({ ...prev, currentPageIndex: index }));
  };

  const handlePresent = () => {
    // Filter out empty verses before presenting
    const nonEmptyVerses = poemData.verses.filter((v) => v.trim());
    if (nonEmptyVerses.length === 0) {
      // Keep at least one verse even if empty
      setPoemData((prev) => ({ ...prev, verses: poemData.verses }));
    } else {
      setPoemData((prev) => ({ ...prev, verses: nonEmptyVerses }));
    }
    setCurrentView('viewer');
  };

  const handleStartOver = () => {
    setPoemData({
      recipient: '',
      occasion: '',
      mood: '',
      verses: [''],
      currentPageIndex: 0,
    });
    setCurrentView('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleBackToSetup = () => {
    setCurrentView('setup');
  };

  return (
    <>
      {currentView === 'home' && <HomeView onBegin={handleBegin} />}
      {currentView === 'setup' && (
        <SetupView onBeginWriting={handleBeginWriting} onBack={handleBackToHome} />
      )}
      {currentView === 'editor' && (
        <EditorView
          recipient={poemData.recipient}
          verses={poemData.verses}
          currentPageIndex={poemData.currentPageIndex}
          onVersesChange={handleVersesChange}
          onPageChange={handlePageChange}
          onPresent={handlePresent}
          onBack={handleBackToSetup}
        />
      )}
      {currentView === 'viewer' && (
        <ViewerView
          recipient={poemData.recipient}
          occasion={poemData.occasion}
          mood={poemData.mood}
          verses={poemData.verses}
          onStartOver={handleStartOver}
        />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PetalAndVerse />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
