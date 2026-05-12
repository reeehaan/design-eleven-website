"use client";

import { useReducer, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StepIndicator } from "./step-indicator";
import {
  Step1ProjectType,
  Step2Details,
  Step3BudgetTimeline,
  Step4Contact,
} from "./form-steps";
import {
  formReducer,
  initialFormState,
  type ContactFormData,
  type FormStep,
} from "@/lib/contact-form";
import { submitContactForm } from "@/app/contact/actions";

export function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const searchParams = useSearchParams();

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) dispatch({ type: "update", patch: { projectType: service } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFinalStep = state.step === 4;

  const handleStepComplete = (patch: Partial<ContactFormData>) => {
    const merged = { ...state.data, ...patch };
    dispatch({ type: "update", patch });
    if (isFinalStep) {
      void handleSubmit(merged);
    } else {
      dispatch({ type: "next" });
    }
  };

  const handleSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      dispatch({
        type: "submit-error",
        message: "Please complete the verification challenge before submitting.",
      });
      return;
    }

    dispatch({ type: "submit-start" });

    try {
      const result = await submitContactForm({ data, turnstileToken });

      if (result.ok) {
        dispatch({ type: "submit-success" });
      } else {
        dispatch({ type: "submit-error", message: result.message });
        turnstileRef.current?.reset();
        setTurnstileToken("");
      }
    } catch (err) {
      console.error("[contact] Submission threw:", err);
      dispatch({
        type: "submit-error",
        message: "Something went wrong on our end. Please try again in a moment.",
      });
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  if (state.submission.status === "success") {
    return <SuccessView onReset={() => dispatch({ type: "reset" })} />;
  }

  return (
    <div>
      <StepIndicator
        current={state.step}
        onJumpTo={(step) => dispatch({ type: "goto", step })}
      />

      <div className="py-10 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CurrentStep
              step={state.step}
              data={state.data}
              onComplete={handleStepComplete}
            />

            {isFinalStep && siteKey && (
              <div className="mt-10">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                  Verification
                </span>
                <div className="mt-3">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={siteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken("")}
                    onExpire={() => setTurnstileToken("")}
                    options={{ theme: "light" }}
                  />
                </div>
              </div>
            )}

            {isFinalStep && !siteKey && (
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.08em] text-accent">
                Verification not configured — set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-surface-line pt-6">
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          disabled={state.step === 1 || state.submission.status === "submitting"}
          className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-fg-muted"
        >
          ← Back
        </button>

        <button
          type="submit"
          form="contact-form"
          disabled={
            state.submission.status === "submitting" ||
            (isFinalStep && !turnstileToken)
          }
          className="inline-flex items-center gap-3 rounded-full bg-fg-primary px-6 py-3 text-sm font-medium text-bg-primary transition-colors hover:bg-accent disabled:opacity-60"
        >
          {state.submission.status === "submitting" ? (
            "Sending…"
          ) : isFinalStep ? (
            <>Send request <span aria-hidden="true">→</span></>
          ) : (
            <>Continue <span aria-hidden="true">→</span></>
          )}
        </button>
      </div>

      {state.submission.status === "error" && (
        <p role="alert" className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-accent">
          {state.submission.message}
        </p>
      )}
    </div>
  );
}

function CurrentStep({
  step,
  data,
  onComplete,
}: {
  step: FormStep;
  data: ContactFormData;
  onComplete: (patch: Partial<ContactFormData>) => void;
}) {
  switch (step) {
    case 1: return <Step1ProjectType data={data} onComplete={onComplete} />;
    case 2: return <Step2Details data={data} onComplete={onComplete} />;
    case 3: return <Step3BudgetTimeline data={data} onComplete={onComplete} />;
    case 4: return <Step4Contact data={data} onComplete={onComplete} />;
  }
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-surface-line py-section text-center md:py-section-lg"
    >
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
        Request received
      </span>
      <h2 className="mt-6 font-display text-display-lg text-fg-primary">
        Thanks &mdash;{" "}
        <span className="italic text-fg-muted">we&rsquo;ll be in touch.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-body-lg text-fg-muted">
        We&rsquo;ll personally review your request and respond within 1 business day.
        Check your inbox — we&rsquo;ve sent you a confirmation.
      </p>
      <div className="mt-10">
        <ArrowLink href="/" variant="subtle">Back to home</ArrowLink>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle transition-colors hover:text-accent"
      >
        Submit another request
      </button>
    </motion.div>
  );
}
