import React, { useState, useEffect, useContext, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { ShopContext } from "../components/context/shopContext";

const Leather = () => {
  const { allproducts, wish, addtowishlist } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Wishlist, setWishlist] = useState(false);
  const [Wish, setWish] = useState(wish);
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  function wishlist_toast() {
    setWishlist(true);
    setTimeout(() => {
      setWishlist(false);
    }, 3000);
  }

  const [search, setSearch] = useState('');
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    let tempDesigns = allproducts?.filter(product => product.category === "Leather") || [];
    if (search) {
      tempDesigns = tempDesigns.filter((design) =>
        design.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredDesigns(tempDesigns);
    setCurrentPage(1);
  }, [search, allproducts]);

  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigns = filteredDesigns.slice(startIndex, endIndex);

  return (
    <div className="mx-auto">
      {Wishlist && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100 z-50">
          {Wish}
        </div>
      )}
      <div className="px-4 sm:px-8 md:px-8">
        <form className="mb-6 grid grid-cols-1" onSubmit={(e) => e.preventDefault()}>
          <div className="relative col-span-2">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or color"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      <div className="mt-6 md:px-4 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {currentDesigns.length > 0 ? (
          currentDesigns.map((product, index) => (
            <div key={index} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
              <div className=" overflow-hidden bg-gray-200">
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-full h-40 md:h-56 object-cover"
                  onClick={() => openModal(product)}
                />
                <button
                  onClick={() => {
                    wishlist_toast();
                    addtowishlist(product.id)
                  }}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-105 transition"
                  aria-label="Add to Wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                </button>
              </div>
              <div className="mt-2 p-2">
                <h3 className="text-m font-medium text-black">{product.name}</h3>
              </div>
              <div className="sm:flex justify-between text-gray-700 text-md font-normalmt-1 mb-1 px-2">
                <p>&#8358;{product.price_sqm.toLocaleString()}/sqm</p>
                <p>&#8358;{product.price_yard.toLocaleString()}/yard</p>
              </div>
              <div className="p-2">
                <Link to={`/leather/${product.id}/${product.name}`}>
                  <button className="mt-1 text-white w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                    Add To Cart
                  </button>
                </Link>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-6 col-span-full">
            <p>Not found.</p>
          </div>
        )}
      </div>

      {filteredDesigns.length > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"}`} disabled={currentPage === 1}>
            &larr; Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {index + 1}
            </button>
          ))}

          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"}`} disabled={currentPage === totalPages}>
            Next &rarr;
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
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

export default Leather;
