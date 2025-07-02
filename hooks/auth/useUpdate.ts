import api from "@/axios/interceptor";
import { IAdmin } from "@/interfaces/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateUserBySelfSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const useUpdate = ({ user }: { user: IAdmin | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof updateUserBySelfSchema>>({
    resolver: zodResolver(updateUserBySelfSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof updateUserBySelfSchema>) => {
    setIsLoading(true);
    try {
      await api.patch("/users/profile", data);

      setIsEditing(false);
    } catch (error: any) {
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            type: "manual",
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    form,
    onSubmit,
    setIsEditing,
    isEditing,
    isLoading,
    setIsLoading,
  };
};

export default useUpdate;
