export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">About Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded in 2025, our company has been dedicated to providing exceptional services
              and solutions to clients worldwide.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              With a team of experienced professionals, we focus on innovation, quality, and
              customer satisfaction in everything we do.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to be the leading provider of solutions that drive success and
              create lasting value for our clients.
            </p>
          </div>
          <div className="  bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            {/* <img className="text-gray-600">About Us Image Placeholder</img> */}
            <img  className="  w-full h-full object-cover" src="https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg" alt="" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          {[
            { number: '150+', label: 'Happy students' },
          { number: '10+', label: 'school colabration' },
          { number: '50+', label: 'Projects Completed' }
            
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
