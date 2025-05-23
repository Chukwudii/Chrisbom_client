import React, { useState, useEffect, useContext, Fragment } from "react";
import { ShopContext } from "../components/context/shopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
const Fabric = () => {
  const { allproducts, addtowishlist } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  useEffect(() => {
    let tempDesigns = allproducts?.filter(product => product.category === "Fabric") || [];

    // Filter by search (name or color)
    if (search) {
      tempDesigns = tempDesigns.filter((product) =>
        (product.name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      tempDesigns = tempDesigns.filter((product) => {
        const price = product.price_yard;
        if (max) return price >= Number(min) && price <= Number(max);
        return price >= Number(min);
      });
    }

    // Filter by fabric type
    if (fabricType) {
      tempDesigns = tempDesigns.filter(
        (product) =>
          product.type &&
          product.type.toLowerCase() === fabricType.toLowerCase()
      );
    }

    setFilteredDesigns(tempDesigns);
    setCurrentPage(1);
  }, [search, priceRange, fabricType, allproducts]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigns = filteredDesigns.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-3 sm:px-8 md:px-8">
        <form
          className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Search Input */}
          <div className="relative col-span-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or color"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="0-1000">₦0 - ₦1,000</option>
              <option value="1000-3000">₦1,000 - ₦3,000</option>
              <option value="3000-5000">₦3,000 - ₦5,000</option>
              <option value="5000">₦5,000+</option>
            </select>
          </div>

          {/* Fabric Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              onChange={(e) => setFabricType(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Cotton">Cotton</option>
              <option value="Velvet">Velvet</option>
              <option value="Linen">Linen</option>
              <option value="Silk">Silk</option>
              <option value="Wool">Wool</option>
            </select>
          </div>
        </form>
      </div>

      {/* Product Display */}

      <div className="mt-6 px-3 md:px-8 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {currentDesigns.length > 0 ? (
          currentDesigns.map((product, index) => (
            <div key={index} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
              <div className=" overflow-hidden bg-gray-200">
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-full h-40 sm:h-56 object-cover"
                  onClick={() => openModal(product)}
                />
                <button
                  onClick={() => {
                    addtowishlist(product.id)
                  }}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-105 transition"
                  aria-label="Add to Wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                </button>
              </div>
              <div className="mt-2 p-2">
                <h3 className="text-md font-medium text-black">{product.name}</h3>
                <div className="flex justify-between text-gray-700 text-md font-normal mt-1 mb-1">
                  <p>&#8358;{product.price_yard.toLocaleString()}/yard</p>
                </div>
                <Link to={`/fabric/${product.id}/${product.name}`}>
                  <button className="mt-2 text-white  w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                    Add To Cart
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 col-span-full">
            <p>No Products.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredDesigns.length > 0 && (
        <div className="flex justify-center mt-8 mb-8 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      )}

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className=" rounded-lg max-w-md lg:max-w-xl w-full shadow-xl">
              <div className="flex justify-end items-center mb-4">
                {/* <Dialog.Title className="text-lg font-medium">{selectedProduct?.name}</Dialog.Title> */}
                <XMarkIcon onClick={() => setIsOpen(false)} className="w-12 h-8 cursor-pointer text-white" />
              </div>
              {selectedProduct && (
                <>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 md:h-96 object-cover rounded" />
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Fabric;
