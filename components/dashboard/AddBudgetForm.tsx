"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { budgetSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget } from "@/lib/api/data-service";
import toast from "react-hot-toast";

interface CreateBudgetFormProps {
  onCloseModal?: () => void;
}

export default function AddBudgetForm({ onCloseModal }: CreateBudgetFormProps) {
  const [isLoading] = useState(false);
  const formSchema = budgetSchema;

  const query = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      toast.success("Budget updated successfully!");
      query.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({ amount: Number(data.amount) });
    onCloseModal?.();
  }

  return (
    <section className="p-10">
      <header className=" mb-6">
        <h1 className="font-inter text-lg">Update Budget</h1>
      </header>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  Amount
                </FormLabel>
                <div>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            )}
          />

          <div className="flex flex-col justify-center items-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-1/2 bg-dark-teal-green text-white md:p-6 rounded-md my-4 hover:bg-bright-leaf-green transition-all duration-300 ease-in-out cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} />
                  Loading...
                </>
              ) : (
                "Update budget"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
