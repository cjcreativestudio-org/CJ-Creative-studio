"use client";

import { useActionState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import AnimatedButton from "./animated-button";
import { CheckCircle, Warning } from "@phosphor-icons/react";

interface FormState {
  success?: boolean;
  serverError?: boolean;
  errors?: { name?: string; email?: string; message?: string };
}

const initialState: FormState = {};

export default function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendEnquiry, initialState);
  const reduce = useReducedMotion();

  if (state.success) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-3 py-8"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle size={24} weight="fill" className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="text-[15px] text-white/55">We&apos;ll be in touch within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Server error */}
      {state.serverError && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[14px]">
          <Warning size={18} weight="fill" className="shrink-0 mt-0.5" />
          Something went wrong — please email us directly at{" "}
          <a href="mailto:hello@cjcreativestudio.com" className="underline font-medium">
            hello@cjcreativestudio.com
          </a>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[13px] font-medium text-white/70">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={state.errors?.name ? "true" : undefined}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={`w-full rounded-xl border px-4 py-3 text-[15px] text-white placeholder-white/30 bg-white/[0.07] outline-none transition-all duration-200
            focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/70
            ${state.errors?.name ? "border-red-500/50 bg-red-500/[0.07]" : "border-white/[0.12] hover:border-white/[0.20]"}`}
        />
        {state.errors?.name && (
          <p id="name-error" role="alert" className="text-[13px] text-red-400">{state.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13px] font-medium text-white/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          aria-invalid={state.errors?.email ? "true" : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={`w-full rounded-xl border px-4 py-3 text-[15px] text-white placeholder-white/30 bg-white/[0.07] outline-none transition-all duration-200
            focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/70
            ${state.errors?.email ? "border-red-500/50 bg-red-500/[0.07]" : "border-white/[0.12] hover:border-white/[0.20]"}`}
        />
        {state.errors?.email && (
          <p id="email-error" role="alert" className="text-[13px] text-red-400">{state.errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[13px] font-medium text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project — what you need, rough timeline, any references you like"
          aria-invalid={state.errors?.message ? "true" : undefined}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`w-full rounded-xl border px-4 py-3 text-[15px] text-white placeholder-white/30 bg-white/[0.07] outline-none transition-all duration-200 resize-none
            focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/70
            ${state.errors?.message ? "border-red-500/50 bg-red-500/[0.07]" : "border-white/[0.12] hover:border-white/[0.20]"}`}
        />
        {state.errors?.message && (
          <p id="message-error" role="alert" className="text-[13px] text-red-400">{state.errors.message}</p>
        )}
      </div>

      <AnimatedButton variant="inverted" className="self-start mt-1">
        {pending ? "Sending..." : "Send message"}
      </AnimatedButton>
    </form>
  );
}
