"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (confirmText.toLowerCase() !== "delete") return;

    setIsLoading(true);
    try {
      onConfirm();
      onOpenChange(false);
      setConfirmText("");
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setConfirmText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Order
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the order
            and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 border border-red-200 rounded-md bg-red-50">
            <div className="text-sm text-red-800">
              <strong>Warning:</strong> Deleting this order will:
              <ul className="mt-2 ml-4 list-disc space-y-1">
                <li>Remove all order history</li>
                <li>Delete payment records</li>
                <li>Remove customer notifications</li>
                <li>Clear inventory adjustments</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-text">
              Type <strong>DELETE</strong> to confirm
            </Label>
            <Input
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={confirmText.toLowerCase() !== "delete" || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
