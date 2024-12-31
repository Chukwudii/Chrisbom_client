import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import '../styles/contact.css';
const Contact = () => {
  return (
    <div className='pt-28 sm:px-6'>
      <div className='px-6'>
        <div className=' flex items-center justify-center '>
          <div class="w-full max-w-sm bg-white">
            <form>
              <h3 className='montserrat text-3xl font-semibold mb-6 text-center montserrat'>Get in touch</h3>
              <div className='lex justify-between'>
                <div className="mb-6">

                  <input
                    type="text"
                    className="w-full border-gray-200 border-2 rounded-md"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-6">

                  <input
                    type="text"
                    className="w-full border-gray-200 border-2 rounded-md"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className='mb-6'>

                <input type="tel" className="w-full border-gray-200 border-2 rounded-md" placeholder='Phone number' />
              </div>
              <div className='mb-6'>
                <textarea name="" id="" className="w-full border-gray-200 border-2 rounded-md" placeholder='Message'></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="w-full py-2 px-4 bg-black hover:bg-blue-700 text-white rounded-md inter">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='p-4 pt-8'>

          <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

              {/* Location */}
              <div className="flex flex-col items-center inter">
                <FontAwesomeIcon style={{ color: '#EBC38D', fontSize: '35px' }} icon={faMapMarkerAlt} className="FontAwesomeIcon  text-5xl text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Location</h3>
                <p>10 Ladipo Street, Mushin Lagos</p>
                <p>22 Ladipo Street, Mushin Lagos</p>
                <p>30 Oluwole Street, Mushin Lagos</p>
              </div>

              {/* Phones */}
              <div className="flex flex-col items-center inter">
                <FontAwesomeIcon style={{ color: '#EBC38D', fontSize: '35px' }} icon={faPhone} className="FontAwesomeIcon text-5xl text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Phones</h3>
                <p>+234 802 2262 132</p>
                <p>+234 803 3181 692</p>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center inter">
                <FontAwesomeIcon style={{ color: '#EBC38D', fontSize: '35px' }} icon={faEnvelope} className="FontAwesomeIcon text-5xl text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Email</h3>
                <p>cuchrisbom@gmail.com</p>
                <p>chrisbom456@gmail.com</p>
              </div>

              {/* Working hours */}
              <div className="flex flex-col items-center inter">
                <FontAwesomeIcon style={{ color: '#EBC38D', fontSize: '35px' }} icon={faClock} className="FontAwesomeIcon text-5xl text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2 montserrat">Working hours</h3>
                <p>Monday - Saturday</p>
                <p>7:00 AM - 6:00 PM</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Contact