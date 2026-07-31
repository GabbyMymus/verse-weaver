import { useState, useEffect } from 'react';
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

function encodePoemToHash(data: { recipient: string; occasion: string; mood: string; verses: string[] }) {
  try {
    const json = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(json)));
  } catch {
    return null;
  }
}

function decodePoemFromHash(hash: string): { recipient: string; occasion: string; mood: string; verses: string[] } | null {
  try {
    const encoded = hash.startsWith('#poem=') ? hash.slice(6) : hash;
    const json = decodeURIComponent(escape(atob(encoded)));
    const data = JSON.parse(json);
    if (data && typeof data.recipient === 'string' && Array.isArray(data.verses)) {
      return data;
    }
  } catch {
    // invalid hash, ignore
  }
  return null;
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

  // On mount, check if URL has a shared poem in the hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#poem=')) {
      const decoded = decodePoemFromHash(hash);
      if (decoded) {
        setPoemData({
          recipient: decoded.recipient,
          occasion: decoded.occasion,
          mood: decoded.mood,
          verses: decoded.verses.length > 0 ? decoded.verses : [''],
          currentPageIndex: 0,
        });
        setCurrentView('viewer');
      }
    }
  }, []);

  const handleBegin = () => {
    window.history.replaceState(null, '', window.location.pathname);
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
    const versesToShow = nonEmptyVerses.length > 0 ? nonEmptyVerses : poemData.verses;
    setPoemData((prev) => ({ ...prev, verses: versesToShow }));

    // Encode poem into the URL so it's shareable
    const encoded = encodePoemToHash({
      recipient: poemData.recipient,
      occasion: poemData.occasion,
      mood: poemData.mood,
      verses: versesToShow,
    });
    if (encoded) {
      window.history.replaceState(null, '', `#poem=${encoded}`);
    }

    setCurrentView('viewer');
  };

  const handleStartOver = () => {
    window.history.replaceState(null, '', window.location.pathname);
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
    window.history.replaceState(null, '', window.location.pathname);
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
