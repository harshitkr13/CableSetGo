import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Wifi, Tv, MapPin } from "lucide-react";
import { toast } from "sonner";

const plans = {
  cable: [
    {
      id: 1,
      name: "Basic Cable",
      price: 299,
      channels: 100,
      features: ["SD Quality", "Free Set-Top Box", "24/7 Support"],
      popular: false,
    },
    {
      id: 2,
      name: "Premium Cable",
      price: 599,
      channels: 250,
      features: ["HD Quality", "Free HD Set-Top Box", "Recording Feature", "24/7 Support"],
      popular: true,
    },
    {
      id: 3,
      name: "Ultimate Cable",
      price: 899,
      channels: 400,
      features: [
        "4K Quality",
        "Free 4K Set-Top Box",
        "Recording Feature",
        "Premium Channels",
        "24/7 Priority Support",
      ],
      popular: false,
    },
  ],
  internet: [
    {
      id: 4,
      name: "Basic Internet",
      price: 399,
      speed: "50 Mbps",
      features: ["Unlimited Data", "Free Router", "24/7 Support"],
      popular: false,
    },
    {
      id: 5,
      name: "Premium Internet",
      price: 699,
      speed: "100 Mbps",
      features: ["Unlimited Data", "Free Premium Router", "Static IP", "24/7 Support"],
      popular: true,
    },
    {
      id: 6,
      name: "Ultra Internet",
      price: 1199,
      speed: "200 Mbps",
      features: [
        "Unlimited Data",
        "Free Wi-Fi 6 Router",
        "Static IP",
        "Priority Support",
        "Free Installation",
      ],
      popular: false,
    },
  ],
  combo: [
    {
      id: 7,
      name: "Smart Combo",
      price: 799,
      details: "Basic Cable + Basic Internet",
      features: ["100 Channels", "50 Mbps", "Free Equipment", "Save ₹200/month"],
      popular: false,
    },
    {
      id: 8,
      name: "Super Combo",
      price: 1199,
      details: "Premium Cable + Premium Internet",
      features: ["250 Channels", "100 Mbps", "HD Quality", "Save ₹300/month"],
      popular: true,
    },
    {
      id: 9,
      name: "Ultimate Combo",
      price: 1699,
      details: "Ultimate Cable + Ultra Internet",
      features: ["400 Channels", "200 Mbps", "4K Quality", "Save ₹500/month"],
      popular: false,
    },
  ],
};

const BrowsePlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleSelectPlan = (planId: number) => {
    setSelectedPlan(planId);
    toast.success("Plan selected! Proceeding to location services");
    setTimeout(() => {
      navigate("/location");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Choose Your Perfect Plan</h1>
          <p className="text-muted-foreground">
            Select from our range of cable, internet, and combo packages
          </p>
        </div>

        <Tabs defaultValue="combo" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cable" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              Cable TV
            </TabsTrigger>
            <TabsTrigger value="internet" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Internet
            </TabsTrigger>
            <TabsTrigger value="combo" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Combo Packs
            </TabsTrigger>
          </TabsList>

          {Object.entries(plans).map(([category, categoryPlans]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {categoryPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative transition-all hover:shadow-lg ${
                      plan.popular ? "border-primary shadow-md" : ""
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>
                        {"channels" in plan && `${plan.channels}+ Channels`}
                        {"speed" in plan && plan.speed}
                        {"details" in plan && plan.details}
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Select Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowsePlans;
