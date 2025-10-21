export function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Garment Styles",
    },
    {
      number: "10K+",
      label: "Units Shipped",
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <section className="bg-card py-12 sm:py-16 lg:py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center  text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
