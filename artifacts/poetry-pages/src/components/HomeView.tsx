import { motion } from 'framer-motion';

interface HomeViewProps {
  onBegin: () => void;
}

export default function HomeView({ onBegin }: HomeViewProps) {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[10%] left-[15%] text-4xl text-primary/20 float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[20%] text-5xl text-accent/15 float-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{ animationDelay: '1s' }}
        >
          ♡
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] left-[25%] text-3xl text-secondary/25 float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ animationDelay: '2s' }}
        >
          ✿
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[18%] text-4xl text-muted/20 float-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{ animationDelay: '3s' }}
        >
          ❋
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[8%] text-3xl text-primary/15 float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ animationDelay: '1.5s' }}
        >
          ☽
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-[12%] text-5xl text-secondary/20 float-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ animationDelay: '2.5s' }}
        >
          ✦
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 px-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Petal & Verse
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-primary text-2xl">✿</span>
          <p className="font-handwriting text-2xl md:text-3xl text-muted-foreground">
            where love finds its words
          </p>
          <span className="text-primary text-2xl">✿</span>
        </motion.div>

        <motion.p
          className="font-ui text-base md:text-lg text-foreground/70 mb-12 leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Write verses for someone special. Each word lives on its own delicate page,
          turning softly like pressed flowers between diary pages.
        </motion.p>

        <motion.button
          onClick={onBegin}
          className="group relative px-12 py-4 bg-primary text-primary-foreground font-ui text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          data-testid="button-begin-poem"
        >
          <span className="relative z-10">Begin a Poem</span>
          <motion.div
            className="absolute inset-0 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </motion.button>

        <motion.div
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-sm">✦</span>
          <span className="font-ui text-xs tracking-wide uppercase">A poetry studio</span>
          <span className="text-sm">✦</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
