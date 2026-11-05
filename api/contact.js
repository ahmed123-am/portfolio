const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export async function POST(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host")?.toLowerCase();

  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host) {
        return json({ error: "ORIGIN_NOT_ALLOWED" }, 403);
      }
    } catch {
      return json({ error: "ORIGIN_NOT_ALLOWED" }, 403);
    }
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "INVALID_REQUEST" }, 400);
  }

  // Silently discard bots that fill in the visually hidden field.
  if (typeof data.website === "string" && data.website.trim()) {
    return json({ success: true });
  }

  const name = typeof data.name === "string" ? data.name.replace(/[\r\n\t]+/g, " ").trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || name.length > 120 || !validEmail || email.length > 254 || !message || message.length > 5000) {
    return json({ error: "INVALID_FIELDS" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "galilicon18@gmail.com";
  if (!apiKey || !from) {
    return json({ error: "EMAIL_NOT_CONFIGURED" }, 503);
  }

  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!providerResponse.ok) {
      const providerError = await providerResponse.json().catch(() => ({}));
      console.error("Resend rejected a portfolio message:", providerResponse.status, providerError.name || "provider error");
      return json({ error: "EMAIL_PROVIDER_ERROR" }, 502);
    }

    return json({ success: true });
  } catch (error) {
    console.error("Portfolio email request failed:", error.name || "network error");
    return json({ error: "EMAIL_PROVIDER_UNAVAILABLE" }, 502);
  }
}
