import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Card() {
    const [collections, setCollections] = useState([]);
    const [leathercollections, setleatherCollections] = useState([]);
    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Fetch both fabric and leather collections on component mount
        fetch(`${baseURL}/fabriccollections`)
            .then((response) => response.json())
            .then((data) => setCollections(data));

        fetch(`${baseURL}/leathercollections`)
            .then((response) => response.json())
            .then((data) => setleatherCollections(data));
    }, []);

    // Show up to 4 items; fallback to empty if not enough data
    const currentFabrics = collections.length > 0 ? collections.slice(0, 4) : [];
    const currentLeathers = leathercollections.length > 0 ? leathercollections.slice(0, 4) : [];

    return (
        <>
            {/* LEATHER SECTION */}
            <div className="bg-white md:px-4">
                <div className="mx-auto max-w-7xl lg:max-w-7xl">
                    <div className="flex justify-center md:justify-start px-3">
                        <h3 className="text-lg  font-semibold tracking-normal text-gray-800  sm:text-xl inter">
                            Upholstery Leather Samples
                        </h3>
                        <Link onClick={() => window.scrollTo(0, 0)}
                            className="text-md ml-auto mt- hidden md:inline font-semibold tracking-normal text-gray-700 sm:text-1.5xl inter hover:underline underline-offset-4 decoration-amber-500 decoration-2"
                            to={"/upholstery_leather"}
                        >
                            Shop Now <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    <div className="mt-6 px-3 md:px-4 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {currentLeathers.length > 0 ? (
                            currentLeathers.map((product, index) => (
                                <div key={index} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
                                    <div className=" overflow-hidden bg-gray-200">
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            className="w-full h-40 sm:h-52 object-cover"
                                            onClick={() => openModal(product)} jkl
                                        />
                                    </div>
                                    <div className="mt-2 p-2">
                                        <h3 className="text-lg font-medium text-black">{product.name}</h3>
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

                    {/* Mobile button */}
                    <div onClick={() => window.scrollTo(0, 0)} className="text-center py-6 md:hidden">
                        <button className="bg-gray-800 px-6 py-1 rounded-lg hover:bg-blue-700">
                            <Link className="text-white inter" to={"/upholstery_leather"}>
                                Shop Now <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* FABRIC SECTION */}
            <div className="bg-white md:px-4">
                <div className="mx-auto max-w-7xl py-2 sm:py-12 lg:max-w-7xl">
                    <div className="flex justify-center md:justify-start px-3">
                        <h3 className="text-lg font-semibold tracking-normal text-gray-800 sm:text-xl inter">
                            Upholstery Fabric Samples
                        </h3>
                        <Link onClick={() => window.scrollTo(0, 0)} className="text-md ml-auto mt-2 hidden md:inline font-semibold tracking-normal text-gray-700 sm:text-1.5xl inter hover:underline underline-offset-4 decoration-amber-500 decoration-2"
                            to={"/upholstery_fabric"}
                        >
                            Shop Now <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>


                    <div className="mt-6 px-3 md:px-4 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {currentFabrics.length > 0 ? (
                            currentFabrics.map((product, index) => (
                                <div key={index} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
                                    <div className=" overflow-hidden bg-gray-200">
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            className="w-full h-40 sm:h-52 object-cover"
                                            onClick={() => openModal(product)}
                                        />
                                    </div>
                                    <div className="mt-2 p-2">
                                        <h3 className="text-lg font-medium text-black">{product.name}</h3>
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

                    {/* Mobile button */}
                    <div onClick={() => window.scrollTo(0, 0)} className="text-center py-6 md:hidden">
                        <button className="bg-gray-800 px-6 py-1 hover:bg-blue-700 rounded-lg">
                            <Link className="text-white inter" to={"/upholstery_fabric"}>
                                Shop Now <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
