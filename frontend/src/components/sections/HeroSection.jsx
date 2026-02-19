import React, { useState, useRef } from 'react'
import Modal from '../Modal'
import CourseForm from '../CourseForm'

export default function HeroSection() {
  const videoRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleHover = (hovering) => {
    if (videoRef.current) {
      if (hovering) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const openCourseForm = () => {
    setIsModalOpen(true)
  }

  const closeCourseForm = () => {
    setIsModalOpen(false)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => handleHover(false)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/60"></div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className=" text-gray-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600
">
              Robo Edge
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Delivering excellence and innovation to transform your business with cutting-edge solutions and exceptional service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="px-8 py-3 rounded-lg font-semibold text-white bg-brand hover:bg-brandDark transition shadow-md border border-brand/60"
            >
              Our Services
            </a>

            <button
              onClick={openCourseForm}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition shadow-md border border-white/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Course Form Modal */}
      <Modal isOpen={isModalOpen} onClose={closeCourseForm}>
        <CourseForm onClose={closeCourseForm} />
      </Modal>
    </section>
  )
}
