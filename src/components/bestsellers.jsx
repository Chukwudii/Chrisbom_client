import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Bestsellers() {
    const [collections, setCollections] = useState([]);
    const baseURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetch(`${baseURL}/newcollections`)
            .then((response) => response.json())
            .then((data) => setCollections(data))
    })

    return (
        <div className="bg-white md:px-4">
            <div className="mx-auto max-w-7xl ">
                <h3 className="text-lg text-center font-semibold tracking-normal text-gray-800 sm:text-xl inter">New Collections</h3>

                <div className="mt-6 px-3 md:px-4 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">

                    {collections.map((product) => (

                        <div key={product.id} className="group bg-white shadow-xl rounded-lg overflow-hidden flex flex-col relative cursor-pointer">
                            <div className=" overflow-hidden bg-gray-200">
                                <img
                                    alt={product.name}
                                    src={product.image}
                                    className="w-full h-40 sm:h-56 object-cover"
                                    onClick={() => openModal(product)}
                                />
                            </div>
                            <div className="mt-2 p-2">
                                <h3 className="text-md font-medium text-black">{product.name}</h3>
                                {
                                    product.category === 'Fabric' ?
                                        (<div>
                                            <div className="flex justify-between text-gray-700 text-md font-normal mt-1 mb-1">
                                                <p>&#8358;{product.price_yard.toLocaleString()}/yard</p>
                                            </div>
                                            <Link onClick={() => window.scrollTo(0, 0)} to={`/fabric/${product.id}/${product.name}`}>
                                                <button className="mt-2 text-white  w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                                                    Add To Cart
                                                </button>
                                            </Link>
                                        </div>) :
                                        (
                                            <div>
                                                <div className="sm:flex justify-between text-gray-700 text-md font-normal mt-1 mb-1">
                                                    <p>&#8358;{product.price_sqm.toLocaleString()}/sqm</p>
                                                    <p>&#8358;{product.price_yard.toLocaleString()}/yard</p>
                                                </div>
                                                <div onClick={() => window.scrollTo(0, 0)}>
                                                    <Link onClick={() => window.scrollTo(0, 0)} to={`/leather/${product.id}/${product.name}`}>
                                                        <button className="mt-2 text-white  w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                                                            Add To Cart
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>


                        </div>

                    ))}

                </div>
            </div>

        </div>

    )
}