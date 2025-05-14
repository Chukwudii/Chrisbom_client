import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../components/context/shopContext";
import { useContext, useState, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
export default function LeatherContext() {
    const { id } = useParams();
    const { addToCart, allproducts, addtowishlist, wish } = useContext(ShopContext);
    const product = allproducts.find((item) => item.id === id);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [unit, setUnit] = useState('yard');
    const [showToast, setShowToast] = useState(false);
    const [Amount, setAmount] = useState(false);
    const [Wishlist, setWishlist] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [Wish, setWish] = useState(wish);
    if (!product) {
        return (
            <div className="pt-20 text-center">
                <h1>Product Not Found</h1>
                <Link to="/" className="text-blue-500">
                    Back to Home
                </Link>
            </div>
        );
    }

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };


    function toast() {
        if (selectedAmount > 0) {

            setShowToast(true);
        }
        else {
            setAmount(true);
        }
        setSelectedAmount('');
        // Auto-hide after 3 seconds
        setTimeout(() => {
            setShowToast(false);
            setAmount(false);
        }, 3000);
        console.log("Added")
    };
    function wishlist_toast() {
        setWishlist(true);
        setTimeout(() => {
            setWishlist(false);
        }, 3000);
    }
    const related = allproducts.filter((item) => item.category === product.category);

    return (
        <>
            {showToast && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100 z-50">
                    Item added to cart!
                </div>
            )}
            {Amount && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100 z-50">
                    Input a valid quantity
                </div>
            )}
            {Wishlist && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-100 z-50">
                    {Wish}
                </div>
            )}
            <div className="px-4">
                <div className="flex items-center justify-center ">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:px-12 lg:px-12">
                            <img
                                src={product.image}
                                alt={product.imageAlt}
                                className="w-96 h-64 md:w-72 md:h-72 lg:w-96 lg:h-80 rounded-lg shadow-lg"
                                onClick={() => openModal(product)}
                            />
                        </div>
                        <div className="px-3 mt-6 sm:mt-0 md:mt-0 inter">
                            <h1 className="text-2xl sm:mt-8 text-gray-800 font-semibold">{product.name}</h1>
                            <p className="text-gray-700 text-lg font-normal mt-3">Color: {product.color}</p>
                            <p className="text-gray-700 text-md font-normal mt-3">Price (sqm): &#8358;{product.price_sqm.toLocaleString()}</p>
                            <p className="text-gray-700 text-md font-normal mt-3">Price (yard): &#8358;{product.price_yard.toLocaleString()}</p>
                            <div className="mt-3">
                                <form action="">
                                    <div>
                                        <input
                                            type="text"
                                            className="w-44 sm:w-56 p-2 border-gray-300 border-1 rounded-md"
                                            placeholder=" Enter Quantity"
                                            value={selectedAmount}
                                            onChange={(e) => setSelectedAmount(e.target.value)}
                                        />
                                        <select
                                            className="ml-3 border-gray-300 rounded-md"
                                            value={unit} // Bind the value to state
                                            onChange={(e) => setUnit(e.target.value)} // Update state on change
                                        >
                                            <option value="sqm">sqm</option>
                                            <option value="yard">yard</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div onClick={() => window.scrollTo(0, 0)}>
                                <button onClick={() => {
                                    toast();
                                    addToCart(product.id, selectedAmount, unit);
                                }} className="mt-4 px-4 mr-6 py-2 text-white rounded-lg bg-gray-800 hover:bg-blue-700">
                                    Add To Cart
                                </button>
                                <button onClick={() => {
                                    wishlist_toast();
                                    addtowishlist(product.id)
                                }} className="mt-4 px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-blue-700">
                                    Add To Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/" className="mt-4 inline-block text-blue-500">
                    Back to Home
                </Link>
            </div>

            {/* Related Products Section */}
            <div className="mt-6 md:px-4 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                {related.length > 0 ? (
                    related.map((relatedProduct, index) => (
                        <div key={index} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
                            <div className=" overflow-hidden bg-gray-200">
                                <img
                                    alt={relatedProduct.name}
                                    src={relatedProduct.image}
                                    className="w-full h-40 md:h-56 object-cover"
                                    onClick={() => openModal(relatedProduct)}
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
                                <h3 className="text-m font-medium text-black">{relatedProduct.name}</h3>
                                <div className="sm:flex justify-between text-gray-700 text-md font-normal mt-1 mb-1">
                                    <p>&#8358;{relatedProduct.price_sqm.toLocaleString()}/sqm</p>
                                    <p>&#8358;{relatedProduct.price_yard.toLocaleString()}/yard</p>
                                </div>
                                <Link to={`/fabric/${relatedProduct.id}/${relatedProduct.name}`}>
                                    <button className="mt-2 text-white  w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                                        Add To Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 col-span-full">
                        <p>No Related Products.</p>
                    </div>
                )}
            </div>

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
        </>
    );
}
