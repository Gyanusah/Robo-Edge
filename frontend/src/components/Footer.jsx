import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
             Robo Edge
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Building excellence together with innovation, quality, and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              More
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/testimonials" className="text-slate-400 hover:text-white transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              Email: roboedge.edu@gmail.com
            </p>
            <p className="text-sm text-slate-400">
              Phone: 9800000000
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-4 text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Robo Edge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
