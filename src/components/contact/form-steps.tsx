"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PROJECT_TYPES,
  BUDGET_BANDS,
  TIMELINE_OPTIONS,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  type ContactFormData,
} from "@/lib/contact-form";
import {
  Label,
  TextField,
  TextArea,
  ChoiceCard,
  FieldError,
  Checkbox,
} from "@/components/ui/form-field";

type StepProps = {
  data: ContactFormData;
  onComplete: (patch: Partial<ContactFormData>) => void;
};

/* ── Step 1 — Project Type ──────────────────────────────────── */

export function Step1ProjectType({ data, onComplete }: StepProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ projectType: string }>({
    resolver: zodResolver(Step1Schema),
    defaultValues: { projectType: data.projectType },
  });

  const selected = watch("projectType");

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit((values) => onComplete(values))}
      className="flex flex-col gap-8"
      noValidate
    >
      <div>
        <h2 className="font-display text-display-md text-fg-primary">
          What are you building?
        </h2>
        <p className="mt-3 max-w-md text-fg-muted">
          Pick the closest match. We&rsquo;ll get into the details on the next step.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECT_TYPES.map((type, i) => (
          <ChoiceCard
            key={type.value}
            label={type.label}
            index={`0${i + 1}`}
            selected={selected === type.value}
            onSelect={() => setValue("projectType", type.value, { shouldValidate: true })}
          />
        ))}
      </div>

      <FieldError message={errors.projectType?.message as string | undefined} />
    </form>
  );
}

/* ── Step 2 — Project Details ───────────────────────────────── */

export function Step2Details({ data, onComplete }: StepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ location: string; projectDetails: string }>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      location: data.location,
      projectDetails: data.projectDetails,
    },
  });

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit((values) => onComplete(values))}
      className="flex flex-col gap-8"
      noValidate
    >
      <div>
        <h2 className="font-display text-display-md text-fg-primary">
          Tell us about the project.
        </h2>
        <p className="mt-3 max-w-md text-fg-muted">
          A few sentences is plenty. We&rsquo;ll ask follow-up questions on the site visit.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <Label htmlFor="location" required>
            Project location
          </Label>
          <TextField
            id="location"
            placeholder="e.g. Rajagiriya, Colombo"
            error={errors.location?.message}
            {...register("location")}
          />
          <FieldError message={errors.location?.message} />
        </div>

        <div>
          <Label htmlFor="projectDetails" required>
            Project description
          </Label>
          <TextArea
            id="projectDetails"
            rows={6}
            placeholder="What's the project? Approximate size, scope, any specific requirements you have in mind…"
            error={errors.projectDetails?.message}
            {...register("projectDetails")}
          />
          <FieldError message={errors.projectDetails?.message} />
        </div>
      </div>
    </form>
  );
}

/* ── Step 3 — Budget & Timeline ─────────────────────────────── */

export function Step3BudgetTimeline({ data, onComplete }: StepProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ budget: string; timeline: string }>({
    resolver: zodResolver(Step3Schema),
    defaultValues: { budget: data.budget, timeline: data.timeline },
  });

  const budget = watch("budget");
  const timeline = watch("timeline");

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit((values) => onComplete(values))}
      className="flex flex-col gap-10"
      noValidate
    >
      <div>
        <h2 className="font-display text-display-md text-fg-primary">
          Budget &amp; timeline.
        </h2>
        <p className="mt-3 max-w-md text-fg-muted">
          Rough ranges are fine — we use this to plan our response, not to set your final number.
        </p>
      </div>

      <div>
        <Label required className="mb-4">
          Budget range
        </Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUDGET_BANDS.map((band) => (
            <ChoiceCard
              key={band.value}
              label={band.label}
              selected={budget === band.value}
              onSelect={() => setValue("budget", band.value, { shouldValidate: true })}
            />
          ))}
        </div>
        <FieldError message={errors.budget?.message as string | undefined} />
      </div>

      <div>
        <Label required className="mb-4">
          When would you start?
        </Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TIMELINE_OPTIONS.map((option) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              selected={timeline === option.value}
              onSelect={() => setValue("timeline", option.value, { shouldValidate: true })}
            />
          ))}
        </div>
        <FieldError message={errors.timeline?.message as string | undefined} />
      </div>
    </form>
  );
}

/* ── Step 4 — Contact Info ──────────────────────────────────── */

export function Step4Contact({ data, onComplete }: StepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    preferWhatsapp: boolean;
  }>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferWhatsapp: data.preferWhatsapp,
    },
  });

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit((values) => onComplete(values))}
      className="flex flex-col gap-8"
      noValidate
    >
      <div>
        <h2 className="font-display text-display-md text-fg-primary">
          How can we reach you?
        </h2>
        <p className="mt-3 max-w-md text-fg-muted">
          We&rsquo;ll respond within 1 business day with next steps.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <Label htmlFor="name" required>
            Your name
          </Label>
          <TextField
            id="name"
            placeholder="e.g. Sanduni Perera"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <TextField
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="phone" required>
            Phone
          </Label>
          <TextField
            id="phone"
            type="tel"
            placeholder="+94 77 000 0000"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="pt-2">
          <Checkbox
            id="preferWhatsapp"
            label="Reach me on WhatsApp first — it's faster"
            {...register("preferWhatsapp")}
          />
        </div>
      </div>
    </form>
  );
}
