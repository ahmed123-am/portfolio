import { useEffect, useState } from "react";
import ContactForm from "./ContactForm.jsx";
import Projects from "./Projects.jsx";
import Robot from "./Robot.jsx";

function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ar = lang === "ar";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#home" aria-label="Ahmed Galal portfolio" onClick={closeMenu}>
          <span className="brand-mark">AG<span>.</span></span>
          <span className="brand-copy">AHMED GALAL<small>PORTFOLIO / 2026</small></span>
        </a>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" aria-label={ar ? "فتح القائمة" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}>
          <a href="#about" onClick={closeMenu}>{ar ? "عنّي" : "About"}</a>
          <a href="#work" onClick={closeMenu}>{ar ? "المشاريع" : "Projects"}</a>
          <a href="#skills" onClick={closeMenu}>{ar ? "المهارات" : "Skills"}</a>
          <a href="#contact" onClick={closeMenu}>{ar ? "تواصل" : "Contact"}</a>
        </nav>
        <div className="nav-actions">
          <button className="language-toggle" type="button" onClick={() => setLang(ar ? "en" : "ar")} aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}>{ar ? "EN" : "عربي"}</button>
          <a className="nav-cta" href="#contact"><span>{ar ? "خلّينا نتكلم" : "Let's talk"}</span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}

function Hero({ lang }) {
  const ar = lang === "ar";
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-grid container">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="status-dot" /><span>{ar ? "مهندس اتصالات & مطوّر واجهات" : "Communications Engineer & Front-End Developer"}</span></div>
          <h1><span>{ar ? "من الإشارة" : "From signals"}</span><span className="hero-title-accent">{ar ? "إلى الواجهة." : "to interface."}</span></h1>
          <p className="hero-lede">{ar ? "أجمع بين التفكير الهندسي وحبّ بناء واجهات ويب واضحة، سريعة، وممتعة في الاستخدام." : "I bring engineering thinking and a love of building clear, fast, and enjoyable web interfaces together."}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work"><span>{ar ? "شوف مشاريعي" : "Explore my work"}</span><span className="button-arrow" aria-hidden="true">↙</span></a>
            <a className="button button-quiet" href="#contact"><span>{ar ? "تواصل معايا" : "Get in touch"}</span><span className="button-arrow" aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-note"><span className="note-line" /><span>{ar ? "أفكار تقنية، بتجارب إنسانية." : "Technical ideas, human experiences."}</span></div>
        </div>
        <Robot lang={lang} />
      </div>

    </section>
  );
}

