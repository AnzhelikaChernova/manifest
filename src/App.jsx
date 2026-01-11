import React, { useState, useEffect, useRef } from 'react';

// Hook for fade-in animations on scroll
const useFadeIn = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Animated component wrapper
const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useFadeIn();
  
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s ease ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">КОМАНДА №1</div>
      <nav className="nav-links">
        <a href="#principles">Принципы</a>
        <a href="#rules">Правила</a>
        <a href="#redlines">Красные линии</a>
        <a href="#goal">Цель</a>
      </nav>
    </header>
  );
};

// Hero Component
const Hero = () => (
  <section className="hero">
    <div className="hero-glow" />
    <div className="hero-content">
      <div className="hero-label">КУЛЬТУРА КОМАНДЫ</div>
      <h1 className="hero-title">МАНИФЕСТ</h1>
      <p className="hero-subtitle">
        Как мы работаем вместе. Правила игры, которые мы установили на старте — 
        чтобы потом не было сюрпризов.
      </p>
    </div>
    <div className="scroll-indicator">
      <span>Листай вниз</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
      </svg>
    </div>
  </section>
);

// Intro Component
const Intro = () => (
  <section className="intro">
    <FadeIn>
      <div className="intro-text">
        <p>Этот документ — не формальность для галочки. Это договорённости, которые мы заключаем друг с другом на старте.</p>
        <p>Мы видели, как разваливаются команды. Обычно не из-за сложных задач, а из-за простых вещей: кто-то молчит о проблемах, кто-то тянет одеяло, кто-то делает вид, что работает.</p>
        <p>Мы решили сразу проговорить правила игры. Чтобы потом не было «я думал, ты сделаешь» и «а мне никто не говорил».</p>
      </div>
    </FadeIn>
    <FadeIn delay={0.2}>
      <blockquote className="quote-block">
        «Культура — это не то, что написано на стене. Это то, что происходит, когда никто не смотрит.»
      </blockquote>
    </FadeIn>
  </section>
);

// Principle Card Component
const PrincipleCard = ({ title, description, delay }) => (
  <FadeIn delay={delay}>
    <div className="principle-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </FadeIn>
);

