"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { createCar } from "../queries";
import { getUserIdByClerkId } from "@/actions/queries";

const carFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  make: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce.number().min(1900, "El año debe ser 1900 o posterior"),
  checks: z.string().optional(),
  photoUrl: z.any().optional(),
});

type CarFormData = z.infer<typeof carFormSchema>;

async function uploadImageToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const formData = new FormData();
  formData.append("file", new Blob([buffer]), file.name);
  formData.append("upload_preset", "sarasa");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/ddonepbyh/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen a Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
}

export function CarForm() {
  const { userId: clerkUserId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      name: "",
      checks: "",
    },
  });

  const handleSubmit = async (data: CarFormData) => {
    setIsSubmitting(true);
    try {
      const userId = await getUserIdByClerkId(String(clerkUserId));
      let photoUrl = "";
      if (data.photoUrl instanceof File) {
        photoUrl = await uploadImageToCloudinary(data.photoUrl);
      }
      await createCar(userId, {
        ...data,
        photoUrl,
      });
    } catch (error) {
      console.error("Error al guardar el coche:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-wrap gap-6 items-center">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Año</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checks"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Checks</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>Imagen del coche</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-5" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  );
}
