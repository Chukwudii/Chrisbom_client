import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Carousel, ModalFooter } from "flowbite-react"
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
// import './database/feedback.js'
export default function Feedback() {
    const [openModal, setOpenModal] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(false);

        var fname = document.getElementById("name");
        var fmessage = document.getElementById("message");
    };
const testimonials = [
    {
        quote: "I've been purchasing upholstery fabrics from [Your Company Name] for years. Their quality is unmatched, and their customer service is excellent.",
        author: "- John Smith, Interior Designer",
    },
    {
        quote: "The leather selection at [Your Company Name] is incredible. My clients love the variety and durability.",
        author: "- Emily Johnson, Furniture Maker",
    },
    {
        quote: "The fabric choices are endless! I always find the perfect match for my projects.",
        author: "- Michael Brown, Upholstery Specialist",
    },
    {
        quote: "Great service and fantastic materials! Highly recommended.",
        author: "- Sarah White, Home Decorator",
    },
];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <section className="bg-blue-100 mt-16  py-12">
            <div className="container21 mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">What Our Customers Say</h2>
                <div className='px-2'>
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <blockquote key={index} className="bg-white p-6 shadow-lg rounded-lg">
                                <p className="italic text-gray-600">{testimonial.quote}</p>
                                <cite className="block text-right mt-4 text-gray-800">{testimonial.author}</cite>
                            </blockquote>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="text-center"><button className="text-white bg-blue-500 px-6 py-1 mt-8 rounded-lg inter hover:bg-black" onClick={() => setOpenModal(true)}>Leave Review</button></div>

            <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header><h2 className="text-2xl inter font-semibold">Review</h2></Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <input className="rounded-lg" id="name" type="text" name="name" placeholder="Name" required />
                            <textarea className="rounded-lg" id="message" name="message" placeholder="Message" required></textarea>
                        </div>
                        <div className="flex">
                            <button type="submit" className="mt-4 px-4 inter text-white bg-blue-500 rounded-md hover:bg-black" onClick={() => handleSubmit()}>Submit</button>
                            <Button className="mt-4 ml-4 inter text-white rounded-md bg-gray-500" onClick={() => setOpenModal(false)}>Close</Button>
                        </div>
                    </form>
                </Modal.Body>
                {/* <ModalFooter>
                                 <button type="submit" className="mt-4 px-4 inter text-white bg-blue-500 rounded-md hover:bg-black" onClick={() => handleSubmit()}>Submit</button>
                                 <Button className="mt-4 ml-4 inter text-white rounded-md bg-gray-500" onClick={() => setOpenModal(false)}>Close</Button>
                             </ModalFooter> */}
            </Modal>
        </section >
    );
};

