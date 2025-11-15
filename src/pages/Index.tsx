import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tv, Wifi, MapPin, Clock, Shield, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: Tv,
      title: "Premium Content",
      description: "400+ HD & 4K channels with premium content packages",
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Up to 200 Mbps fiber-optic broadband with unlimited data",
    },
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Service available within 25km radius from any center",
    },
    {
      icon: Clock,
      title: "Quick Installation",
      description: "Guaranteed installation within 30 hours of payment",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "99.9% uptime with enterprise-grade security",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-primary">CableSetGo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience premium cable TV and lightning-fast internet with seamless installation
            in just 30 hours. Your entertainment, our priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/browse-plans">
              <Button size="lg" className="text-lg px-8">
                Browse Plans
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CableSetGo?</h2>
          <p className="text-muted-foreground text-lg">
            We deliver more than just connectivity - we deliver excellence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto shadow-lg bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying seamless entertainment and
              connectivity. Sign up now and get your service installed within 30 hours!
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Sign Up Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Tv className="h-6 w-6 text-primary" />
              <span>CableSetGo</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/complaints" className="hover:text-primary transition-colors">
                Complaints
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CableSetGo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
