import { useState } from "react";
import { socialLinks } from "./data.js";

export default function ContactForm({ lang }) {
  const [status, setStatus] = useState("");
  const ar = lang === "ar";

  function openWhatsApp(event) {
    const form = event.currentTarget.form;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = [
      ar ? `الاسم: ${values.get("name")}` : `Name: ${values.get("name")}`,
      ar ? `البريد: ${values.get("email")}` : `Email: ${values.get("email")}`,
      ar ? "الرسالة:" : "Message:",
      values.get("message"),
    ].join("\n");
    const url = `https://wa.me/${socialLinks.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus(ar ? "واتساب اتفتح برسالتك؛ دوس إرسال جوّه التطبيق عشان توصل." : "WhatsApp opened with your message. Press Send in WhatsApp to deliver it.");
  }

  function handleEmailSubmit() {
    setStatus(ar ? "اتفتح نموذج الإرسال. أول مرة؟ فعّل الاستقبال من رسالة FormSubmit على بريدك." : "The delivery page opened. First time? Activate FormSubmit from the email it sends you.");
  }

  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="container">
        <div className="contact-panel reveal">
          <div className="contact-copy">
            <p className="section-index">04 <span>/</span> CONTACT</p>
            <h2>{ar ? <>عندك فكرة؟<br />خلّينا نوصلها.</> : <>Have an idea?<br />Let's connect.</>}</h2>
            <p>{ar ? "لو عندك مشروع أو فرصة تعاون، ابعتلي رسالة ونبدأ من أول إشارة." : "Have a project or a chance to collaborate? Send me a note and we can start with the first signal."}</p>
            <a className="email-link" href={`mailto:${socialLinks.email}`}>{socialLinks.email}<span aria-hidden="true">↗</span></a>
            <a className="whatsapp-direct" href={`https://wa.me/${socialLinks.whatsappNumber}`} target="_blank" rel="noreferrer">
              <span className="whatsapp-mark" aria-hidden="true">◉</span><span>{ar ? "راسلني على واتساب" : "Message me on WhatsApp"}</span><span aria-hidden="true">↗</span>
            </a>
            <div className="social-links">
              <a href={socialLinks.github} target="_blank" rel="noreferrer"><span>GitHub</span><span>↗</span></a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><span>↗</span></a>
            </div>
            <a className="phone-link" href="tel:+201095919325">+20 10 9591 9325</a>
          </div>

          <form className="contact-form" action={`https://formsubmit.co/${socialLinks.email}`} method="POST" target="_blank" onSubmit={handleEmailSubmit}>
            <div className="form-heading"><span className="form-signal">⌁</span><span>{ar ? "اكتبلي رسالة" : "Send a message"}</span></div>
            <input type="hidden" name="_subject" value="New message from Ahmed Galal's portfolio" />
            <input type="hidden" name="_template" value="table" />
            <label><span>{ar ? "اسمك" : "Your name"}</span><input type="text" name="name" autoComplete="name" placeholder={ar ? "الاسم بالكامل" : "Your name"} required /></label>
            <label><span>{ar ? "بريدك الإلكتروني" : "Your email"}</span><input type="email" name="email" autoComplete="email" placeholder="name@example.com" dir="ltr" required /></label>
            <label><span>{ar ? "رسالتك" : "Your message"}</span><textarea name="message" rows="4" placeholder={ar ? "اكتب رسالتك هنا..." : "Write your message here..."} required /></label>
            <input className="honeypot" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <button className="button button-primary submit-button" type="submit"><span>{ar ? "إرسال على البريد" : "Send by email"}</span><span className="button-arrow" aria-hidden="true">↗</span></button>
            <button className="button button-whatsapp" type="button" onClick={openWhatsApp}><span>{ar ? "إرسال عبر واتساب" : "Continue with WhatsApp"}</span><span className="button-arrow" aria-hidden="true">↗</span></button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
            <small className="form-note">{ar ? "البريد: FormSubmit — أول مرة، افتح رسالة التفعيل في صندوق الوارد أو Spam. واتساب يفتح الرسالة جاهزة؛ لازم تضغط إرسال من التطبيق." : "Email is delivered through FormSubmit; activate it from your inbox or Spam the first time. WhatsApp opens a prepared draft; press Send in the app."}</small>
          </form>
        </div>
      </div>
    </section>
  );
}
