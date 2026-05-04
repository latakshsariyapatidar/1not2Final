import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { InfoBlock, Field, fieldClass } from "./helpers";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in name, email and message.");
      return;
    }

    const recipient = "1not2productionbusiness@gmail.com";
    const mailSubject = encodeURIComponent(`[${form.subject}] Contact from ${form.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    
    // Direct Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${mailSubject}&body=${mailBody}`;
    
    setBusy(true);
    try {
      // Save to Firestore as a backup record
      if (isFirebaseConfigured()) {
        const db = getDb();
        if (db) {
          await addDoc(collection(db, "contacts"), {
            ...form,
            read: false,
            createdAt: serverTimestamp(),
          });
        }
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32">
      <p className="label-mono text-gold">/ 05 — Get in touch</p>
      <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-tighter md:text-8xl">
        Contact.
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="border border-border p-6 md:p-10">
          {done ? (
            <div className="py-12 text-center">
              <p className="label-mono text-gold">Sent</p>
              <h3 className="font-display mt-4 text-5xl">Message received.</h3>
              <p className="mt-6 text-muted-foreground">
                We read everything. We reply to most.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className={fieldClass}
                >
                  {[
                    "General",
                    "Collaboration",
                    "Press",
                    "Private Screening",
                    "Other",
                  ].map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                      className="bg-background"
                    >
                      {subject}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={fieldClass + " resize-none"}
                  placeholder="Write your message here…"
                />
              </Field>
              {error && <p className="label-mono text-crimson">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="ghost-btn ghost-btn-gold"
              >
                {busy ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-10">
          <InfoBlock label="Studio">
            <p>OneNotTwo Productions.</p>
            <p>Indian Institute of Technology Dharwad</p>
            <p>Chikkamalligawad, Dharwad - 580007, Karnataka, India</p>
          </InfoBlock>
          <InfoBlock label="Email">
            <a
              href="mailto:1not2productionbusiness@gmail.com"
              className="block transition-colors hover:text-gold"
            >
              1not2productionbusiness@gmail.com
            </a>
          </InfoBlock>
          <InfoBlock label="Phone">
            <p>+91 9716224033</p>
            <p>Krishna Mishra</p>
          </InfoBlock>
          <InfoBlock label="Social">
            <p>Instagram: @1not2production</p>
            <p>YouTube: @1Not2Production</p>
          </InfoBlock>
        </aside>
      </div>
    </section>
  );
}

