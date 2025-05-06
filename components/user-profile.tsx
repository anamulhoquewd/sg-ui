"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadAvatar } from "./upload-avatar";
import ChangePassword from "./change-password";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ProfileDataInputField } from "./password-input-field";
import { useForm } from "react-hook-form";

export function UserProfile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const form = useForm({});

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              {/* Avatar section */}
              <UploadAvatar />
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-xl font-bold">{"John Doe"}</h2>
                <p className="text-sm text-muted-foreground">
                  {"example@me.com"}
                </p>
                <Badge className="bg-primary text-primary-foreground px-2 mt-3 rounded-full">
                  {"user"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full cursor-pointer"
        >
          Change Password
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Keep your profile information up to date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmit(data))}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileDataInputField
                  form={form}
                  name={"name"}
                  label={"Name"}
                  placeholder={"Type your name"}
                  disabled={!false}
                />
                <ProfileDataInputField
                  form={form}
                  name={"email"}
                  label={"Email"}
                  placeholder={"Type your email"}
                  disabled={!false}
                />
                <ProfileDataInputField
                  form={form}
                  name={"phone"}
                  label={"Phone"}
                  placeholder={"Type your phone number"}
                  disabled={!false}
                />
                <ProfileDataInputField
                  form={form}
                  name={"address"}
                  label={"Address"}
                  placeholder={"Type your address"}
                  disabled={!false}
                />
                <ProfileDataInputField
                  form={form}
                  name={"NID"}
                  label={"NID"}
                  placeholder={"Type your NID"}
                  disabled={true}
                />
                <ProfileDataInputField
                  form={form}
                  name={"role"}
                  label={"Role"}
                  placeholder={"Type your role"}
                  disabled={true}
                />
              </div>

              <div className="w-full flex justify-end gap-2">
                {false ? (
                  <>
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="outline"
                    //   onClick={() => setfalse(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="cursor-pointer" type="submit">
                      {false ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </>
                ) : (
                  <Button className="cursor-pointer" type="button">
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ChangePassword
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