function About({ lang }) {
  const ar = lang === "ar";
  return (
    <section className="about-section section-wrap" id="about">
      <div className="container">
        <div className="section-heading reveal"><p className="section-index">01 <span>/</span> ABOUT</p><h2>{ar ? "فضول هندسي، وشغف بالواجهات." : "Engineering curiosity. Interface craft."}</h2></div>
        <div className="about-grid">
          <div className="about-copy reveal">
            <p className="about-lead">{ar ? "أنا أحمد جلال، طالب هندسة اتصالات وإلكترونيات ومطوّر واجهات أمامية. بحب أجمع بين التفكير الهندسي وشغفي بالتقنية عشان أحوّل الأفكار لتجارب رقمية واضحة وسهلة الاستخدام." : "I'm Ahmed Galal, a Communications and Electronics Engineering student and front-end developer. I enjoy combining engineering thinking with my passion for technology to turn ideas into clear, easy-to-use digital experiences."}</p>
            <p className="about-secondary">{ar ? "دراستي بتعرّفني على عالم الإشارات والشبكات والأنظمة، وتطوير الواجهات بيدّيني مساحة أطبّق التفكير ده في مواقع متجاوبة وممتعة. وبطوّر نفسي باستمرار في مجالات الشبكات والأنظمة والأمن السيبراني." : "My studies introduce me to signals, networks, and connected systems, while front-end development lets me apply that thinking to responsive, enjoyable websites. I'm also growing my knowledge of networking, operating systems, and cybersecurity."}</p>
            <div className="about-points">
              <div className="about-point"><span className="point-icon">01</span><div><strong>{ar ? "هندسة الاتصالات والإلكترونيات" : "Communications & Electronics"}</strong><span>{ar ? "مهتم بالإشارات والشبكات وطريقة عمل الأنظمة معًا." : "Interested in signals, networks, and how systems work together."}</span></div></div>
              <div className="about-point"><span className="point-icon">02</span><div><strong>{ar ? "تطوير واجهات أمامية" : "Front-end development"}</strong><span>{ar ? "أبني واجهات متجاوبة باستخدام HTML وCSS وJavaScript وReact." : "I build responsive interfaces with HTML, CSS, JavaScript, and React."}</span></div></div>
              <div className="about-point"><span className="point-icon">03</span><div><strong>{ar ? "Linux وشبكات CCNA" : "Linux & CCNA networking"}</strong><span>{ar ? "أطوّر معرفتي بأنظمة Linux ومبادئ الشبكات والاتصالات." : "Building my knowledge of Linux systems and CCNA networking fundamentals."}</span></div></div>
              <div className="about-point"><span className="point-icon">04</span><div><strong>{ar ? "Mobile Backhaul والأمن السيبراني" : "Mobile Backhaul & Cybersecurity"}</strong><span>{ar ? "اهتمام ببنية شبكات المحمول وأساسيات حماية الأنظمة والبيانات." : "Interested in mobile network infrastructure and the fundamentals of protecting systems and data."}</span></div></div>
            </div>
          </div>
          <div className="portrait-wrap reveal">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}assets/ahmed-profile.jpg`} alt={ar ? "أحمد جلال في فعالية تقنية" : "Ahmed Galal at a technology event"} loading="lazy" /></div>
            <div className="portrait-caption"><span className="status-dot" /><span>{ar ? "مهندس اتصالات / مطوّر واجهات" : "Communications engineer / front-end developer"}</span></div>
            <span className="portrait-code">AG — 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ lang }) {
  const ar = lang === "ar";
  const skillCards = [
    { number: "01", icon: "</>", style: "icon-code", title: ar ? "تطوير الواجهات" : "Front-end", body: ar ? "واجهات متجاوبة، مكوّنات واضحة، وتفاصيل تفاعل محسوبة." : "Responsive layouts, clear components, and thoughtful interactions.", tags: ["HTML", "CSS", "JavaScript", "React", "TypeScript"] },
    { number: "02", icon: "⌁", style: "icon-system", title: ar ? "العقلية الهندسية" : "Engineering mindset", body: ar ? "أفكر في تدفّق المعلومات، العلاقات بين العناصر، وسلوك النظام." : "I think about information flow, connected parts, and system behavior.", tags: [ar ? "اتصالات" : "Communications", "RF", "Signals", "Systems"] },
    { number: "03", icon: "✳", style: "icon-motion", title: ar ? "التجربة والحركة" : "Experience & motion", body: ar ? "حركة خفيفة توضّح التفاعل، وتفاصيل تحافظ على سهولة الاستخدام." : "Motion that clarifies interaction, with details that keep the experience easy to use.", tags: ["Responsive", "UI Motion", "Accessibility"] },
  ];
  return (
    <section className="skills-section section-wrap" id="skills">
      <div className="container">
        <div className="section-heading section-heading-row reveal"><div><p className="section-index">02 <span>/</span> TOOLKIT</p><h2>{ar ? "الأدوات اللي ببني بيها." : "The tools I build with."}</h2></div><p className="section-note">{ar ? "اختيارات عملية تساعدني أوصل من الفكرة لتجربة جاهزة." : "Practical tools that help me move from an idea to a finished experience."}</p></div>
        <div className="skill-grid">
          {skillCards.map((card) => <article className="skill-card reveal" key={card.number}><span className="skill-number">{card.number}</span><div className={`skill-icon ${card.style}`}>{card.icon}</div><h3>{card.title}</h3><p>{card.body}</p><div className="tag-list">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const ar = lang === "ar";
  return <footer className="site-footer"><div className="container footer-inner"><a className="footer-brand" href="#home">AG<span>.</span></a><p>© {new Date().getFullYear()} AHMED GALAL <span>{ar ? "— من الإشارة إلى الواجهة." : "— From signals to interface."}</span></p><a className="back-top" href="#home"><span>{ar ? "فوق" : "Top"}</span> ↑</a></div></footer>;
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ahmed-portfolio-language") === "en" ? "en" : "ar"; }
    catch { return "ar"; }
  });

  useEffect(() => {
    const isArabic = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "أحمد جلال | من الإشارة إلى الواجهة" : "Ahmed Galal | From signals to interface";
    try { localStorage.setItem("ahmed-portfolio-language", lang); } catch { /* private browsing can disable storage */ }
  }, [lang]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollUI = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
      document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    window.addEventListener("resize", updateScrollUI);
    return () => {
      window.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header lang={lang} setLang={setLang} />
      <main><Hero lang={lang} /><About lang={lang} /><Skills lang={lang} /><Projects lang={lang} /><ContactForm lang={lang} /></main>
      <Footer lang={lang} />
    </>
  );
}
