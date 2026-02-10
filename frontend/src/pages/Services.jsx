export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web solutions built with cutting-edge technologies.'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications.'
    },
    {
      id: 3,
      title: 'Consulting',
      description: 'Strategic business consulting to drive growth.'
    },
    {
      id: 4,
      title: 'Design',
      description: 'Beautiful and user-centric design solutions.'
    },
    {
      id: 5,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services.'
    },
    {
      id: 6,
      title: 'Support & Maintenance',
      description: '24/7 support and ongoing maintenance services.'
    }
  ]

  return (
    <div className="bg-gray-50 section-padding">
      <div className="container">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-4">Our Services</h1>
        <p className="text-center text-white mb-12 max-w-2xl mx-auto">
          Comprehensive solutions tailored to meet your business needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary rounded-full mb-4"></div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
