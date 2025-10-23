import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Truck, Package, Headphones } from "lucide-react";

export const CtaSection = () => {
  const features = [
    {
      icon: Clock,
      title: "24/7 Available",
      description:
        "Round-the-clock customer support and shopping experience. We're always here to help you find the perfect garment.",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description:
        "Free delivery within 7 days via Indian Post. Fast and reliable shipping across India with tracking.",
    },
    {
      icon: Package,
      title: "Express Delivery",
      description:
        "Premium fast delivery option available for urgent orders. Get your garments delivered in 2-3 days.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description:
        "Dedicated customer service team ready to assist with sizing, styling, and any queries you may have.",
    },
  ];

  return (
    <main className="py-10 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Why Choose Swagat Garments?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience premium quality garments with exceptional service and
            unbeatable delivery options across India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="rounded-2xl border transition ease-in-out hover:scale-101 active:scale-101 p-8 select-none"
              >
                <Icon className=" h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className=" text-xl font-semibold leading-0 ">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to upgrade your wardrobe?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our complete collection of premium garments crafted for
            style and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white">
              Shop the collection
            </Button>
            <Button size="lg" variant="outline">
              View all items
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
