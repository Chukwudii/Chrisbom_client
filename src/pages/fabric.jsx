import React, { useState, useEffect } from "react";
import fabrics from "../database/fabrics";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Fabric = () => {
  function capitalizeWords(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState(fabrics);
  const categories = ["Leather", "Mat", "Velvet", "Towel Face"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Set number of items per page to 4

  const handleFilterButtonClick = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((el) => el !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  useEffect(() => {
    let tempDesigns = fabrics;
    if (selectedFilters.length > 0) {
      tempDesigns = tempDesigns.filter((product) =>
        selectedFilters.includes(capitalizeWords(product.category))
      );
    }
    if (search) {
      tempDesigns = tempDesigns.filter((product) =>
        product.color.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDesigns(tempDesigns);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [search, selectedFilters]);

  // Get the designs for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigns = filteredDesigns.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);

  return (
    <div className="max-w-7xl pt-24 mx-auto">
      <div className="px-16">
        <form
          className="mb-4 flex justify-start mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="w-full p-2 border-gray-400 border-2 rounded-md"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 inline-flex items-center justify-center rounded-md text-gray-700"
          >
            Filter
            <FontAwesomeIcon icon={faFilter} />
            <span className="sr-only">Filter</span>
          </button>
        </form>
      </div>

      {/* Filter Sidebar */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed right-0 top-0 h-full w-full bg-white shadow-lg p-5 pt-6 mt-14 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg inter font-semibold">Filter</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  {categories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFilterButtonClick(category)}
                      className={`btn inter w-full py-2 hover:bg-black rounded-lg mb-2 ${selectedFilters.includes(category) ? "bg-black text-white" : "bg-blue-500 text-white"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Display Products */}


      {currentDesigns.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {currentDesigns.map((product) => (
              <div key={product.id} className="group bg-white shadow-md rounded-lg overflow-hidden" onClick={window.scrollTo(0, 0)}>
                <Link to={`/fabric/${product.id}/${product.name}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-44 w-full object-cover object-center md:h-56 lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-2 p-1 px-2 ml-1">
                    <h3 className="text-m sm:text-lg font-medium text-black inter">{product.name}</h3>
                  </div>
                  <div className="mt-1 sm:flex justify-between mb-1 p-1 px-2 ml-1">
                    <p className="text-sm inter text-gray-900">
                      &#8358;{product.price}/yards
                    </p>
                  </div>
                  <button className="mt-2 text-white bg-black w-full inter py-2 hover:bg-blue-400">Add To Cart</button>
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 mb-4 space-x-2">
            {/* Previous Arrow */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Arrow */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>

        </>
      ) : (
        <div className="text-center py-6 md:py-36 ">
          <p className="mx-auto">Not found.</p>
        </div>
      )}



    </div>

  );
};

export default Fabric;
