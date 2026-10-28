"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowIcon } from "@/components/ui/Primitives";
import { formStrings } from "@/content/forms";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Variant = "contact" | "careers" | "diagnostic";
type Status = "idle" | "sending" | "sent" | "invalid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({
  locale,
  variant = "contact",
  meta,
  className,
}: {
  locale: Locale;
  variant?: Variant;
  /** Дополнительный контекст: например, результат диагностики. */
  meta?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      kind: variant,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      contact: String(data.get("contact") ?? ""),
      link: String(data.get("link") ?? ""),
      message: String(data.get("message") ?? ""),
      meta: meta ?? "",
    };

    // Отдельно от ошибки отправки: человек просто не заполнил поля
    const missing = [
      !payload.name.trim() && "name",
      !EMAIL_RE.test(payload.email.trim()) && "email",
      !payload.message.trim() && "message",
    ].filter(Boolean) as string[];

    if (missing.length > 0) {
      setInvalidFields(missing);
      setStatus("invalid");
      return;
    }
    setInvalidFields([]);

    setStatus("sending");

    // Демонстрация: ничего не уходит, показываем результат проверки.
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  }

  const hint =
    variant === "careers"
      ? formStrings.messageHintCareers
      : formStrings.messageHintContact;

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label={t(formStrings.name, locale)}
          required
          invalid={invalidFields.includes("name")}
        />
        <Field
          name="email"
          type="email"
          label={t(formStrings.email, locale)}
          required
          invalid={invalidFields.includes("email")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="contact"
          label={`${t(formStrings.contact, locale)} · ${t(formStrings.optional, locale)}`}
        />
        {variant === "careers" ? (
          <Field name="link" label={t(formStrings.link, locale)} />
        ) : (
          <Field
            name="link"
            label={`${t(formStrings.company, locale)} · ${t(formStrings.optional, locale)}`}
          />
        )}
      </div>

      <Field
        name="message"
        label={t(formStrings.message, locale)}
        hint={t(hint, locale)}
        textarea
        required
        invalid={invalidFields.includes("message")}
      />

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-950 uppercase transition-colors duration-500 hover:bg-gold-200 disabled:opacity-50"
        >
          {status === "sending"
            ? t(formStrings.sending, locale)
            : t(formStrings.submit, locale)}
          <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </button>

        {status !== "idle" && status !== "sending" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            role={status === "invalid" ? "alert" : undefined}
            className={cn(
              "max-w-sm text-[0.8125rem] leading-relaxed",
              status === "sent" && "text-gold-200",
              status === "invalid" && "text-alert-300",
            )}
          >
            {status === "sent" && t(formStrings.sent, locale)}
            {status === "invalid" && t(formStrings.errorValidation, locale)}
          </motion.p>
        )}
      </div>

      <p className="text-[0.6875rem] leading-relaxed text-fog-600">
        {t(formStrings.privacy, locale)}
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  hint,
  type = "text",
  textarea = false,
  required = false,
  invalid = false,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  invalid?: boolean;
}) {
  const base = cn(
    "w-full border-b bg-transparent py-3 text-[1.0625rem] text-fog-50 outline-none transition-colors duration-400 placeholder:text-fog-600 focus:border-gold-400",
    invalid ? "border-alert-400" : "border-line",
  );

  return (
    <label className="flex flex-col gap-2">
      <span className={cn("eyebrow", invalid && "text-alert-300")}>
        {label}
        {required && <span className="ml-1 text-gold-400">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          aria-invalid={invalid || undefined}
          className={cn(base, "resize-y")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          aria-invalid={invalid || undefined}
          className={base}
        />
      )}
      {hint && (
        <span className="text-[0.75rem] leading-relaxed text-fog-600">
          {hint}
        </span>
      )}
    </label>
  );
}
