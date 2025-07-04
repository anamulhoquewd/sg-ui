import api from "@/axios/interceptor";
import { IAdmin } from "@/interfaces/users";
import { useState } from "react";
import useMe from "./useMe";
import { toast } from "sonner";

const useAvatar = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [error, setError] = useState("");

  const { user } = useMe();

  console.warn("Called hook");

  // upload avatar handler
  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.warn("Called handler");
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }

    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      setError("File size is too large. Maximum size is 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.post(
        `/admins/auth/uploads?filename=${
          user ? user.name.split(" ").join("-") : "user"
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message || "Avatar change successfully!");

      setIsAvatarOpen(false);

      window.location.reload();
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return {
    user,
    uploadHandler,
    error,
    setError,
    isAvatarOpen,
    setIsAvatarOpen,
  };
};

export default useAvatar;
