"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import {
  Label,
  TextField,
  TextArea,
  SelectField,
  FieldError,
  Checkbox,
} from "@/components/ui/form-field";
import {
  BUDGET_BANDS,
  PROJECT_TYPES,
  type ContactFormData,
} from "@/lib/contact-form";
import { submitContactForm } from "@/app/contact/actions";

const OWNER_BUILDER = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
] as const;

const HEARD_FROM = [
  { value: "Google", label: "Google" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "A friend or past client", label: "A friend or past client" },
  { value: "Other", label: "Other" },
] as const;

const EnquirySchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Numbers, spaces, and + - ( ) only"),
  email: z.string().email("Please enter a valid email address"),
  address: z
    .string()
    .min(2, "Please give us at least the city or town")
    .max(120),
  district: z.string().max(60).optional(),
  postcode: z.string().max(12).optional(),
  projectType: z.enum(
    PROJECT_TYPES.map((t) => t.value) as [string, ...string[]],
    { message: "Please choose what your enquiry is about" },
  ),
  ownerBuilder: z.string().optional(),
  budget: z.string().optional(),
  completeBy: z.string().optional(),
  comments: z.string().max(1800).optional(),
  link: z.string().max(300).optional(),
  heardFrom: z.string().optional(),
  preferWhatsapp: z.boolean(),
});

type EnquiryValues = z.infer<typeof EnquirySchema>;

/**
 * The enquiry is one page. The fields our records have no column for (owner
 * builder, the date, the link, how they found us) travel inside the project
 * description, so the studio reads them in the same email as everything else.
 */
