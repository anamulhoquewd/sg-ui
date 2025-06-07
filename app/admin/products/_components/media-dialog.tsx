"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, Trash2, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MediaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: any
  onUpdate: (data: any) => void
}

export function MediaDialog({ open, onOpenChange, product, onUpdate }: MediaDialogProps) {
  const [isPending, setIsPending] = useState(false)
  const [currentMedia, setCurrentMedia] = useState<any[]>(product?.media || [])
  const [newMedia, setNewMedia] = useState<{ file: File; preview: string }[]>([])
  const [activeTab, setActiveTab] = useState("current")
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [selectedNewImages, setSelectedNewImages] = useState<number[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      const newUploads = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setNewMedia((prev) => [...prev, ...newUploads])
    }
  }

  const toggleImageSelection = (index: number) => {
    setSelectedImages((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const toggleNewImageSelection = (index: number) => {
    setSelectedNewImages((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const removeSelectedImages = () => {
    setCurrentMedia((prev) => prev.filter((_, index) => !selectedImages.includes(index)))
    setSelectedImages([])
  }

  const removeSelectedNewImages = () => {
    setNewMedia((prev) => prev.filter((_, index) => !selectedNewImages.includes(index)))
    setSelectedNewImages([])
  }

  const handleSubmit = async () => {
    setIsPending(true)
    try {
      // In a real app, you would upload new images and update the product
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Prepare the data to send to the server
      const mediaData = {
        currentMedia,
        newMedia: newMedia.map((item) => ({
          file: item.file,
          alt: item.file.name,
        })),
      }

      onUpdate(mediaData)
    } catch (error) {
      console.error("Error updating media:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" src="/placeholder.svg" width={20} height={20} alt="Media" />
            Manage Media
          </DialogTitle>
          <DialogDescription>Update product images for {product?.name}.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Images ({currentMedia.length})</TabsTrigger>
            <TabsTrigger value="upload">Upload New ({newMedia.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {currentMedia.length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">No images available</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentMedia.map((media, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
                        selectedImages.includes(index) ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => toggleImageSelection(index)}
                    >
                      <Image
                        src={media.url || "/placeholder.svg"}
                        alt={media.alt || `Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {selectedImages.includes(index) && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {selectedImages.length > 0 && (
              <div className="flex justify-between items-center mt-2 p-2 bg-muted rounded-md">
                <span className="text-sm">{selectedImages.length} images selected</span>
                <Button variant="destructive" size="sm" onClick={removeSelectedImages}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Selected
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {newMedia.map((media, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
                      selectedNewImages.includes(index) ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => toggleNewImageSelection(index)}
                  >
                    <Image
                      src={media.preview || "/placeholder.svg"}
                      alt={`New upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedNewImages.includes(index) && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload Image</span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>
            </ScrollArea>
            {selectedNewImages.length > 0 && (
              <div className="flex justify-between items-center mt-2 p-2 bg-muted rounded-md">
                <span className="text-sm">{selectedNewImages.length} images selected</span>
                <Button variant="destructive" size="sm" onClick={removeSelectedNewImages}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Selected
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button type="button" variant="outline" className="mr-auto" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          {activeTab === "current" && currentMedia.length > 0 && (
            <Button type="button" variant="destructive" onClick={() => setCurrentMedia([])}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove All
            </Button>
          )}

          <Button
            type="button"
            disabled={isPending || (currentMedia.length === 0 && newMedia.length === 0)}
            onClick={handleSubmit}
          >
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
