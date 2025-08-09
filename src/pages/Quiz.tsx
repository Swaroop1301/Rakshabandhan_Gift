import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { SITE_TITLE, UNLOCK_KEY } from "@/data/config";

const fadeVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const progress = useMemo(() => Math.round(((index) / total) * 100), [index, total]);

  const handleAnswer = (i: number) => {
    if (selected !== null) return; // prevent multiple clicks
    setSelected(i);
    const correct = i === QUIZ_QUESTIONS[index].correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      confetti({ particleCount: 70, spread: 60, ticks: 120, origin: { y: 0.6 } });
      setTimeout(() => nextQuestion(), 600);
    } else {
      // gentle shake effect handled by key prop transition
      setTimeout(() => nextQuestion(), 650);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
      const unlocked = score + (selected === QUIZ_QUESTIONS[index].correctIndex ? 1 : 0) >= 6;
      if (unlocked) {
        localStorage.setItem(UNLOCK_KEY, "true");
        confetti({ particleCount: 180, spread: 90, ticks: 200, origin: { y: 0.6 } });
      }
    }
  };

  const unlocked = finished && (score >= 6);

  return (
    <main className="container mx-auto min-h-screen px-6 py-10">
      <Helmet>
        <title>Quiz – {SITE_TITLE}</title>
        <meta name="description" content="Answer 10 heartfelt questions. Score 6+ to unlock the memories gallery." />
        <link rel="canonical" href="/quiz" />
      </Helmet>

      <section className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-center">Unlock the Gate</h1>
        <p className="mt-2 text-center text-muted-foreground">Answer 10 questions about us. Score at least 6 to unlock the memories.</p>

        <div className="mt-6">
          <Progress value={finished ? 100 : progress} />
        </div>

        <div className="mt-8 rounded-xl border bg-card/60 p-6 shadow-elegant">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={index}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className={selected !== null && selected !== QUIZ_QUESTIONS[index].correctIndex ? "animate-[shake_0.35s_ease-in-out]" : ""}
              >
                <p className="text-lg font-medium">Q{index + 1}. {QUIZ_QUESTIONS[index].question}</p>
                <div className="mt-4 grid gap-3">
                  {QUIZ_QUESTIONS[index].options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === QUIZ_QUESTIONS[index].correctIndex;
                    return (
                      <Button
                        key={i}
                        variant={isSelected ? (isCorrect ? "gold" : "secondary") : "outline"}
                        className="justify-start"
                        onClick={() => handleAnswer(i)}
                      >
                        {opt}
                      </Button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Score: {score}</p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                {unlocked ? (
                  <>
                    <h2 className="font-display text-2xl sm:text-3xl">Unlocked! ✨</h2>
                    <p className="mt-2 text-muted-foreground">You scored {score}/{total}. Enjoy the memories, champ!</p>
                    <Button asChild variant="hero" size="lg" className="mt-6 hover-scale">
                      <a href="/memories">Go to Memories</a>
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl sm:text-3xl">Almost there 💙</h2>
                    <p className="mt-2 text-muted-foreground">You scored {score}/{total}. Try again to unlock the memories.</p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <Button variant="outline" onClick={() => { setIndex(0); setScore(0); setSelected(null); setFinished(false); }}>Retry</Button>
                      <Button asChild variant="secondary">
                        <a href="/">Back Home</a>
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @keyframes shake { 0%,100%{ transform: translateX(0)} 25%{ transform: translateX(-4px)} 75%{ transform: translateX(4px)} }
      `}</style>
    </main>
  );
};

export default Quiz;
