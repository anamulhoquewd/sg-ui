"use client";

import type React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { PasswordInputField } from "./password-input-field";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangePassword({ isOpen, onClose }: PasswordChangeModalProps) {
  const form = useForm({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to update your
            credentials.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
          >
            <PasswordInputField
              form={form}
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
              name="currentPassword"
              placeholder="Type your current password"
              label="Current Password"
            />
            <PasswordInputField
              form={form}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              name="newPassword"
              placeholder="Type your new password"
              label="New Password"
            />
            <PasswordInputField
              form={form}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              name="confirmPassword"
              placeholder="Type your confirm password"
              label="Confirm Password"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                  disabled={false}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={false}
              >
                {false ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
