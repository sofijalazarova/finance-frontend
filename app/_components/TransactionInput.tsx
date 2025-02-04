import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { transactionSchema } from "@/lib/utils";
import React from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = transactionSchema;

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const TransactionInput = ({
  name,
  label,
  placeholder,
  control,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <FormLabel className="mb-2 text-md font-light text-gray-600">
            {label}
          </FormLabel>
          <div>
            <FormControl>
              <Input
                className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder={placeholder}
                {...field}
                type={
                  name === "amount"
                    ? "number"
                    : name === "date"
                    ? "date"
                    : "text"
                }
              />
            </FormControl>
            <FormMessage />
          </div>
        </div>
      )}
    />
  );
};

export default TransactionInput;
