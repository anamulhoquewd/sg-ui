import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { useRef } from "react";

export function UploadAvatar() {
  // input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Click the input element when the button is clicked
  const inputClickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24">
        <AvatarImage
          className="w-auto h-full object-cover"
          src={""}
          alt="Profile picture"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold select-none">
          SG
        </AvatarFallback>
      </Avatar>
      <Button
        type="button"
        variant="outline"
        className="absolute bottom-0 right-0 h-8 w-8 rounded-full cursor-pointer dark:bg-foreground-dark dark:hover:bg-foreground-dark/80"
      >
        <Camera className="h-4 w-4" />
      </Button>

      <Dialog open={false}>
        <DialogContent className="w-[90vw] sm:max-w-[425px] bg-secondary text-secondary-foreground rounded-lg">
          <DialogHeader className="text-center m-auto text-2xl font-semibold">
            Change Avatar
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold select-none">
                  SG
                </AvatarFallback>
                <AvatarImage
                  className="w-auto h-full object-cover"
                  alt="Avatar preview"
                  src={""}
                />
              </Avatar>
              <div className="flex flex-col items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={inputClickHandler}
                >
                  Select New Avatar
                </Button>
                <span className="text-xs text-red-500 select-none">
                  {"error message"}
                </span>
                <span className="text-xs text-muted-foreground select-none">
                  Auto update when you upload an image
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Input
        id="avatar-upload"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
