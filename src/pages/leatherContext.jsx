import { useParams, Link } from "react-router-dom";
import leathers from "../database/leathers";
import { ShopContext } from "../components/context/shopContext";
import { useContext, useState } from "react";
export default function LeatherContext() {
    const { id } = useParams();
    const product = leathers.find((item) => item.id === id);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [unit, setUnit] = useState('yard');
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

    // Filter related products by color
    const related = leathers.filter((item) => item.color === product.color);
    const { addToCart } = useContext(ShopContext);
    return (
        <>
            {/* Main Product4 Details */}
            <div className="px-4 w-full pt-24">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className=" md:w-1/2 lg:w-full rounded-lg shadow-lg"
                        />
                        <div className="px-3 md:ml-8 md:w-3/4 mt-6 md:mt-0 inter">
                            <h1 className="text-2xl sm:mt-8 text-gray-800 font-semibold">{product.name}</h1>
                            <p className="text-gray-700 text-lg font-normal mt-3">Color: {product.color}</p>
                            <p className="text-gray-700 text-md font-normal mt-3">Price (sqm): &#8358;{product.price}</p>
                            <p className="text-gray-700 text-md font-normal mt-3">Price (yards): &#8358;{product.price1}</p>
                            <div className="mt-3">
                                <form action="">
                                    <div>
                                        <input
                                            type="text"
                                            className="w-56 p-2 border-gray-300 border-1 rounded-md"
                                            placeholder=" Enter amount"
                                            value={selectedAmount}
                                            onChange={(e) => setSelectedAmount(e.target.value)}
                                        />
                                        <select
                                            className="ml-1 rounded-md"
                                            value={unit} // Bind the value to state
                                            onChange={(e) => setUnit(e.target.value)} // Update state on change
                                        >
                                            <option value="sqm">sqm</option>
                                            <option value="yard">yard</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <button onClick={() => addToCart(product.id, selectedAmount, unit)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
                <Link to="/" className="mt-4 inline-block text-blue-500">
                    Back to Home
                </Link>
            </div>

            {/* Related Products Section */}
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 py-2 px-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {related.length > 0 ? (
                    related.map((relatedProduct) => (
                        <div
                            onClick={window.scrollTo(0, 0)}
                            key={relatedProduct.id}
                            className="group bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <Link
                                to={`/leather/${relatedProduct.id}/${relatedProduct.name}/${relatedProduct.color}`}
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        alt={relatedProduct.imageAlt}
                                        src={relatedProduct.imageSrc}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-2 p-1 px-2 ml-1">
                                    <h3 className="text-m sm:text-lg font-medium text-black inter">
                                        {relatedProduct.name}
                                    </h3>
                                </div>
                                <div className="mt-1 sm:flex justify-between mb-1 p-1 px-2 ml-1">
                                    <p className="text-sm inter text-gray-900">
                                        &#8358;{relatedProduct.price}/yards
                                    </p>
                                </div>
                                <button className="mt-2 text-white bg-black w-full inter py-2 hover:bg-blue-400">
                                    Add To Cart
                                </button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No related products found for color: {product.color}</p>
                )}
            </div>
        </>
    );
}
