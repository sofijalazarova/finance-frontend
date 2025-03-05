import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transactionSchema = z.object({
  account_id: z.string(),
  name: z.string(),
  category_id: z.string().optional(),
  description: z.string().optional(),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  type: z.enum(["INCOME", "EXPENSE"]),
});

export const budgetSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
});

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email("Please enter a valid email."),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)"),
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
  });

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  emoji: z.string().min(1, "Please select an emoji"),
});

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["SAVINGS", "CASH", "CREDIT_CARD", "OTHER"], {
    required_error: "Account type is required",
  }),
  balance: z
    .string()
    .min(1, "Balance is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Balance must be a valid number"),
});

export const savingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  targetAmount: z
    .string()
    .min(1, "Target Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  savedAmount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Saved amount must be a valid number"),
  targetDate: z.date(),
});
