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

export interface ShowItemsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: { _id: string; items: IOrderItem[]; amount: number };
}

export default function ShowItems({
  open,
  onOpenChange,
  order,
}: ShowItemsProps) {
  const [items, setItems] = useState<IOrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(order?.items || []);
  }, [order]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>View Items</DialogTitle>
          <DialogDescription>
            View items in order {order?._id}
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
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
                    <TableCell className="text-right font-medium">
                      ৳{item?.price.toLocaleString() || "0.00"}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {item.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{item.total.toLocaleString() || "0.00"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
