"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { transactionSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import TransactionInput from "./TransactionInput";

export default function AddTransaction() {
  const [isLoading] = useState(false);
  const formSchema = transactionSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      transactionName: "",
      category: "",
      note: "",
      date: new Date(),
      amount: 0,
    },
  });

  return (
    <section className="p-10">
      <header className=" mb-6">
        <h1 className="font-inter text-lg">Add new transaction</h1>
      </header>
      <Form {...form}>
        <form className="space-y-8">
          <TransactionInput
            control={form.control}
            name="account"
            label="Account"
            placeholder=""
          />

          <TransactionInput
            control={form.control}
            name="transactionName"
            label="Transaction Name"
            placeholder=""
          />
          <TransactionInput
            control={form.control}
            name="category"
            label="Category"
            placeholder=""
          />
          <TransactionInput
            control={form.control}
            name="note"
            label="Note"
            placeholder=""
          />
          <TransactionInput
            control={form.control}
            name="date"
            label="Date"
            placeholder=""
          />
          <TransactionInput
            control={form.control}
            name="amount"
            label="Amount"
            placeholder=""
          />
          <div className="flex flex-col  justify-center items-center">
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
                "Add transaction"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
