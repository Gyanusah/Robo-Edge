
import { Link } from "react-router-dom";
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import GallerySection from '../components/sections/GallerySection';


export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative text-white section-padding overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Welcome to Our Company
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 max-w-xl">
                Delivering excellence and innovation to transform your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/services"
                  className="px-8 py-3 rounded-lg bg-white/20 border border-white text-white font-semibold hover:bg-white/40 transition"
                >
                  Explore Services
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/20 transition"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-padding bg-gray-500">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Quality", "Innovation", "Reliability"].map((feature) => (
              <div
                key={feature}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature}
                </h3>
                <p className="text-gray-600 ">
                  We are committed to delivering high-quality solutions that combine innovation, reliability, and customer satisfaction.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have transformed their
            business.
          </p>

          <Link
            to="/contact"
            className="px-10 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
          >
            Contact Us Today
             
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* GALLERY SECTION */}
      <GallerySection />

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
