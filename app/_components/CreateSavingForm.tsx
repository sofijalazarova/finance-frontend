"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { savingSchema } from "@/lib/utils";
import { addSavingGoal } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface CreateSavingFormProps {
  onCloseModal?: () => void;
}

export default function CreateSavingForm({
  onCloseModal,
}: CreateSavingFormProps) {
  const [isLoading] = useState(false);
  const formSchema = savingSchema;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addSavingGoal,
    onSuccess: () => {
      toast.success("New saving goal successfully added");
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = {
      ...data,
      targetDate: format(new Date(data.targetDate), "yyyy-MM-dd"),
    };

    console.log(formattedData);
    mutate(formattedData);
    onCloseModal?.();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetAmount: "",
      savedAmount: "",
      targetDate: new Date(),
    },
  });

  return (
    <section className="px-10 py-4">
      <header className="mb-6">
        <h1 className="font-inter text-lg text-center">Add saving goal</h1>
      </header>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  Give it a name{" :)"}
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </FormControl>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  How much money do you want to save?
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

          <FormField
            control={form.control}
            name="savedAmount"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  How much you have saved until now?
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </FormControl>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="targetDate"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  When do you want to reach your goal?
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </FormControl>
              </div>
            )}
          />

          <div className="flex flex-row gap-3  justify-center items-center">
            <Button
              onClick={() => onCloseModal?.()}
              className="w-1/2  md:p-6 font-inter border bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-1/2 bg-dark-teal-green text-white md:p-6 rounded-md my-6 hover:bg-bright-leaf-green transition-all duration-300 ease-in-out cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} />
                  Loading...
                </>
              ) : (
                "Add saving"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
