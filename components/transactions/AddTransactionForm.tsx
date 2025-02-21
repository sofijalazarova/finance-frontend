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
import { transactionSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import TransactionInput from "./TransactionInput";
import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import { useCategoriesQuery } from "@/lib/queries/useCategoriesQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransaction } from "@/lib/api/data-service";
import toast from "react-hot-toast";
import { useCategoryBudgetsQuery } from "@/lib/queries/useCategoryBudgetsQuery";

interface CreateBudgetFormProps {
  onCloseModal?: () => void;
}

export default function AddTransactionForm({
  onCloseModal,
}: CreateBudgetFormProps) {
  const [isLoading] = useState(false);
  const formSchema = transactionSchema;

  const query = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      toast.success("Transaction added successfully!");
      query.invalidateQueries({ queryKey: ["transactions"] });
      query.invalidateQueries({ queryKey: ["accounts"] });
      query.invalidateQueries({ queryKey: ["categoryBudgets"] });

      form.reset();
    },
  });

  const { data: accounts } = useAccountsQuery();
  const { data: categories } = useCategoriesQuery();

  const { data: categoryBudgets } = useCategoryBudgetsQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_id: undefined,
      name: "",
      category_id: undefined,
      description: "",
      type: "EXPENSE",
      amount: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    query.invalidateQueries({ queryKey: ["categoryBudgets"] });
    const formData = {
      ...data,
      category_id: Number(data.category_id),
      account_id: Number(data.account_id),
    };
    mutate(formData);
    onCloseModal?.();
  }

  return (
    <section className="p-10">
      <header className="mb-6">
        <h1 className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
          Add new transaction
        </h1>
      </header>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="account_id"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  Account
                </FormLabel>
                <div>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    >
                      <option value="">Select an account</option>
                      {accounts &&
                        accounts.map((account: AccountModel) => (
                          <option key={account.id} value={account.id}>
                            {account.name}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  Category
                </FormLabel>
                <div>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    >
                      <option value="">Select a category</option>
                      {categories &&
                        categories.map((category: CategoryModel) => {
                          const available =
                            categoryBudgets?.find(
                              (budget: any) =>
                                budget.category.id === category.id
                            )?.availableAmount || 0;

                          return (
                            <option key={category.id} value={category.id}>
                              {category.name} {category.emoji}
                              &nbsp; ${available}
                            </option>
                          );
                        })}
                    </select>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            )}
          />

          <TransactionInput
            control={form.control}
            name="name"
            label="Transaction Name"
            placeholder=""
          />

          <TransactionInput
            control={form.control}
            name="description"
            label="Description"
            placeholder=""
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div>
                <FormLabel className="mb-2 text-md font-light text-gray-600">
                  Transaction Type
                </FormLabel>
                <div>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 border bg-white border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    >
                      <option value="EXPENSE">EXPENSE</option>
                      <option value="INCOME">INCOME</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            )}
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
