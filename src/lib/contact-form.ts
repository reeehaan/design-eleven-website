import { z } from "zod";

export const PROJECT_TYPES = [
  { value: "residential-builds", label: "New residential build" },
  { value: "commercial-construction", label: "Commercial construction" },
  { value: "interior-finishing", label: "Interior finishing" },
  { value: "renovation", label: "Renovation / remodel" },
  { value: "other", label: "Something else" },
] as const;

export const BUDGET_BANDS = [
  { value: "under-2m", label: "Under LKR 2M" },
  { value: "2-5m", label: "LKR 2M – 5M" },
  { value: "5-15m", label: "LKR 5M – 15M" },
  { value: "15-50m", label: "LKR 15M – 50M" },
  { value: "50m-plus", label: "LKR 50M+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-12-months", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const Step1Schema = z.object({
  projectType: z.enum(
    PROJECT_TYPES.map((t) => t.value) as [string, ...string[]],
    { message: "Please choose a project type" },
  ),
});

export const Step2Schema = z.object({
  location: z.string().min(2, "Please give us at least the city or town").max(120),
  projectDetails: z
    .string()
    .min(20, "Tell us a bit more — 20+ characters helps us quote accurately")
    .max(2000),
});

export const Step3Schema = z.object({
  budget: z.enum(
    BUDGET_BANDS.map((b) => b.value) as [string, ...string[]],
    { message: "Please choose a budget range" },
  ),
  timeline: z.enum(
    TIMELINE_OPTIONS.map((t) => t.value) as [string, ...string[]],
    { message: "Please choose a timeline" },
  ),
});

export const Step4Schema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Numbers, spaces, and + - ( ) only"),
  preferWhatsapp: z.boolean(),
});

export const ContactFormSchema = z.object({
  ...Step1Schema.shape,
  ...Step2Schema.shape,
  ...Step3Schema.shape,
  ...Step4Schema.shape,
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const initialFormData: ContactFormData = {
  projectType: "",
  location: "",
  projectDetails: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  preferWhatsapp: true,
} as unknown as ContactFormData;

export type FormStep = 1 | 2 | 3 | 4;

export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export type FormState = {
  step: FormStep;
  data: ContactFormData;
  submission: SubmissionState;
};

export type FormAction =
  | { type: "update"; patch: Partial<ContactFormData> }
  | { type: "next" }
  | { type: "back" }
  | { type: "goto"; step: FormStep }
  | { type: "submit-start" }
  | { type: "submit-success" }
  | { type: "submit-error"; message: string }
  | { type: "reset" };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "update":
      return { ...state, data: { ...state.data, ...action.patch } };
    case "next":
      return state.step < 4 ? { ...state, step: (state.step + 1) as FormStep } : state;
    case "back":
      return state.step > 1 ? { ...state, step: (state.step - 1) as FormStep } : state;
    case "goto":
      return { ...state, step: action.step };
    case "submit-start":
      return { ...state, submission: { status: "submitting" } };
    case "submit-success":
      return { ...state, submission: { status: "success" } };
    case "submit-error":
      return { ...state, submission: { status: "error", message: action.message } };
    case "reset":
      return { step: 1, data: initialFormData, submission: { status: "idle" } };
    default:
      return state;
  }
}

export const initialFormState: FormState = {
  step: 1,
  data: initialFormData,
  submission: { status: "idle" },
};
