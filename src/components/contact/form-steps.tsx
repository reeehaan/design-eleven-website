"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PROJECT_TYPES,
  BUDGET_BANDS,
  TIMELINE_OPTIONS,
  Step2Schema,
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

// Selecting a card *is* the answer — there's nothing left to validate, so
// this advances the moment someone taps, no separate "Continue" required.
export function Step1ProjectType({ data, onComplete }: StepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-title text-d3 font-medium text-ink">
          What are you building?
        </h2>
        <p className="mt-3 max-w-measure text-copy text-graphite">
          Pick the closest match — that takes you straight to the form.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECT_TYPES.map((type, i) => (
          <ChoiceCard
            key={type.value}
            label={type.label}
            index={`0${i + 1}`}
            selected={data.projectType === type.value}
            onSelect={() => onComplete({ projectType: type.value })}
          />
        ))}
      </div>
    </div>
  );
}

type Step2Values = {
  location: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
  name: string;
  email: string;
  phone: string;
  preferWhatsapp: boolean;
};

export function Step2Everything({ data, onComplete }: StepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      location: data.location,
      projectDetails: data.projectDetails,
      budget: data.budget,
      timeline: data.timeline,
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferWhatsapp: data.preferWhatsapp,
    },
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
        <h2 className="font-title text-d3 font-medium text-ink">
          Tell us about it.
        </h2>
        <p className="mt-3 max-w-measure text-copy text-graphite">
          One short form — the budget and timeline are a bonus if you have
          them, not a requirement.
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
            rows={5}
            placeholder="What's the project? Approximate size, scope, any specific requirements you have in mind…"
            error={errors.projectDetails?.message}
            {...register("projectDetails")}
          />
          <FieldError message={errors.projectDetails?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <Label className="mb-3">Budget range</Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {BUDGET_BANDS.map((band) => (
              <ChoiceCard
                key={band.value}
                label={band.label}
                selected={budget === band.value}
                onSelect={() =>
                  setValue("budget", budget === band.value ? undefined : band.value, {
                    shouldValidate: true,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3">When would you start?</Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {TIMELINE_OPTIONS.map((option) => (
              <ChoiceCard
                key={option.value}
                label={option.label}
                selected={timeline === option.value}
                onSelect={() =>
                  setValue(
                    "timeline",
                    timeline === option.value ? undefined : option.value,
                    { shouldValidate: true },
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 border-t border-concrete pt-10">
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
