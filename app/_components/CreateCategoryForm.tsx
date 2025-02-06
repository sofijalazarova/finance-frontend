import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategory } from "@/lib/data-service";
import { categorySchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";

const emojis = [
  "😀", "😂", "😎", "😍", "🥳", "🎉", "🍕", "🚗", "🏡", "📚",
  "💡", "💻", "📱", "🏖️", "🎶", "✈️", "🛒", "🍔", "🍩", "⚽",
  "🏀", "💵", "💳", "🎁",
];

interface CreateCategoryFormProps {
  onCloseModal?: () => void;
}

export default function CreateCategoryForm({ onCloseModal }: CreateCategoryFormProps) {
  const formSchema = categorySchema;

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
        toast.success("New category successfully added");
        queryClient.invalidateQueries({queryKey: ["categories"]});
    },
    onError: (err) => toast.error(err.message),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", emoji: "" },
  });

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted:", data);
    mutate(data);
    onCloseModal?.();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            name="name"
            render={({ field }) => (
              <div className="mb-4">
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Enter category name" />
                </FormControl>
              </div>
            )}
          />
     
          <FormField
            name="emoji"
            render={({ field }) => (
              <div className="mb-4">
                <FormLabel>Select an Emoji</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setValue("emoji", emoji); // Update emoji in the form state
                        }}
                        className={`p-2 border rounded-md text-lg ${
                          field.value === emoji
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </FormControl>
               
                {form.formState.errors.emoji && (
                  <p className="text-red-500 text-sm mt-2">
                    {form.formState.errors.emoji.message}
                  </p>
                )}
              </div>
            )}
          />
        
          <div className="flex flex-row gap-3 justify-center items-center mt-4">
            <Button
              type="button"
              onClick={() => onCloseModal?.()}
              className="w-1/2 md:p-6 font-inter border bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-1/2 bg-dark-teal-green text-white md:p-6 rounded-md my-6 hover:bg-bright-leaf-green transition-all duration-300 ease-in-out cursor-pointer"
            >
              Add Category
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
