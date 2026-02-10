export default function FeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {['Quality', 'Innovation', 'Reliability'].map((feature) => (
            <div key={feature} className="card p-8 text-center group">
              <div className="w-12 h-12 bg-gradient-bg rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-semibold mb-3 text-text">{feature}</h3>
              <p className=" text-white">
                Experienced and skilled professionals.
                Reliable, on-time delivery.
                Quality-driven solutions.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
