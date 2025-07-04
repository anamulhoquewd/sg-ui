import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

interface Props {
  subtotal: number;
  shippingMethod: string;
  setShippingMethod: (shippingMethod: string) => void;
  total: number;
}

export function OrderSummary({
  subtotal,
  shippingMethod,
  setShippingMethod,
  total,
}: Props) {
  return (
    <div>
      <Card className="sticky top-4">
        <CardHeader className="border-b">
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="space-y-4">
              <Label>Shipping</Label>
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="inside-dhaka"
                    id="inside-dhaka"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="inside-dhaka"
                    className="flex justify-between w-full cursor-pointer"
                  >
                    <span>Inside Dhaka</span>
                    <span>$70</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="outside-dhaka"
                    id="outside-dhaka"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="outside-dhaka"
                    className="flex justify-between w-full cursor-pointer"
                  >
                    <span>Outside Dhaka</span>
                    <span>$150</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary hover:bg-primary/90" asChild>
            <Link href={`/checkout?shipping-method=${shippingMethod}`}>
              Proceed to Checkout
            </Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Shipping & taxes calculated at checkout
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrderSummary;
