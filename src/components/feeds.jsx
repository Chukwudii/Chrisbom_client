
"use client";

// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import Modal from "./modal";

export default function Ponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <div className="p-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={openModal}
        >
          Open Modal
        </button>
  
        <Modal isOpen={isModalOpen} onClose={closeModal} popup>
          <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
          <p className="mb-4">This is the modal content.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={closeModal}
          >
            Close Modal
          </button>
        </Modal>
      </div>
    );
}
