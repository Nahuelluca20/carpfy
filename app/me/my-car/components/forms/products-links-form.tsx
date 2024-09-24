"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProductLink } from "@/actions/products-links";

interface ProductsLinksFormProps {
  modifications: {
    id: string | null;
    date: Date | null;
    description: string | null;
    name: string | null;
    carId: string | null;
  }[];
  userId: string;
}

export function ProductsLinksForm({
  modifications,
  userId,
}: ProductsLinksFormProps) {
  const formSchema = z.object({
    product_name: z.string().min(2, {
      message: "product name must be at least 2 characters.",
    }),
    url: z.string().url(),
    modificationId: z.string().uuid(),
    userId: z.string().uuid(),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (formSchema.safeParse(data)) {
      const newProductLink = await addProductLink(data);
      form.reset();
      return newProductLink;
    }
    return null;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      url: "",
      modificationId: "",
      userId: userId,
    },
  });

  return (
    <Form {...form}>
      <form className="mt-4 space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Add product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="text" placeholder="URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modificationId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select modification" />
                  </SelectTrigger>
                  <SelectContent>
                    {modifications.map((modification) => (
                      <SelectItem
                        key={modification.id}
                        value={modification.id ?? ""}
                      >
                        {modification.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Modification
        </Button>
      </form>
    </Form>
  );
}
