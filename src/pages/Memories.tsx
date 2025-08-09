import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SITE_TITLE, UNLOCK_KEY } from "@/data/config";
import { PHOTOS, VIDEOS } from "@/data/media";

const Memories = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [timelineMode, setTimelineMode] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(UNLOCK_KEY) === "true");
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  const photosSorted = useMemo(() =>
    [...PHOTOS].sort((a, b) => (a.date || '').localeCompare(b.date || '')),
  []);

  if (!unlocked) {
    return (
      <main className="container mx-auto min-h-screen px-6 py-16 text-center">
        <Helmet>
          <title>Locked – {SITE_TITLE}</title>
          <meta name="description" content="Complete the quiz to unlock the memories gallery." />
          <link rel="canonical" href="/memories" />
        </Helmet>
        <h1 className="font-display text-3xl sm:text-4xl">Memories Locked 🔒</h1>
        <p className="mt-3 text-muted-foreground">Score 6+ in the quiz to open this treasure chest.</p>
        <Button asChild variant="hero" className="mt-6 hover-scale">
          <a href="/quiz">Take the Quiz</a>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Memories – {SITE_TITLE}</title>
        <meta name="description" content="A dynamic, cinematic gallery of photos and videos with a timeline mode." />
        <link rel="canonical" href="/memories" />
      </Helmet>

      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">Our Journey</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">A tapestry of moments — smiles, chaos, adventures, and all the love in between.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant={timelineMode ? 'outline' : 'gold'} onClick={() => setTimelineMode(false)}>Masonry</Button>
              <Button variant={timelineMode ? 'gold' : 'outline'} onClick={() => setTimelineMode(true)}>Timeline</Button>
            </div>
          </div>
        </div>
      </section>

      {!timelineMode ? (
        <section className="container mx-auto px-4 py-10">
          <h2 className="font-display text-2xl mb-4">Photos</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {PHOTOS.map((p) => (
              <figure key={p.id} className="mb-4 break-inside-avoid rounded-xl overflow-hidden border bg-card/60 shadow-elegant">
                <Dialog>
                  <DialogTrigger asChild>
                    <img src={p.src} alt={p.caption || 'Memory photo'} loading="lazy" className="w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl bg-background/90">
                    <img src={p.src} alt={p.caption || 'Memory photo'} className="w-full h-auto" />
                    {p.caption && <figcaption className="text-sm text-muted-foreground mt-2">{p.caption}</figcaption>}
                  </DialogContent>
                </Dialog>
                {p.note && <p className="px-4 py-3 text-sm text-muted-foreground">{p.note}</p>}
              </figure>
            ))}
          </div>

          <h2 className="font-display text-2xl mt-12 mb-4">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VIDEOS.map((v) => (
              <figure key={v.id} className="rounded-xl overflow-hidden border bg-card/60 shadow-elegant">
                <Dialog>
                  <DialogTrigger asChild>
                    <video src={v.src} muted playsInline autoPlay loop preload="metadata" className="w-full h-[260px] object-cover" />
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-background/90">
                    <video src={v.src} controls className="w-full h-auto" />
                  </DialogContent>
                </Dialog>
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-10">
          <h2 className="font-display text-2xl mb-6">Timeline</h2>
          <div className="relative border-l border-border pl-6">
            {photosSorted.map((p) => (
              <div key={p.id} className="relative mb-10">
                <span className="absolute -left-3 top-2 h-3 w-3 rounded-full bg-primary" />
                <p className="text-xs text-muted-foreground">{p.date}</p>
                <h3 className="mt-1 font-medium">{p.caption}</h3>
                <div className="mt-3 rounded-lg overflow-hidden border bg-card/60 shadow-elegant">
                  <img src={p.src} alt={p.caption || 'Memory photo'} loading="lazy" className="w-full object-cover" />
                </div>
                {p.note && <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Memories;