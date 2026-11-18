import { z } from "zod";
import { ACTION_CATEGORIES, FEEDBACK_CATEGORIES, FREQUENCIES } from "./options";

export const pledgeSchema = z.object({
  displayName: z.string().trim().max(40, "Display name must be 40 characters or fewer."),
  actionCategory: z.enum(ACTION_CATEGORIES, { errorMap: () => ({ message: "Please choose an action category." }) }),
  commitment: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(500, "Please keep your commitment under 500 characters."),
  frequency: z.enum(FREQUENCIES, { errorMap: () => ({ message: "Please choose how often you will practice it." }) }),
  selectedSdgs: z
    .array(z.number().int().min(1).max(17))
    .min(1, "Select at least one SDG.")
    .max(5, "Select up to 5 SDGs."),
  agree: z.boolean().refine((v) => v === true, "You must agree before submitting."),
  website: z.string().max(0).optional(), // honeypot
});
export type PledgeInput = z.infer<typeof pledgeSchema>;

export const feedbackSchema = z.object({
  name: z.string().trim().max(60, "Name must be 60 characters or fewer."),
  email: z
    .string()
    .trim()
    .max(120, "Email must be 120 characters or fewer.")
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Please enter a valid email address."),
  category: z.enum(FEEDBACK_CATEGORIES, { errorMap: () => ({ message: "Please choose a category." }) }),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(1500, "Please keep your message under 1500 characters."),
  agree: z.boolean().refine((v) => v === true, "You must accept the privacy notice."),
  website: z.string().max(0).optional(), // honeypot
});
export type FeedbackInput = z.infer<typeof feedbackSchema>;
