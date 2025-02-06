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
import { accountSchema } from "@/lib/utils";
import { addAccount } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


interface CreateAccountFormProps {
  onCloseModal?: () => void;
}

export default function CreateAccountForm({
  onCloseModal,
}: CreateAccountFormProps) {
  const [isLoading] = useState(false);
  const formSchema = accountSchema;

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: addAccount,
    onSuccess:() => {
        toast.success("New account successfully added");
        queryClient.invalidateQueries({queryKey: ["accounts"]});
    }
  })

  
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    mutate(data);
    onCloseModal?.();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "SAVINGS",
      balance: "",
    },
  });

  return (
    <section className="px-10 py-4">
      <header className="mb-6">
        <h1 className="font-inter text-lg text-center">Add account</h1>
      </header>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <div>
                <FormLabel>Give it a name </FormLabel>
                <FormControl>
                    <input {...field} type="text"/>
                </FormControl>
                </div>
            )}
          />
          

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  What type of an account you&apos;re adding?
                </FormLabel>
                <div>
                  <FormControl>
                    <select
                      className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      {...field}
                    >
                      <option value="SAVINGS">Savings</option>
                      <option value="CASH">Cash</option>
                      <option value="CREDIT_CARD">Credit card</option>\
                      <option value="OTHER">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            )}
          />

        <FormField
            control={form.control}
            name="balance"
            render={({field}) => (
                <div>
                <FormLabel>What is your current account balance?</FormLabel>
                <FormControl>
                    <input {...field} type="text"/>
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
                "Add account"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}