function toSubmission(v: EnquiryValues): ContactFormData {
  const extras = [
    v.ownerBuilder && `Owner builder: ${v.ownerBuilder}`,
    v.completeBy && `Needed by: ${v.completeBy}`,
    v.link && `Reference link: ${v.link}`,
    v.heardFrom && `Heard about us: ${v.heardFrom}`,
  ].filter(Boolean);

  const details = [
    v.comments?.trim() || "No additional comments provided.",
    extras.length ? extras.join("\n") : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const location = [
    v.address,
    [v.district, v.postcode].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  return {
    projectType: v.projectType,
    location,
    projectDetails: details,
    budget: (v.budget || undefined) as ContactFormData["budget"],
    timeline: undefined,
    name: v.name,
    email: v.email,
    phone: v.phone,
    preferWhatsapp: v.preferWhatsapp,
  } as ContactFormData;
}

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const known = PROJECT_TYPES.some((t) => t.value === service);

  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const honeypot = useRef<HTMLInputElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      projectType: known ? (service as string) : "",
      preferWhatsapp: true,
    },
  });

  const onSubmit = async (values: EnquiryValues) => {
    // Honeypot: people never see this field, so a filled one is a bot. Answer
    // as if it worked so the bot learns nothing, and send nothing.
    if (honeypot.current?.value) {
      setStatus({ state: "success" });
      return;
    }
    if (!turnstileToken) {
      setStatus({
        state: "error",
        message:
          "Please complete the verification challenge before submitting.",
      });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      const result = await submitContactForm({
        data: toSubmission(values),
        turnstileToken,
      });
      if (result.ok) {
        setStatus({ state: "success" });
      } else {
        setStatus({ state: "error", message: result.message });
        turnstileRef.current?.reset();
        setTurnstileToken("");
      }
    } catch (err) {
      console.error("[contact] Submission threw:", err);
      setStatus({
        state: "error",
        message:
          "Something went wrong on our end. Please try again in a moment.",
      });
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  if (status.state === "success") {
    return (
      <SuccessView
        onReset={() => {
          reset();
          setStatus({ state: "idle" });
        }}
      />
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      noValidate
      className="flex flex-col gap-9"
    >
      <Field id="name" label="Name" required error={errors.name?.message}>
        <TextField
          id="name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
      </Field>
      <Field id="phone" label="Phone" required error={errors.phone?.message}>
        <TextField
          id="phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </Field>
      <Field
        id="email"
        label="Email address"
        required
        error={errors.email?.message}
      >
        <TextField
          id="email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </Field>
      <Field
        id="address"
        label="Project address"
        required
        error={errors.address?.message}
      >
        <TextField
          id="address"
          autoComplete="street-address"
          error={errors.address?.message}
          {...register("address")}
        />
      </Field>
      <Field id="district" label="District">
        <TextField id="district" {...register("district")} />
      </Field>
      <Field id="postcode" label="Postal code">
        <TextField
          id="postcode"
          autoComplete="postal-code"
          {...register("postcode")}
        />
      </Field>
      <Field
        id="projectType"
        label="Is your enquiry about?"
        required
        error={errors.projectType?.message}
      >
        <SelectField
          id="projectType"
          placeholder="Select an option"
          options={PROJECT_TYPES}
          error={errors.projectType?.message}
          {...register("projectType")}
        />
      </Field>
      <Field id="ownerBuilder" label="Are you an owner builder?">
        <SelectField
          id="ownerBuilder"
          placeholder="Select an option"
          options={OWNER_BUILDER}
          {...register("ownerBuilder")}
        />
      </Field>
      <Field id="budget" label="What is your budget?">
        <SelectField
          id="budget"
          placeholder="Select a budget"
          options={BUDGET_BANDS}
          {...register("budget")}
        />
      </Field>
      <Field
        id="completeBy"
        label="When do you need your project completed by?"
      >
        <TextField id="completeBy" type="date" {...register("completeBy")} />
      </Field>
      <Field id="comments" label="Please add any additional comments">
        <TextArea id="comments" rows={4} {...register("comments")} />
      </Field>
      <Field
        id="link"
        label="Optional: link to a Pinterest board, Dropbox files, etc."
      >
        <TextField id="link" type="url" inputMode="url" {...register("link")} />
      </Field>
      <Field id="heardFrom" label="How did you hear about Design Eleven?">
        <SelectField
          id="heardFrom"
          placeholder="Select an option"
          options={HEARD_FROM}
          {...register("heardFrom")}
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          ref={honeypot}
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Checkbox
        id="preferWhatsapp"
        label="Reach me on WhatsApp first, it's faster"
        {...register("preferWhatsapp")}
      />

      {siteKey ? (
        <div>
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken("")}
            onExpire={() => setTurnstileToken("")}
            options={{ theme: "light" }}
          />
        </div>
      ) : (
        <p className="font-meta text-meta-sm text-marking-deep">
          Verification not configured, set NEXT_PUBLIC_TURNSTILE_SITE_KEY in
          .env.local.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status.state === "submitting" || !turnstileToken}
          className="inline-flex w-full items-center justify-between border-b border-ink pb-2 text-left font-sans text-[1.0625rem] font-semibold text-ink transition-colors hover:border-verdigris hover:text-verdigris disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status.state === "submitting"
            ? "Sending…"
            : "Submit project enquiry"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
        {status.state === "error" && (
          <p
            role="alert"
            className="mt-4 font-meta text-meta-sm text-marking-deep"
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-concrete py-20 text-center md:py-28"
    >
      <span className="font-meta text-meta-sm text-verdigris">
        Request received
      </span>
      <h2 className="mt-6 font-title text-d2 font-medium text-ink">
        Thanks, <span className="text-graphite">we&rsquo;ll be in touch.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lead text-graphite">
        We&rsquo;ll personally review your request and respond within 1 business
        day. Check your inbox, we&rsquo;ve sent you a confirmation.
      </p>
      <div className="mt-10">
        <ArrowLink href="/" variant="subtle">
          Back to home
        </ArrowLink>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 font-meta text-meta-sm text-zinc transition-colors hover:text-verdigris"
      >
        Submit another request
      </button>
    </motion.div>
  );
}
