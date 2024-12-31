import { Link } from "react-router-dom";
const leather = [
    {
        id: 1,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
]
const fabric = [
    {
        id: 1,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
]
export default function Card() {
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="flex">
                        <h3 className="text-lg font-semibold tracking-normal text-gray-800 sm:text-3xl inter">Upholstery Leather Samples</h3>
                        <Link className="text-lg ml-auto mt-2 hidden sm:inline font-semibold tracking-normal text-gray-700 sm:text-1.5xl inter hover:underline hover:underline-offset-4" to={"/upholstery_leather"}>Shop Now <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 py-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {leather.map((product) => (
                            <div key={product.id} className="group bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        alt={product.imageAlt} p
                                        src={product.imageSrc}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-2 p-1 px-2 ml-1">
                                    <h3 className="text-m sm:text-lg font-medium text-black inter">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="mt-1 sm:flex justify-between mb-3 p-1 px-2 ml-1">
                                    <p className="text-sm inter text-gray-900">&#8358;{product.price}<span className="relative"><sup>2</sup></span></p>
                                    <p className="text-sm inter mt-1 text-gray-900">&#8358;{product.price1}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="text-center py-10 sm:hidden">
                    <button className="bg-gray-900 px-6 py-1 rounded-lg"><Link className="text-white inter" to={"/upholstery_leather"}>Shop Now <span aria-hidden="true">&rarr;</span></Link></button>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-2 sm:py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex">
                        <h3 className="text-lg font-semibold tracking-normal text-gray-800 sm:text-3xl inter">Upholstery Fabric Samples</h3>
                        <Link className="text-m ml-auto mt-2 hidden sm:inline font-semibold tracking-normal text-gray-700 sm:text-1.5xl inter hover:underline hover:underline-offset-4" to={"/upholstery_fabric"}>Shop Now <span aria-hidden="true">&rarr;</span></Link>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 py-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {fabric.map((product) => (
                            <div key={product.id} className="group bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        alt={product.imageAlt} p
                                        src={product.imageSrc}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-2 p-1 px-2 ml-1">
                                    <h3 className="text-m sm:text-lg font-medium text-black inter">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="mt-1 sm:flex justify-between mb-3 p-1 px-2 ml-1">
                                    <p className="text-sm inter mt-1 text-gray-900">&#8358;{product.price1}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="text-center py-10 sm:hidden">
                    <button className="bg-gray-900 px-6 py-1 rounded-lg"><Link className="text-white inter" to={"/upholstery_fabric"}>Shop Now <span aria-hidden="true">&rarr;</span></Link></button>
                </div>
            </div>


        </>
    );
}
