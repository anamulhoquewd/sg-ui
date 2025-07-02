import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import api from "@/axios/interceptor";

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

const useForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [value, setValue] = useState("");

  // Form
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    // Start loading
    setIsLoading(true);

    try {
      const response = await api.post(
        `/admins/auth/forgot-password`,
        form.getValues()
      );

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Forgot failed");
      }

      setIsSuccess(true);
      setValue(response.data.data);
      form.reset({
        email: "",
      });
    } catch (error: any) {
      const res = error.response.data;

      if (res.fields) {
        res.fields.forEach((field: { name: string; message: string }) => {
          form.setError(field.name as "email", {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, form, isLoading, isSuccess, value };
};

export default useForgot;

// export type UseForgot = ReturnType<typeof useForgot>;
