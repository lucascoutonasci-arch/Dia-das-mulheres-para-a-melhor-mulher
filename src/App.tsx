/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Image as ImageIcon, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { intervalToDuration } from 'date-fns';

const START_DATE = new Date(2025, 7, 28, 19, 28); // 28/08/2025 19:28 (Month is 0-indexed, 7 = August)

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    
    // Celebration confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  const duration = useMemo(() => {
    return intervalToDuration({
      start: START_DATE,
      end: now
    });
  }, [now]);

  const timeUnits = [
    { label: 'Anos', value: duration.years || 0 },
    { label: 'Meses', value: duration.months || 0 },
    { label: 'Dias', value: duration.days || 0 },
    { label: 'Horas', value: duration.hours || 0 },
    { label: 'Minutos', value: duration.minutes || 0 },
    { label: 'Segundos', value: duration.seconds || 0 },
  ];

  const photos = [
    { url: 'https://i.postimg.cc/Hn3vQzBx/IMG_20250608_WA0030.jpg', caption: 'O começo de tudo com flores e amor' },
    { url: 'https://i.postimg.cc/Xqx1wLQp/IMG_20250829_WA0061.jpg', caption: 'Nós dois, sempre juntos' },
    { url: 'https://i.postimg.cc/C5Jrj7m5/IMG_20260130_WA0020.jpg', caption: 'Sua beleza me encanta todos os dias' },
    { url: 'https://i.postimg.cc/Y08D1Rbj/IMG_20260201_WA0000.jpg', caption: 'Para sempre nós' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-romantic-rose/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-[url('https://i.postimg.cc/Hn3vQzBx/IMG_20250608_WA0030.jpg')] bg-cover bg-center"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <Heart className="text-romantic-rose fill-romantic-rose w-12 h-12 animate-pulse" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-display text-5xl md:text-8xl mb-6 text-romantic-deep leading-tight"
          >
            Feliz Dia das Mulheres, <br />
            <span className="italic font-serif">Meu Amor</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-serif italic"
          >
            "Hoje celebramos a força, a beleza e a luz que você traz para o mundo. 
            Você não é apenas a mulher da minha vida, mas a minha maior inspiração."
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-romantic-deep/60 font-semibold">Role para baixo</span>
          <div className="w-px h-12 bg-gradient-to-b from-romantic-rose to-transparent" />
        </motion.div>
      </section>

      {/* Counter Section */}
      <section className="py-24 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-romantic-rose/10 text-romantic-deep text-sm font-semibold mb-4"
            >
              <Clock size={16} />
              <span>Nossa Jornada Juntos</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-6xl text-romantic-deep mb-4">Contando cada segundo...</h2>
            <p className="text-gray-600 font-serif italic">Desde aquele 28 de agosto de 2025, às 19:28</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow border-romantic-rose/20"
              >
                <div className="text-4xl md:text-5xl font-display text-romantic-deep mb-2">
                  {unit.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-romantic-rose font-bold">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 px-4 bg-romantic-pink/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10"><Heart size={100} /></div>
          <div className="absolute bottom-10 right-10"><Heart size={150} /></div>
        </div>

        <div className="max-w-3xl mx-auto glass-card p-8 md:p-16 rounded-[3rem] relative z-10 shadow-xl border-white">
          <Quote className="text-romantic-rose/20 w-16 h-16 absolute top-8 left-8" />
          <div className="relative">
            <h3 className="font-display text-3xl md:text-4xl text-romantic-deep mb-8 text-center">Para a Mulher da Minha Vida</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed font-serif text-lg md:text-xl italic">
              <p>
                Neste Dia Internacional da Mulher, eu queria parar um momento para te dizer o quanto você é especial. 
                Sua força me admira, sua doçura me acalma e seu amor me transforma todos os dias.
              </p>
              <p>
                Desde que começamos nossa história, cada dia tem sido uma nova descoberta. 
                Você é o meu porto seguro, minha melhor amiga e a pessoa com quem eu quero construir todos os meus sonhos.
              </p>
              <p>
                Obrigado por ser essa mulher incrível, batalhadora e cheia de luz. 
                Eu te amo mais do que as palavras podem expressar.
              </p>
            </div>
            <div className="mt-12 text-center">
              <p className="font-display text-2xl text-romantic-deep">Com todo o meu amor,</p>
              <p className="text-romantic-rose font-bold tracking-widest uppercase text-sm mt-2">Seu Namorado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Poetry Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-4 md:-left-12 top-0 text-romantic-rose/10 font-display text-[12rem] leading-none select-none">
              Arte
            </div>
            <div className="relative z-10 pl-8 md:pl-0">
              <h2 className="font-display text-5xl md:text-7xl text-romantic-deep mb-12 leading-tight">
                Ela era <span className="italic font-serif">arte</span>.
              </h2>
              <div className="space-y-8 font-serif text-xl md:text-3xl text-gray-800 leading-relaxed italic border-l-2 border-romantic-rose/30 pl-8">
                <p>Mais bonita que as pinturas de Van Gogh, que os olhos de Capitu e as músicas de Chico Buarque.</p>
                <p>Nenhuma arte de Pablo Picasso chegava aos pés dos seus traços.</p>
                <p>Ela era aquelas metáforas com significado profundo.</p>
                <p>Era aqueles livros que quanto mais você lia mais você queria ir mais fundo.</p>
                <p>Podiam se passar dias, ela sempre me surpreendia.</p>
                <p>Não importava onde estava e nem com quem estaria.</p>
                <p className="text-romantic-deep font-bold not-italic">Todos podiam estar olhando para mim, mas era nela que eu me via.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-romantic-rose/10 text-romantic-deep text-sm font-semibold mb-4">
                <ImageIcon size={16} />
                <span>Nossas Memórias</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl text-romantic-deep">Sua Beleza em Fotos</h2>
            </div>
            <p className="text-gray-500 font-serif italic max-w-sm text-right">
              Alguns dos momentos que guardo com carinho no meu coração.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-romantic-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-serif italic text-lg">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-romantic-pink/20 border-t border-romantic-rose/10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-4"
        >
          <Heart className="text-romantic-rose fill-romantic-rose w-6 h-6" />
        </motion.div>
        <p className="text-romantic-deep font-display text-xl">Para sempre com você.</p>
        <p className="text-gray-400 text-xs mt-4 uppercase tracking-widest">Feito com amor • 2026</p>
      </footer>

      {/* Floating Hearts Decoration */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110vh',
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: '-10vh',
              opacity: [0, 1, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-romantic-rose/20"
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
