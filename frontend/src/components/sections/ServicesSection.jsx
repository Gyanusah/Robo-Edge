export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web solutions built with cutting-edge technologies and modern frameworks.',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: '📱'
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services for modern businesses.',
      icon: '☁️'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      description: 'Beautiful and user-centric design solutions that delight users.',
      icon: '🎨'
    },
    {
      id: 5,
      title: 'Consulting',
      description: 'Strategic business consulting to drive growth and innovation.',
      icon: '🚀'
    },
    {
      id: 6,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance services.',
      icon: '🛠️'
    }
  ]

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-4">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to meet your business needs and exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="card group text-center slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-300 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed group-hover:text-text transition-colors">
                {service.description}
              </p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="btn-secondary text-sm"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="btn-primary text-lg px-8"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}
