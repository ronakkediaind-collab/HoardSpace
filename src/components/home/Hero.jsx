import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            India's #1 Outdoor Advertising Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Find the Perfect{" "}
            <span className="text-gradient">Hoarding Space</span>
            <br />
            for Your Brand
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with premium billboard locations, bus shelters, and digital
            screens across India's top cities. Book instantly with verified
            vendors.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                500+
              </p>
              <p className="text-muted-foreground text-sm">Hoardings Listed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                50+
              </p>
              <p className="text-muted-foreground text-sm">Cities Covered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                200+
              </p>
              <p className="text-muted-foreground text-sm">Trusted Vendors</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pt-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
