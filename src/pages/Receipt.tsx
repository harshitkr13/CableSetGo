import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Receipt = () => {
  const navigate = useNavigate();
  const receiptNumber = `CSG${Date.now().toString().slice(-8)}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDownload = () => {
    toast.success("Receipt downloaded successfully!");
  };

  const handleEmail = () => {
    toast.success("Receipt sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your installation will be completed within 30 hours
            </p>
          </div>

          <Card className="shadow-lg mb-6">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex justify-between items-start">
                <div>
                  <div className="text-sm opacity-90 mb-1">Receipt Number</div>
                  <div className="text-2xl font-bold">{receiptNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-1">Date</div>
                  <div className="text-lg">{currentDate}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="font-semibold mb-3">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">Demo User</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium text-right max-w-xs">
                      123 Demo Street, City, 400001
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Plan Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">Premium Cable</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Center:</span>
                    <span className="font-medium">CableSetGo - Central Branch</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Installation ETA:</span>
                    <span className="font-medium">Within 30 hours</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan Amount</span>
                    <span>₹599</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Installation Charges</span>
                    <span>₹500</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (18%)</span>
                    <span>₹198</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-primary">₹1,297</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                <p className="text-center">
                  Our team will contact you shortly to schedule the installation. For any queries,
                  call our support at <strong>1800-XXX-XXXX</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button onClick={handleEmail} variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Email Receipt
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
