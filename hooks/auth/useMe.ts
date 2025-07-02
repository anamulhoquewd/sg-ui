import api from "@/axios/interceptor";
import { IAdmin } from "@/interfaces/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must start with 01 and be exactly 11 digits"
    ),
  address: z.string().max(100, "Address must be less than 100 characters long"),
});

function useMe() {
  const [user, setUser] = useState<IAdmin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordOpen, setpasswordOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const loadMe = async () => {
    try {
      const response = await api.get("/admins/auth/me");

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setUser(response.data.data);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const handleUpdate = async (data: z.infer<typeof userFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.patch("/admins/auth/me", data);

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      loadMe();
      setIsEditing(false);

      toast(response.data.message || "Category updated successfully!");
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/admins/auth/logout");

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message);

      router.push("/auth/sign-in");
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

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

  return {
    user,
    handleUpdate,
    form,
    isLoading,
    setIsLoading,
    passwordOpen,
    setpasswordOpen,
    isEditing,
    setIsEditing,
    handleLogout,
  };
}

export default useMe;
