import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function OffCanvas() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button to Open Off-Canvas */}
      <button
        onClick={toggleOffCanvas}
        className="inline-flex items-center justify-center p-2 text-gray-700 bg-gray-100 rounded-md"
      >
        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Open sidebar</span>
      </button>

      {/* Off-Canvas Sidebar */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={toggleOffCanvas}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />

          {/* Slide-in Sidebar */}
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full" /* Change to -translate-x-full for sliding out completely left */
          >
            <Dialog.Panel className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 mt-26">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Menu</h2>
                <button onClick={toggleOffCanvas} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <div className="space-y-4">
                <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="block text-gray-700 hover:text-blue-600">About</a>
                <a href="#" className="block text-gray-700 hover:text-blue-600">Services</a>
                <a href="#" className="block text-gray-700 hover:text-blue-600">Contact</a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
