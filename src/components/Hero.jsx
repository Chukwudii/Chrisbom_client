export default function Hero() {
    return (
        <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 pb-6 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-800 sm:text-2xl montserrat">Premium Upholstery Leather & Fabrics for Every Style and Need</h2>
                    <p className="mt-4 text-gray-500 inter text">
                        "Upgrade your space with our high-quality upholstery leather and fabrics. Perfect for adding style and comfort to any room."
                    </p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                    <img
                        alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                        src="https://media.istockphoto.com/id/1302555575/photo/vintage-leather-armchair-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=Q3hQ6Ggulh-ALNrSu9ZP060xti1XmaPeIwp_3ceJ4H0="
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        alt="Walnut card tray filled with cards and card angled in dedicated groove."
                        src="https://media.istockphoto.com/id/2153448229/photo/mid-century-modern-style-armchair.jpg?s=612x612&w=0&k=20&c=MTSjJaE2bwmVxfUqFb3pHgZz4n5ax_xOqI03VxZ28U0="
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        alt="Side of walnut card tray with card groove and recessed card area."
                        src="https://media.istockphoto.com/id/2159814536/photo/armchair-modern-chair-modern-armchair.jpg?s=612x612&w=0&k=20&c=LaqInAHjbopv9mpMhLyFgfUsJlheMTRLcgy8VGB4tH0="
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        alt="Top down view of walnut card tray with embedded magnets and card groove."
                        src="https://media.istockphoto.com/id/2159780026/photo/armchair-modern-chair-modern-armchair.jpg?s=612x612&w=0&k=20&c=GDnOcpoUggjzTz0d2x30j_0WowDTfZTyfoL-loxooAE="
                        className="rounded-lg bg-gray-100"
                    />

                </div>
            </div>
        </div>
    )
}