// Principles Section
const Principles = () => {
  const principles = [
    {
      title: "МЫ — КОМАНДА, НЕ СЕМЬЯ",
      description: "Семья — это безусловная любовь. Ты не можешь уволить брата за то, что он не сдал отчёт. Мы — другое. Мы собрались работать вместе. И этот выбор работает в обе стороны."
    },
    {
      title: "ЛИДЕР — ЭТО НЕ ДОЛЖНОСТЬ",
      description: "У нас нет «главного». Лидер — тот, кто берёт ответственность, когда другие молчат, первым признаёт свои косяки и создаёт условия для работы команды."
    },
    {
      title: "СКАЗАЛ — СДЕЛАЛ",
      description: "Если ты взял задачу — она твоя. Не «попробую», не «постараюсь» — а «сделаю к сроку». Понял, что не успеваешь? Скажи сразу, а не за час до дедлайна."
    },
    {
      title: "ОШИБКИ — ЧАСТЬ ПРОЦЕССА",
      description: "Мы не штрафуем за ошибки. Но одна ошибка — урок, та же ошибка дважды — проблема. Мы открыто разбираем провалы, чтобы понять, как не повторить."
    }
  ];

  return (
    <section id="principles">
      <div className="section-header">
        <FadeIn>
          <div className="section-label">ОСНОВА</div>
          <h2 className="section-title">НАШИ ПРИНЦИПЫ</h2>
          <p className="section-desc">Четыре столпа, на которых строится наша работа вместе</p>
        </FadeIn>
      </div>
      <div className="principles-grid">
        {principles.map((p, i) => (
          <PrincipleCard key={i} {...p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
};

// Rules Section
const Rules = () => (
  <section className="content-section" id="rules">
    <FadeIn>
      <h2>РЕШЕНИЯ НА АРГУМЕНТАХ, НЕ НА ЭМОЦИЯХ</h2>
      <p>Мы спорим. Это нормально и даже полезно — в спорах рождаются хорошие решения.</p>
      <p>Но мы спорим <span className="highlight">аргументами, а не голосом</span>. Побеждает не тот, кто громче, а тот, у кого сильнее позиция.</p>
      <p>После решения — всё: даже если ты был против, ты его выполняешь. «Не согласен, но делаю» — это взрослая позиция.</p>
    </FadeIn>
  </section>
);

// Red Line Item Component
const RedLineItem = ({ title, description, delay }) => (
  <FadeIn delay={delay}>
    <div className="red-line-item">
      <div className="red-line-icon">✕</div>
      <div className="red-line-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </FadeIn>
);

// Red Lines Section
const RedLines = () => {
  const redLines = [
    {
      title: "ИМИТАЦИЯ РАБОТЫ",
      description: "Делать вид вместо дела. Красивые отчёты о том, чего не было. «Я работал» без результата."
    },
    {
      title: "МОЛЧАНИЕ О ПРОБЛЕМАХ",
      description: "Видеть, что что-то идёт не так, и не говорить. Надеяться, что «само рассосётся». Не рассосётся."
    },
    {
      title: "ПЕРЕКЛАДЫВАНИЕ ОТВЕТСТВЕННОСТИ",
      description: "«Это не моя задача», «мне не сказали», «я думал, что ты». Если ты в команде — ты отвечаешь за общий результат."
    },
    {
      title: "СИСТЕМАТИЧЕСКАЯ НЕЭФФЕКТИВНОСТЬ",
      description: "Один раз не вывез — бывает, поможем. Постоянно не вывозишь — разговор о том, нужно ли нам продолжать вместе."
    }
  ];

  return (
    <section className="red-lines" id="redlines">
      <div className="red-lines-container">
        <FadeIn>
          <div className="section-label">ГРАНИЦЫ</div>
          <h2 className="section-title">КРАСНЫЕ ЛИНИИ</h2>
          <p className="section-desc">Что для нас неприемлемо — без исключений</p>
        </FadeIn>
        <div className="red-lines-list">
          {redLines.map((item, i) => (
            <RedLineItem key={i} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Final Section
const FinalSection = () => (
  <section className="final-section" id="goal">
    <FadeIn>
      <div className="section-label">ВИДЕНИЕ</div>
      <h2 className="section-title">К ЧЕМУ МЫ ИДЁМ</h2>
      <p className="final-text">
        Мы хотим быть командой, которая делает проекты, за которые не стыдно. 
        Честно говорит друг другу о проблемах — и решает их. 
        Учится на каждом проекте и становится сильнее.
      </p>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div className="final-quote">
        <p>«Мы не идеальные. Мы точно будем косячить. Но мы договорились, как с этим справляться — и это уже больше, чем у большинства команд.»</p>
        <div className="signature">— Команда №1, 2025</div>
      </div>
    </FadeIn>
  </section>
);

// Footer
const Footer = () => (
  <footer className="footer">
    <p>Манифест команды • Лидерство и Инновации • 2025</p>
  </footer>
);

// Main App
export default function App() {
  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --netflix-red: #E50914;
          --black: #141414;
          --dark-gray: #1f1f1f;
          --medium-gray: #2f2f2f;
          --light-gray: #808080;
          --white: #ffffff;
        }

        html {
          scroll-behavior: smooth;
        }

        body, .app {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--black);
          color: var(--white);
          line-height: 1.6;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 4rem;
          background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s;
        }

        .header.scrolled {
          background: var(--black);
          box-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          color: var(--netflix-red);
          letter-spacing: 0.05em;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--white);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .nav-links a:hover {
          opacity: 1;
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(229, 9, 20, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(229, 9, 20, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
        }

        .hero-label {
          color: var(--netflix-red);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #ccc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          color: var(--light-gray);
          max-width: 600px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .hero-team {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .hero-team .dot {
          color: var(--netflix-red);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--light-gray);
          font-size: 0.8rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        /* Intro */
        .intro {
          padding: 8rem 4rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .intro-text {
          font-size: 1.35rem;
          line-height: 1.9;
        }

        .intro-text p {
          margin-bottom: 1.5rem;
          color: rgba(255,255,255,0.85);
        }

        .quote-block {
          border-left: 4px solid var(--netflix-red);
          padding: 2rem 2.5rem;
          margin: 3rem 0 0;
          font-size: 1.6rem;
          font-style: italic;
          color: var(--white);
          background: rgba(229, 9, 20, 0.05);
        }

        /* Section Headers */
        .section-header {
          padding: 6rem 4rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-label {
          color: var(--netflix-red);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .section-desc {
          font-size: 1.2rem;
          color: var(--light-gray);
          max-width: 600px;
        }

        /* Principles Grid */
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 0 4rem 6rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .principle-card {
          background: linear-gradient(160deg, var(--dark-gray) 0%, var(--medium-gray) 100%);
          border-radius: 12px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: default;
        }

        .principle-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--netflix-red) 0%, #ff6b6b 100%);
        }

        .principle-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(229, 9, 20, 0.1);
        }

        .principle-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }

        .principle-card p {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          line-height: 1.7;
        }

        /* Content Section */
        .content-section {
          padding: 6rem 4rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .content-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          margin-bottom: 2rem;
        }

        .content-section p {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.85);
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .highlight {
          color: var(--netflix-red);
          font-weight: 600;
        }

        /* Red Lines */
        .red-lines {
          background: linear-gradient(180deg, var(--black) 0%, #1a0505 50%, var(--black) 100%);
          padding: 6rem 4rem;
        }

        .red-lines-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .red-lines-list {
          margin-top: 3rem;
        }

        .red-line-item {
          display: flex;
          gap: 2rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(229, 9, 20, 0.2);
          align-items: flex-start;
        }

        .red-line-icon {
          width: 56px;
          height: 56px;
          min-width: 56px;
          background: var(--netflix-red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: bold;
          box-shadow: 0 0 30px rgba(229, 9, 20, 0.4);
        }

        .red-line-content h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }

        .red-line-content p {
          color: var(--light-gray);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* Final Section */
        .final-section {
          padding: 8rem 4rem;
          text-align: center;
          background: linear-gradient(180deg, var(--black) 0%, var(--dark-gray) 100%);
        }

        .final-text {
          font-size: 1.4rem;
          color: rgba(255,255,255,0.8);
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }

        .final-quote {
          padding: 3rem;
          background: var(--medium-gray);
          border-radius: 16px;
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .final-quote p {
          font-size: 1.3rem;
          font-style: italic;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .final-quote .signature {
          color: var(--netflix-red);
          font-size: 1rem;
          font-style: normal;
          font-weight: 500;
        }

        /* Footer */
        .footer {
          padding: 3rem 4rem;
          background: var(--black);
          border-top: 1px solid var(--medium-gray);
          text-align: center;
        }

        .footer p {
          color: var(--light-gray);
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 1rem 1.5rem;
          }

          .nav-links {
            display: none;
          }

          .hero,
          .intro,
          .section-header,
          .principles-grid,
          .content-section,
          .red-lines,
          .final-section {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .principles-grid {
            grid-template-columns: 1fr;
          }

          .red-line-item {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-title {
            font-size: 4rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-team {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <Header />
      <Hero />
      <Intro />
      <Principles />
      <Rules />
      <RedLines />
      <FinalSection />
      <Footer />
    </div>
  );
}