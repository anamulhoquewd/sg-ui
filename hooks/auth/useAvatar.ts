import { useEffect, useState } from "react";
import axios from "axios";

const useAvatar = () => {
  // upload avatar handler
  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }

    const file = files[0];
    // const maxSize = 20 * 1024 * 1024; // 20MB

    // if (file.size > maxSize) {
    //   setError("File size is too large. Maximum size is 20MB.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("avatar", file);

    // try {
    //   const response = await axios.post(
    //     `/users/uploads-avatar?filename=${file.name.split(" ").join("-")}`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    // } catch (error: any) {
    //   if (!error.response.data.success) {
    //     console.log(error.response.data.fields[0].message);
    //   }
    // }
  };

  return {
    uploadHandler,
  };
};

export default useAvatar;
