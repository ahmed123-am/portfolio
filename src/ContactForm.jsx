import { useState } from "react";
import { socialLinks } from "./data.js";

export default function ContactForm({ lang }) {
  const [status, setStatus] = useState("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const ar = lang === "ar";
  const isSending = status === "sending";

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
    setStatus("whatsapp");
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || isSending) return;

    const values = new FormData(form);
    const message = {
      name: values.get("name"),
      email: values.get("email"),
      message: values.get("message"),
      website: values.get("website"),
    };

    setStatus("sending");
    setFallbackUrl("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.error || "SEND_FAILED");

      form.reset();
      setStatus("success");
    } catch {
      const emailBody = [
        ar ? `الاسم: ${message.name}` : `Name: ${message.name}`,
        ar ? `البريد: ${message.email}` : `Email: ${message.email}`,
        ar ? "الرسالة:" : "Message:",
        message.message,
      ].join("\n");
      setFallbackUrl(
        `mailto:${socialLinks.email}?subject=${encodeURIComponent(ar ? "رسالة من الموقع" : "Message from the portfolio")}&body=${encodeURIComponent(emailBody)}`,
      );
      setStatus("error");
    }
  }

  let statusMessage = "";
  if (status === "sending") statusMessage = ar ? "جاري إرسال الرسالة…" : "Sending your message…";
  if (status === "success") statusMessage = ar ? "وصلت رسالتك بنجاح، شكرًا لتواصلك!" : "Your message was delivered. Thanks for reaching out!";
  if (status === "error") statusMessage = ar ? "تعذر إرسال الرسالة. جرّب فتحها في برنامج البريد من الرابط التالي." : "The message could not be sent. Open it in your email app using this link.";
  if (status === "whatsapp") statusMessage = ar ? "واتساب اتفتح برسالتك؛ دوس إرسال جوّه التطبيق عشان توصل." : "WhatsApp opened with your message. Press Send in WhatsApp to deliver it.";

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

          <form className="contact-form" onSubmit={handleEmailSubmit} aria-busy={isSending}>
            <div className="form-heading"><span className="form-signal">⌁</span><span>{ar ? "اكتبلي رسالة" : "Send a message"}</span></div>
            <label><span>{ar ? "اسمك" : "Your name"}</span><input type="text" name="name" autoComplete="name" maxLength="120" placeholder={ar ? "الاسم بالكامل" : "Your name"} required /></label>
            <label><span>{ar ? "بريدك الإلكتروني" : "Your email"}</span><input type="email" name="email" autoComplete="email" maxLength="254" placeholder="name@example.com" dir="ltr" required /></label>
            <label><span>{ar ? "رسالتك" : "Your message"}</span><textarea name="message" rows="4" maxLength="5000" placeholder={ar ? "اكتب رسالتك هنا..." : "Write your message here..."} required /></label>
            <label className="honeypot" aria-hidden="true">Leave this field empty<input type="text" name="website" tabIndex="-1" autoComplete="off" /></label>
            <button className="button button-primary submit-button" type="submit" disabled={isSending}><span>{isSending ? (ar ? "جاري الإرسال…" : "Sending…") : (ar ? "إرسال على البريد" : "Send by email")}</span><span className="button-arrow" aria-hidden="true">↗</span></button>
            <button className="button button-whatsapp" type="button" onClick={openWhatsApp} disabled={isSending}><span>{ar ? "إرسال عبر واتساب" : "Continue with WhatsApp"}</span><span className="button-arrow" aria-hidden="true">↗</span></button>
            <p className={`form-status ${status === "error" ? "is-error" : ""}`} role="status" aria-live="polite">
              {statusMessage}{status === "error" && fallbackUrl && <> <a href={fallbackUrl}>{ar ? "افتح الرسالة في بريدك" : "Open email draft"}</a></>}
            </p>
            <small className="form-note">{ar ? "إرسال البريد يتم عبر Vercel وResend بعد إعداد مفاتيح الخدمة. واتساب يفتح رسالة جاهزة؛ لازم تضغط إرسال من التطبيق." : "Email uses Vercel and Resend after the service is configured. WhatsApp opens a prepared draft; press Send in the app."}</small>
          </form>
        </div>
      </div>
    </section>
  );
}
