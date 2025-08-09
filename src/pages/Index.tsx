import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SparkleBackground from "@/components/SparkleBackground";
import { SISTER_NAME, SITE_TITLE } from "@/data/config";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>{SITE_TITLE} – Rakshabandhan Gift</title>
        <meta name="description" content="A heartfelt, animated Rakshabandhan gift with a quiz-unlocked gallery of memories." />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-30" aria-hidden="true" />
      <SparkleBackground />

      <section className="relative container mx-auto flex min-h-screen flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Happy Rakshabandhan, {SISTER_NAME} 💙✨
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          A journey of our memories — playful, heartfelt, and golden.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <Button asChild variant="hero" size="lg" className="hover-scale">
            <Link to="/quiz" aria-label="Start the Journey">
              Start the Journey
            </Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default Index;
