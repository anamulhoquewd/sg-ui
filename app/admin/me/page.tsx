"use client";

import useMe from "@/hooks/auth/useMe";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { UploadAvatar } from "@/components/upload-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ChangePassword from "@/components/change-password";

function Me() {
  const {
    form,
    handleUpdate,
    isLoading,
    setIsLoading,
    passwordOpen,
    setpasswordOpen,
    isEditing,
    setIsEditing,
    user,
  } = useMe();

  return (
    <div className="">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Stay in Control of Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Manage your Personal information.
        </p>
        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-10">
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  {/* Avatar section */}
                  <UploadAvatar />
                  <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-bold">
                      {user?.name || "John Doe"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || "example@me.com"}
                    </p>
                    <Badge className="bg-primary text-primary-foreground px-2 mt-3 rounded-full">
                      {user?.role || "user"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              onClick={() => setpasswordOpen(true)}
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
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="space-y-6"
                >
                  <div className="grid gap-4 md:grid-cols-2 items-start">
                    <FormField
                      control={form.control}
                      name={"name"}
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="cursor-pointer">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Type your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"email"}
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="cursor-pointer">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Type your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"phone"}
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="cursor-pointer">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"address"}
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="cursor-pointer">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Type your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full flex justify-end gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          className="cursor-pointer"
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit">
                          {isLoading ? (
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
                      <Button
                        className="cursor-pointer"
                        type="button"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <ChangePassword
            isOpen={passwordOpen}
            onClose={() => setpasswordOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Me;
