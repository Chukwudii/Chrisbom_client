const bestseller = [
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
    {
        id: 5,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 6,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 7,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
    {
        id: 8,
        name: 'Black Spotted Leather',
        href: '#',
        imageSrc: 'https://media.istockphoto.com/id/1166715036/photo/red-cotton-linen-fabric-seamless-texture.webp?b=1&s=170667a&w=0&k=20&c=ITijY6GHsrkcblJrfoVwaFoZzOy94WjGY6Bqp8lS5KA=',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '28,600/sqm',
        price1: '32,000/yards',
        color: 'Black',
    },
]
export default function Bestsellers() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h3 className="text-lg text-center font-semibold tracking-normal text-gray-800 sm:text-3xl inter">Meet Our Best Sellers</h3>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 py-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {bestseller.map((product) => (
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
                                <p className="text-sm inter text-gray-900">&#8358;{product.price}<sup>2</sup></p>
                                <p className="text-sm inter mt-1 text-gray-900">&#8358;{product.price1}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}