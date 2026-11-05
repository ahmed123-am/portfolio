import { projects } from "./data.js";

function DemoPreview({ kind, lang, index }) {
  if (kind === "terra") {
    return (
      <div className="project-visual visual-terra" aria-label={lang === "ar" ? "معاينة تصميمية لمشروع TerraShift" : "Illustrative preview of TerraShift"}>
        <div className="visual-topline"><span>TERRASHIFT / FIELD 01</span><span className="visual-live"><i /> DATA STREAM</span></div>
        <div className="terra-ui">
          <div className="terra-map"><div className="field field-a" /><div className="field field-b" /><div className="field field-c" /><span className="map-pin pin-a">✦</span><span className="map-pin pin-b">+</span><div className="map-legend"><i /><i /><i /><small>SOIL / WATER / CROP</small></div></div>
          <div className="terra-side"><small>CLIMATE INTELLIGENCE</small><strong>28.4°<sup>C</sup></strong><span className="terra-chart">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span><div className="terra-side-foot"><span>SOIL HEALTH</span><b>82%</b></div></div>
        </div>
        <span className="visual-corner">{index} / 07</span>
      </div>
    );
  }

  if (kind === "wazen") {
    return (
      <div className="project-visual visual-wazen" aria-label={lang === "ar" ? "معاينة تصميمية لمشروع WAZEN" : "Illustrative preview of WAZEN"}>
        <div className="visual-topline"><span>WAZEN / OVERVIEW</span><span className="visual-live"><i /> FINANCE</span></div>
        <div className="wazen-ui">
          <div className="wazen-header"><span className="wazen-logo">WAZEN<span>.</span></span><span className="wazen-avatar">AG</span></div>
          <div className="wazen-welcome"><small>{lang === "ar" ? "مساء الخير، أحمد" : "Good evening, Ahmed"}</small><b>{lang === "ar" ? "ملخص ميزانيتك" : "Your budget overview"}</b></div>
          <div className="wazen-stats"><div><small>MONTHLY BALANCE</small><b>12,480 <i>EGP</i></b><em>↗ 8.2%</em></div><div><small>MONTHLY SPEND</small><b>4,320 <i>EGP</i></b><em className="spend-mark">↘ 3.1%</em></div></div>
          <div className="wazen-chart-wrap"><div className="chart-label"><b>{lang === "ar" ? "نظرة عامة" : "Overview"}</b><small>JAN — JUN</small></div><div className="wazen-bars">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="wazen-months"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div></div>
        </div>
        <span className="visual-corner">{index} / 07</span>
      </div>
    );
  }

  if (kind === "ieee") {
    return (
      <div className="project-visual visual-ieee" aria-label={lang === "ar" ? "معاينة تصميمية للوحة تسجيل IEEE" : "Illustrative preview of the IEEE registration page"}>
        <div className="ieee-card">
          <span className="ieee-icon">✳</span><small>IEEE NDETI</small>
          <strong>{lang === "ar" ? "إنشاء حساب جديد" : "Create your account"}</strong>
          <span className="ieee-input" /><span className="ieee-input short" /><span className="ieee-input" />
          <span className="ieee-submit">{lang === "ar" ? "إنشاء حساب" : "Create account"}</span>
        </div>
        <span className="visual-corner">{index} / 07</span>
      </div>
    );
  }

  const cards = {
    freestyle: { badge: "FREESTYLE", title: "MOVE YOUR WAY", subtitle: "NEW SEASON / 2026", visual: "shoe" },
    perfume: { badge: "PERFUME BAR", title: "SCENT, IN FORM", subtitle: "DISCOVER YOUR NOTES", visual: "bottle" },
    sports: { badge: "SPORTS EDUCATION", title: lang === "ar" ? "تعلم السباحة" : "SWIM SMARTER", subtitle: "LESSON 01 / WATER BASICS", visual: "wave" },
    code: { badge: "CODE MASTERY", title: lang === "ar" ? "ابدأ رحلتك" : "BUILD YOUR FUTURE", subtitle: "LEARN · PRACTICE · CREATE", visual: "code" },
  };
  const content = cards[kind];
  return (
    <div className={`project-visual visual-art visual-${kind}`} aria-label={`${content.badge} ${lang === "ar" ? "معاينة تصميمية" : "illustrative preview"}`}>
      <div className="visual-topline"><span>{content.badge}</span><span className="visual-live"><i /> ONLINE</span></div>
      <div className="art-content">
        <small>{content.subtitle}</small>
        <strong>{content.title}</strong>
        <div className={`art-object ${content.visual}`} aria-hidden="true">
          {kind === "freestyle" && <><span /><i /><b>01</b></>}
          {kind === "perfume" && <><span /><i /><b /></>}
          {kind === "sports" && <><span /><i /><b /></>}
          {kind === "code" && <><span>&lt;/&gt;</span><i /><b /></>}
        </div>
      </div>
      <span className="visual-corner">{index} / 07</span>
    </div>
  );
}

function ProjectCard({ project, lang }) {
  const copy = (ar, en) => (lang === "ar" ? ar : en);
  const links = [
    project.live && { href: project.live, label: copy(project.id === "ieee" ? "فتح صفحة التسجيل" : "معاينة المشروع", project.id === "ieee" ? "Open registration" : "Live preview"), primary: true },
    { href: project.repo, label: copy("الكود على GitHub", "View source"), primary: !project.live },
  ].filter(Boolean);

  return (
    <article className={`project-card ${project.number < "03" ? "project-card-featured" : ""} reveal`}>
      <DemoPreview kind={project.preview} lang={lang} index={project.number} />
      <div className="project-body">
        <div className="project-eyebrow"><span>{project.category}</span><span>{project.number}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description[lang]}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {links.map((link) => (
            <a className={`text-link ${link.primary ? "" : "text-link-secondary"}`} href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              <span>{link.label}</span><span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ lang }) {
  const ar = lang === "ar";
  return (
    <section className="work-section section-wrap" id="work">
      <div className="container">
        <div className="section-heading section-heading-row reveal">
          <div><p className="section-index">03 <span>/</span> SELECTED WORK</p><h2>{ar ? "مشاريع بتتكلم عنّي." : "A few things I've built."}</h2></div>
          <p className="section-note">{ar ? "سبع تجارب متنوعة بين لوحات البيانات، المتاجر، والتعليم التفاعلي." : "Seven different experiences spanning dashboards, storefronts, and interactive learning."}</p>
        </div>
        <div className="projects-grid">{projects.map((project) => <ProjectCard project={project} lang={lang} key={project.id} />)}</div>
      </div>
    </section>
  );
}
