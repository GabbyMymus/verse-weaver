import { useState } from 'react';
import { motion } from 'framer-motion';

interface SetupViewProps {
  onBeginWriting: (recipient: string, occasion: string, mood: string) => void;
  onBack: () => void;
}

const occasions = [
  'Love Letter',
  'Birthday',
  'Apology',
  'Congratulations',
  'Thank You',
  'Just Because',
];

const moods = [
  { value: 'tender', label: 'Tender', symbol: '♡' },
  { value: 'playful', label: 'Playful', symbol: '✿' },
  { value: 'melancholic', label: 'Melancholic', symbol: '☽' },
  { value: 'joyful', label: 'Joyful', symbol: '✦' },
  { value: 'passionate', label: 'Passionate', symbol: '❋' },
];

export default function SetupView({ onBeginWriting, onBack }: SetupViewProps) {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [customOccasion, setCustomOccasion] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipient && (occasion || customOccasion) && selectedMood) {
      onBeginWriting(
        recipient,
        occasion === 'custom' ? customOccasion : occasion,
        selectedMood
      );
    }
  };

  const canProceed = recipient.trim() && (occasion || customOccasion.trim()) && selectedMood;

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background px-6 py-12">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={onBack}
          className="mb-8 font-ui text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          data-testid="button-back-home"
        >
          <span>←</span> Back
        </button>

        <motion.div
          className="bg-card paper-texture rounded-3xl shadow-xl p-8 md:p-12 border border-card-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-center mb-3 text-foreground">
            Begin Your Poem
          </h2>
          <p className="font-handwriting text-xl text-center text-muted-foreground mb-10">
            Tell me about this special verse
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Recipient */}
            <div>
              <label className="font-ui text-sm font-medium text-foreground/80 mb-3 block">
                Who is this poem for?
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Their name..."
                className="w-full bg-background/50 border-b-2 border-muted/40 focus:border-primary outline-none px-2 py-3 font-handwriting text-2xl text-foreground placeholder:text-muted-foreground/40 transition-colors"
                autoFocus
                data-testid="input-recipient"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="font-ui text-sm font-medium text-foreground/80 mb-3 block">
                What's the occasion?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => {
                      setOccasion(occ);
                      setCustomOccasion('');
                    }}
                    className={`px-4 py-3 rounded-full font-ui text-sm transition-all duration-300 ${
                      occasion === occ
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'bg-background/50 text-foreground/70 hover:bg-primary/20 hover:scale-102'
                    }`}
                    data-testid={`button-occasion-${occ.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={customOccasion}
                onChange={(e) => {
                  setCustomOccasion(e.target.value);
                  setOccasion('custom');
                }}
                placeholder="Or write your own..."
                className="w-full mt-3 bg-background/50 border-b border-muted/40 focus:border-primary outline-none px-2 py-2 font-handwriting text-lg text-foreground placeholder:text-muted-foreground/40 transition-colors"
                data-testid="input-custom-occasion"
              />
            </div>

            {/* Mood */}
            <div>
              <label className="font-ui text-sm font-medium text-foreground/80 mb-3 block">
                Choose a mood
              </label>
              <div className="flex flex-wrap gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`px-6 py-3 rounded-full font-ui text-sm transition-all duration-300 flex items-center gap-2 ${
                      selectedMood === mood.value
                        ? 'bg-accent text-accent-foreground shadow-md scale-105'
                        : 'bg-background/50 text-foreground/70 hover:bg-accent/20 hover:scale-102'
                    }`}
                    data-testid={`button-mood-${mood.value}`}
                  >
                    <span>{mood.symbol}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 flex justify-center">
              <motion.button
                type="submit"
                disabled={!canProceed}
                className={`px-12 py-4 rounded-full font-ui text-lg font-medium shadow-lg transition-all duration-300 ${
                  canProceed
                    ? 'bg-primary text-primary-foreground hover:bg-accent hover:shadow-xl hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
                whileHover={canProceed ? { scale: 1.05 } : {}}
                whileTap={canProceed ? { scale: 0.98 } : {}}
                data-testid="button-begin-writing"
              >
                Begin Writing
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
