import '../styles/navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


const products = [
    { name: 'Upholstery Leather', to: "/upholstery_leather" },
    { name: 'Upholstery Fabric', to: "/upholstery_fabric" },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div>
            <header className="bg-white z-50 fixed top- left-0 right-0">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link to={"/"} className="-m-1.5 p-1.5 navbar-brand text-lg sm:text-xl font-bold">
                            C.U CHRISBOM INT'L
                        </Link>
                    </div>

                    <div className="flex lg:hidden">

                        {mobileMenuOpen ? (
                            <Link to={"/cart"} className="-mt-2.5 hidden text-m font-semibold leading-6 text-gray-700">

                                <button className='mt-3'>
                                    <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 bg-white" />
                                </button>
                                <div className='flex justify-center itmes-center text-sm cart-count'>
                                    3
                                </div>

                            </Link>
                        ) : (

                            <Link to={"/cart"} className="-mt-2.5 px-1 text-m font-semibold leading-6 text-gray-700">

                                <button className='mt-3'>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#EBC38D', fontSize: '35px' }} className="h-6 w-6 bg-white" />
                                </button>
                                <div className='flex justify-center itmes-center text-sm cart-count'>
                                    3
                                </div>

                            </Link>
                        )}
                        {mobileMenuOpen ? (
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        ) : (

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        )}
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-6 inter ">
                        <Popover className="relative">
                            <PopoverButton className=" text-m font-semibold mt-3 leading-6 text-gray-700 hover:underline underline-offset-4 decoration-amber-500 decoration-2">
                                Shop
                                {/* <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" /> */}
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="p-4">
                                    {products.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-m leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex-auto">
                                                <Link to={item.to} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>

                        <Link to={"/about_us"} className="text-m mt-3 font-semibold leading-6 text-gray-700 hover:underline underline-offset-4 decoration-amber-500 decoration-2">
                            About Us
                        </Link>
                        <Link to={"/contact"} className="text-m mt-3 mr-72 font-semibold leading-6 text-gray-700 hover:underline underline-offset-4 decoration-amber-500 decoration-2">
                            Contact Us
                        </Link>
                        <Link to={"/login"} className="text-m font-semibold leading-6 text-gray-700">
                            <button className='rounded-2xl bg-dark border-2 py-2 px-3 hover:border-amber-500'>
                                Log in
                            </button>
                        </Link>
                        <Link to={"/cart"} className="text-m font-semibold leading-6 text-gray-700">

                            <button className='mt-3'>
                                <FontAwesomeIcon style={{ color: '#99A1AF', fontSize: '35px' }} icon={faShoppingCart} className="h-6 w-6 bg-white" />
                            </button>
                            <div className='flex justify-center itmes-center text-sm cart-count'>
                                3
                            </div>

                        </Link>
                    </PopoverGroup>
                </nav>
                <hr />
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to={"/"} className="-m-1.5 p-1.5 navbar-brand lg:hidden text-lg sm:text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                                C.U CHRISBOM INT'L
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6 inter">
                                    <Disclosure as="div" className="-mx-3">
                                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200">
                                            Shop
                                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2">
                                            <DisclosureButton className="w-full">
                                                {products.map((item) => (
                                                    <Link to={item.to} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg w-full py-2 pr-32 sm: text-sm font-semibold leading-7 text-gray-700 hover:bg-gray-200">{item.name}</Link>
                                                ))}
                                            </DisclosureButton>
                                        </DisclosurePanel>
                                    </Disclosure>
                                    <Link to={"/about_us"}

                                        onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200"
                                    >
                                        About Us
                                    </Link>
                                    <Link to={"/contact"}
                                        onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link to={"/cart"}
                                        onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200">
                                        Cart
                                    </Link>
                                    <Link to={"/signup"}
                                        onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200"
                                    >
                                        Sign-up
                                    </Link>
                                    <Link to={"/login"}
                                        onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200"
                                    >
                                        Log-in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

        </div>

    )
}
