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

const TransactionFormInput = ({
  name,
  label,
  placeholder,
  control,
  options,
}: CustomInputProps & {
  options?: { value: string | number; label: string }[];
}) => {
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
              {options ? (
                <select
                  {...field}
                  className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                >
                  <option value="">{placeholder}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  placeholder={placeholder}
                  {...field}
                  type="text"
                />
              )}
            </FormControl>
            <FormMessage />
          </div>
        </div>
      )}
    />
  );
};

export default TransactionFormInput;
