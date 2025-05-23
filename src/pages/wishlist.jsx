import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseURL = import.meta.env.VITE_API_URL;

    const fetchWishlist = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;

        try {
            const res = await fetch(`${baseURL}/fetchwishlist`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                },
            });

            const data = await res.json();
            if (data.success) {
                setWishlist(data.wishlist);
            } else {
                console.error("Failed to fetch wishlist:", data.error);
            }
        } catch (err) {
            console.error("Error fetching wishlist:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.warn("Please log in to manage your wishlist.");
            return;
        }

        try {
            const res = await fetch(`${baseURL}/removewishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify({ product_id: productId }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // setWishlist(prev => prev.filter(item => item.id !== productId));
                toast.success("Removed from wishlist");
                fetchWishlist();
            } else {
                toast.error(data.error || "Failed to remove from wishlist");
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            toast.error("Something went wrong. Try again!");
        }
    };


    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="mb-8 px-3 md:px-8">
            <h2 className="text-lg  font-semibold tracking-normal text-gray-800 text-center sm:text-xl inter mb-6 text-gray-800">Your Wishlist</h2>
            {loading ? (
                <p className="text-lg text-center">Loading...</p>
            ) : wishlist.length === 0 ? (
                <p className="text-lg text-center text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map(product => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between relative"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover rounded-t-xl"
                                />
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 p-2 rounded-full shadow-sm"
                                    title="Remove from Wishlist"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
                                </button>
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                {
                                    product.category === 'Fabric' ?
                                        (<div>
                                            <div className="flex justify-between text-gray-700 text-md font-normal mt-1 mb-1">
                                                <p>&#8358;{product.price_yard.toLocaleString()}/yard</p>
                                            </div>
                                            <Link to={`/fabric/${product.id}/${product.name}`}>
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
                                                <Link to={`/leather/${product.id}/${product.name}`}>
                                                    <button className="mt-2 text-white  w-full py-2 rounded bg-gray-800 hover:bg-blue-700">
                                                        Add To Cart
                                                    </button>
                                                </Link>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
