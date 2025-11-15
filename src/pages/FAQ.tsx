import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "How long does installation take?",
    answer:
      "Once payment is confirmed, our technicians will complete the installation within 30 hours. You'll receive a call to schedule a convenient time slot.",
  },
  {
    question: "What documents do I need for installation?",
    answer:
      "You'll need a valid ID proof (Aadhaar, PAN, or Driver's License) and address proof. Our technician will verify these during installation.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime. Changes will be effective from the next billing cycle. Contact our support team for assistance.",
  },
  {
    question: "What if I face technical issues?",
    answer:
      "We provide 24/7 customer support. You can call our helpline, raise a complaint through the app, or chat with our support team for immediate assistance.",
  },
  {
    question: "Is there a contract period?",
    answer:
      "No lock-in period! You can cancel anytime with a 30-day notice. However, annual plans offer better discounts.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including Credit/Debit cards, UPI, Net Banking, and digital wallets.",
  },
  {
    question: "Do you provide equipment?",
    answer:
      "Yes, all necessary equipment including set-top boxes, routers, and cables are provided free of cost with your plan.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "If we're unable to provide service in your area, we'll issue a full refund within 7 business days. For cancellations, pro-rated refunds apply based on remaining service period.",
  },
];

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
