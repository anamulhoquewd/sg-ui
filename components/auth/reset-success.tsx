import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import React from "react";

function SuccessComponent() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <h3 className="text-xl font-semibold">Password Reset Successful</h3>
          <p className="text-sm text-muted-foreground">
            Your password has been reset successfully. You will be redirected to
            the login page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default SuccessComponent;
