import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

const nearbyOffices = [
  {
    id: 1,
    name: "CableSetGo - Central Branch",
    distance: "2.3 km",
    address: "123 Main Street, City Center",
    phone: "+91 98765 43210",
    hours: "9 AM - 6 PM",
  },
  {
    id: 2,
    name: "CableSetGo - North Branch",
    distance: "5.7 km",
    address: "456 North Avenue, Sector 12",
    phone: "+91 98765 43211",
    hours: "9 AM - 6 PM",
  },
  {
    id: 3,
    name: "CableSetGo - East Branch",
    distance: "8.1 km",
    address: "789 East Road, Block A",
    phone: "+91 98765 43212",
    hours: "9 AM - 6 PM",
  },
];

const Location = () => {
  const navigate = useNavigate();
  const [locationGranted, setLocationGranted] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
          toast.success("Location access granted! Finding nearby offices...");
        },
        () => {
          toast.info("Location access denied. Showing demo offices near you.");
          setLocationGranted(true);
        }
      );
    } else {
      toast.info("Geolocation not available. Showing demo offices.");
      setLocationGranted(true);
    }
  };

  const handleSelectOffice = (officeId: number) => {
    setSelectedOffice(officeId);
    toast.success("Office selected! Proceeding to payment.");
    setTimeout(() => {
      navigate("/payment");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Find Nearest Service Center</h1>
            <p className="text-muted-foreground">
              We'll help you find the closest CableSetGo office (within 25km)
            </p>
          </div>

          {!locationGranted ? (
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Enable Location Services</CardTitle>
                <CardDescription>
                  Allow us to access your location to find the nearest service centers and provide
                  faster installation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={requestLocation}>
                  <Navigation className="mr-2 h-4 w-4" />
                  Grant Location Access
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocationGranted(true)}
                >
                  Continue Without Location
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-center">
                  ✨ Installation guaranteed within <strong>30 hours</strong> of payment
                </p>
              </div>

              {nearbyOffices.map((office) => (
                <Card
                  key={office.id}
                  className={`transition-all hover:shadow-md cursor-pointer ${
                    selectedOffice === office.id ? "border-primary shadow-md" : ""
                  }`}
                  onClick={() => handleSelectOffice(office.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{office.name}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {office.distance} away
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{office.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="mt-8 text-center">
                <Button variant="ghost" onClick={() => navigate("/browse-plans")}>
                  Back to Plans
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
