import React from "react";
import leathers from "../database/leathers";
import { useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
const Leather = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };
  const [search, setSearch] = useState(''); // For search input
  const [filteredDesigns, setFilteredDesigns] = useState(leathers); // Filtered designs

  // Filter designs based on the search input
  useEffect(() => {
    let tempDesigns = leathers;
    if (search) {
      tempDesigns = tempDesigns.filter((design) =>
        design.color.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDesigns(tempDesigns);
  }, [search]);

  return (
    <div className="max-w-7xl pt-20 mx-auto">
      <div className="px-16 ">
        <form
          className="mb-4 flex justify-start mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className=" w-full p-2 border-gray-400 border-2 rounded-md"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>

          </div>
          <button
            type="button"
            onClick={toggleOffCanvas}
            className="ml-4 inline-flex items-center justify-center rounded-md pr- text-gray-700"
          >
            Filter<FontAwesomeIcon icon={faFilter} />
            <span className="sr-only">Filter</span>
          </button>
        </form>

      </div>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={toggleOffCanvas}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />

          {/* Slide-in Sidebar */}
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full" /* Change to -translate-x-full for sliding out completely left */
          >
            <Dialog.Panel className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-6 pt-6 mt-14 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Menu</h2>
                <button onClick={toggleOffCanvas} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <div className="space-y-4">

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>



      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((product,x) => (
            <div key={x} className="group bg-white shadow-md rounded-lg overflow-hidden" onClick={window.scrollTo(0,0)}>
              <Link to={`/leather/${product.id}/${product.name}/${product.color}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-2 p-1 px-2 ml-1">
                  <h3 className="text-m sm:text-lg font-medium text-black inter">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-1 sm:flex justify-between mb-1 p-1 px-2 ml-1">
                  <p className="text-sm inter text-gray-900">
                    &#8358;{product.price}<span className="relative"><sup>2</sup></span>
                  </p>
                  <p className="text-sm inter mt-1 text-gray-900">
                    &#8358;{product.price1}
                  </p>
                </div>
                <button className="mt-2 text-white bg-black w-full inter py-2 hover:bg-blue-400">Add To Cart</button>
              </Link>
            </div>
          ))
        ) : (
          <div className=""><p className="mx-auto">No designs found.</p></div>
        )}
      </div>
    </div>
  );
};

export default Leather;
