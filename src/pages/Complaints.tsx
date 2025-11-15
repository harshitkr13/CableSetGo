import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Complaints = () => {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    category: "",
    subject: "",
    description: "",
    customerName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `TKT${Date.now().toString().slice(-6)}`;
    toast.success(`Complaint registered! Ticket ID: ${ticketId}`);
    setComplaint({
      category: "",
      subject: "",
      description: "",
      customerName: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Register a Complaint</h1>
            <p className="text-muted-foreground">
              We're here to help. Submit your issue and we'll resolve it quickly
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>
                Fill in the details below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Your Name *</Label>
                    <Input
                      id="customerName"
                      placeholder="Full name"
                      value={complaint.customerName}
                      onChange={(e) =>
                        setComplaint({ ...complaint, customerName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={complaint.phone}
                      onChange={(e) => setComplaint({ ...complaint, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select
                    value={complaint.category}
                    onValueChange={(value) => setComplaint({ ...complaint, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Service Disruption</SelectItem>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                      <SelectItem value="installation">Installation Problem</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="quality">Quality Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of the issue"
                    value={complaint.subject}
                    onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide as much detail as possible about your issue"
                    rows={6}
                    value={complaint.description}
                    onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                    required
                  />
                </div>

                <div className="bg-muted/50 border rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold mb-1">Priority Support</div>
                    <div className="text-muted-foreground">
                      Service disruption complaints are given highest priority and addressed within 4
                      hours
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Submit Complaint
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Track Existing Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter your ticket ID (e.g., TKT123456)" />
                <Button variant="outline">Track</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
