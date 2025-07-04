import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

interface Props {
  collection: { name: string; avatar: string };
  error: string;
  setError: (error: string) => void;
  isAvatarOpen: boolean;
  setIsAvatarOpen: (isAvatarOpen: boolean) => void;
  uploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadAvatar({
  collection,
  error,
  setError,
  isAvatarOpen,
  setIsAvatarOpen,
  uploadHandler,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [collectionItem, setCollectionItem] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  const inputClickHandler = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    setError("");
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    const fakeEvent = {
      target: { files: [selectedFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    uploadHandler(fakeEvent);
  };

  useEffect(() => {
    setCollectionItem(collection || null);
  }, [collection]);

  return (
    <>
      <Dialog
        open={isAvatarOpen}
        onOpenChange={(open: boolean) => {
          setIsAvatarOpen(open);
          setError("");
        }}
      >
        <DialogContent className="w-[90vw] sm:max-w-[425px] bg-secondary text-secondary-foreground rounded-lg">
          <DialogHeader className="text-center m-auto text-2xl font-semibold">
            Change Avatar
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold select-none">
                  {collectionItem
                    ? collectionItem.name
                        .split(" ")
                        .map((ch) => ch[0])
                        .join("")
                        .toUpperCase()
                    : "SG"}
                </AvatarFallback>
                <AvatarImage
                  className="w-auto h-full object-cover"
                  alt="Avatar preview"
                  src={
                    previewUrl || (collectionItem ? collectionItem.avatar : "")
                  }
                />
              </Avatar>
              <div className="flex flex-col items-center gap-2">
                <div className="space-x-5">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={inputClickHandler}
                  >
                    Select New Avatar
                  </Button>
                  <Button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    Upload
                  </Button>
                </div>
                <span className="text-xs text-red-500 select-none">
                  {error}
                </span>
                <span className="text-xs text-muted-foreground select-none">
                  Auto update when you click on upload button
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
        onChange={handleFileChange}
      />
    </>
  );
}
