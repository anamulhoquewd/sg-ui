import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer">
              How do you ensure the mangoes are fresh?
            </AccordionTrigger>
            <AccordionContent>
              We harvest our mangoes at the perfect ripeness and deliver them
              within 24-48 hours. Our cold chain logistics ensure that the
              fruits remain fresh until they reach your doorstep.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">
              What is the minimum order quantity?
            </AccordionTrigger>
            <AccordionContent>
              The minimum order quantity for mangoes is 5kg. You can increase
              the quantity in increments of 5kg.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">
              How long does delivery take?
            </AccordionTrigger>
            <AccordionContent>
              For customers within Dhaka, we deliver within 24 hours. For
              customers outside Dhaka, delivery typically takes 2-3 days
              depending on the location.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="cursor-pointer">
              Do you offer any discounts for bulk orders?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer discounts for orders above 20kg. Please contact our
              customer service for more information about bulk order pricing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="cursor-pointer">
              What if I receive damaged fruits?
            </AccordionTrigger>
            <AccordionContent>
              We have a 100% satisfaction guarantee. If you receive any damaged
              or unsatisfactory products, please contact us within 24 hours of
              delivery, and we will replace them or provide a refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
