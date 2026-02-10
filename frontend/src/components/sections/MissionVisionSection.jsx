export default function MissionVisionSection() {
  return (
    <section className=" bg-background 
">
      <div className="container m">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  ">
          {/* Mission */}
          <div className="text-center slide-up mt-10">
            <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-300">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To deliver innovative and exceptional solutions that empower businesses to thrive in the digital age. 
              We are committed to excellence, integrity, and customer satisfaction in every project we undertake.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center slide-up mt-10">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-300 ">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To be the global leader in providing cutting-edge technology solutions that transform businesses 
              and create sustainable value for our clients, partners, and communities worldwide.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 text-center  ">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-white">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  ">
            {[
              { title: 'Innovation', description: 'Embracing creativity and new ideas' },
              { title: 'Integrity', description: 'Building trust through transparency' },
              { title: 'Excellence', description: 'Delivering quality in everything we do' },
              { title: 'Collaboration', description: 'Working together for success' }
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold mb-2 text-primary">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
