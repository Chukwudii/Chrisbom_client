import React from 'react'
import { FaLeaf, FaCouch, FaUsers, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/about.css'
const About = () => {
  return (
    <div className="pt-28">
      {/* Company Overview Section */}
      <section className="container mx-auto px-6 mb-12">
        <h3 className="text-3xl font-semibold mb-6 text-center">Who We Are</h3>
        <p className="text-lg text-gray-700 leading-8 text-center max-w-3xl mx-auto">
          Welcome to <strong>C.U CHRISBOM INT'L</strong>, your trusted source for premium upholstery leather and fabric materials.
          Since our founding in [Year], we’ve been committed to providing high-quality, durable, and stylish materials for residential
          and commercial upholstery projects. Our mission is to help you transform your spaces with the finest upholstery solutions.
        </p>
      </section>

      {/* Our Mission Section with Background */}
      <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-6 text-center">Our Mission</h3>
          <p className="text-lg text-gray-800 leading-8 text-center max-w-3xl mx-auto">
            At <strong>C.U CHRISBOM INT'L</strong>, our mission is to provide top-quality upholstery leather and fabrics that blend beauty with durability.
            We strive for excellence in craftsmanship and innovation to meet the needs of both residential and commercial customers.
          </p>
        </div>
      </section>

      {/* Products Section with Cards */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-semibold mb-6 text-center">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaCouch className="text-blue-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Leather Upholstery</h3>
            <p className="text-gray-600">
              Premium leather hides for furniture, automotive interiors, and custom projects. Long-lasting, durable, and luxurious.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaLeaf className="text-green-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Eco-Friendly Fabrics</h3>
            <p className="text-gray-600">
              Sustainable, eco-conscious fabrics that minimize environmental impact without compromising on style or durability.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaCouch className="text-yellow-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Patterned Fabrics</h3>
            <p className="text-gray-600">
              A wide variety of patterns, textures, and colors to choose from for your home or commercial upholstery projects.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaLeaf className="text-red-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
            <p className="text-gray-600">
              Tailored upholstery solutions for your specific needs. Let us help you design the perfect material for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability and Ethics Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-6 text-center">Sustainability & Ethics</h3>
          <p className="text-lg text-gray-700 leading-8 text-center max-w-3xl mx-auto">
            We are deeply committed to ethical sourcing and sustainability. All of our leather products come from responsible suppliers,
            ensuring that the tanning process minimizes environmental impact. Our fabrics are sourced from manufacturers who prioritize
            eco-friendly production methods and sustainable practices.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 text-center">
        <h3 className="text-3xl font-semibold mb-6">Get in Touch</h3>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're looking to upgrade your furniture or need bulk materials, we're here to help.
        </p>
        <div className="flex justify-center gap-6">
          <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Contact Us
          </a>
          <a href="/products" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300">
            Browse Products
          </a>
        </div>
      </section>
    </div>
  )
}

export default About