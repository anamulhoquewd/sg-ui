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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, DollarSign } from "lucide-react";

interface AdjustmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
  onUpdate: (data: any) => void;
}

export default function AdjustmentDialog({
  open,
  onOpenChange,
  order,
  onUpdate,
}: AdjustmentDialogProps) {
  const [adjustmentType, setAdjustmentType] = useState<
    "discount" | "fee" | "refund"
  >("discount");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const adjustmentAmount = parseFloat(amount);
      if (isNaN(adjustmentAmount) || adjustmentAmount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      // const newAmount =
      //   adjustmentType === "discount" || adjustmentType === "refund"
      //     ? order.amount - adjustmentAmount
      //     : order.amount + adjustmentAmount;

      onUpdate({
        adjustment: {
          type: adjustmentType,
          amount: adjustmentAmount,
          notes,
        },
        amount: calculateNewTotal(),
      });

      onOpenChange(false);
      setAmount("");
      setNotes("");
    } catch (error) {
      console.error("Failed to apply adjustment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAdjustmentIcon = (type: string) => {
    switch (type) {
      case "discount":
      case "refund":
        return <Minus className="h-4 w-4 text-red-500" />;
      case "fee":
        return <Plus className="h-4 w-4 text-green-500" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const calculateNewTotal = () => {
    const adjustmentAmount = parseFloat(amount) || 0;
    if (adjustmentType === "discount" || adjustmentType === "refund") {
      return order?.amount - adjustmentAmount;
    }
    return order?.amount + adjustmentAmount;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply Order Adjustment</DialogTitle>
          <DialogDescription>
            Apply a discount, fee, or refund to order {order?._id}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Current Order Amount</Label>
            <div className="p-3 border rounded-md bg-muted/50">
              <div className="text-lg font-semibold">
                ৳{order?.amount?.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adjustment-type">Adjustment Type</Label>
              <Select
                value={adjustmentType}
                onValueChange={(value: "discount" | "fee" | "refund") =>
                  setAdjustmentType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select adjustment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">
                    <div className="flex items-center gap-2">
                      <Minus className="h-4 w-4 text-red-500" />
                      Discount
                    </div>
                  </SelectItem>
                  <SelectItem value="fee">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-green-500" />
                      Additional Fee
                    </div>
                  </SelectItem>
                  <SelectItem value="refund">
                    <div className="flex items-center gap-2">
                      <Minus className="h-4 w-4 text-blue-500" />
                      Refund
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (৳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this adjustment..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {amount && (
            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">New Total:</span>
                <div className="flex items-center gap-2">
                  {getAdjustmentIcon(adjustmentType)}
                  <span className="text-lg font-semibold">
                    ৳{calculateNewTotal().toLocaleString()}
                  </span>
                  <Badge
                    variant={
                      adjustmentType === "fee" ? "default" : "destructive"
                    }
                  >
                    {adjustmentType === "discount" && "Discount Applied"}
                    {adjustmentType === "fee" && "Fee Added"}
                    {adjustmentType === "refund" && "Refund Applied"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !amount}
              className="cursor-pointer"
            >
              {isLoading ? "Applying..." : "Apply Adjustment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
