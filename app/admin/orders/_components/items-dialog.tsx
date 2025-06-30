"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, Trash2, Package } from "lucide-react";
import { IOrderItem } from "@/interfaces/orders";

export interface ItemsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: { _id: string; items: IOrderItem[]; amount: number };
  onUpdate: (data: any) => void;
}

export default function ItemsDialog({
  open,
  onOpenChange,
  order,
  onUpdate,
}: ItemsDialogProps) {
  const [items, setItems] = useState<IOrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product === itemId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product !== itemId)
    );
  };

  const calculateOrderTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newAmount = calculateOrderTotal();
      onUpdate({
        items: items.filter((item) => item.quantity > 0),
        newAmount,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update order items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setItems(order?.items || []);
  }, [order]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Manage Order Items</DialogTitle>
          <DialogDescription>
            Update quantities or remove items from order {order?._id}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <Label className="text-base font-medium">Order Items</Label>
              <Badge variant="secondary">{items.length} items</Badge>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No items in this order
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => (
                      <TableRow key={item.product}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>

                          <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                            ID: {item.product}
                          </code>
                        </TableCell>
                        <TableCell className="text-right">
                          ৳{item?.price.toLocaleString() || "0.00"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer"
                              onClick={() =>
                                updateQuantity(item.product, item.quantity - 1)
                              }
                              disabled={item.quantity <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.product,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-16 text-center"
                              min="0"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer"
                              onClick={() =>
                                updateQuantity(item.product, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ৳{item.total.toLocaleString() || "0.00"}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => removeItem(item.product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-md bg-muted/50">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Original Amount
                </div>
                <div className="font-medium">
                  ৳{order?.amount.toLocaleString()}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm text-muted-foreground">New Total</div>
                <div className="text-lg font-semibold">
                  ৳{calculateOrderTotal().toLocaleString()}
                </div>
              </div>
            </div>

            {calculateOrderTotal() !== order?.amount && (
              <div className="p-3 border rounded-md bg-yellow-50 border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Badge
                    variant="outline"
                    className="text-yellow-600 border-yellow-600"
                  >
                    Total Changed
                  </Badge>
                  <span className="text-sm">
                    Difference: ৳
                    {Math.abs(
                      calculateOrderTotal() - (order?.amount || 0)
                    ).toLocaleString()}
                    {calculateOrderTotal() > (order?.amount || 0)
                      ? " increase"
                      : " decrease"}
                  </span>
                </div>
              </div>
            )}
          </div>

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
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Items"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
