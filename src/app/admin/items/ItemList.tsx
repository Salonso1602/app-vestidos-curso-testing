"use client"

import { createItem, Item, listItems } from "@/lib/RentalManagementSystem";
import Modal from "../../common/modal";
import ItemForm from "./ItemForm";
import { useState } from "react";

type AdminItem = {
    id: number | undefined;
    name: string;
    category: string;
    sizes: string[];
    pricePerDay: number;
};

const ItemList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const items = listItems();
    const handleAddItemSubmit = (formData: Item) => {
        createItem(formData);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2 className="font-semibold">Inventory</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Add/edit/delete can be wired to a database later.</p>
            <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead id='table-header'>
                        <tr className="text-left">
                            <th className="py-2 pr-4">ID</th>
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Category</th>
                            <th className="py-2 pr-4">Sizes</th>
                            <th className="py-2 pr-4">Price/day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((i: AdminItem) => (
                            <tr key={i.id} className="border-t">
                                <td className="py-2 pr-4">{i.id}</td>
                                <td className="py-2 pr-4">{i.name}</td>
                                <td className="py-2 pr-4">{i.category}</td>
                                <td className="py-2 pr-4">{i.sizes.join(", ")}</td>
                                <td className="py-2 pr-4">${i.pricePerDay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="text-xl bg-fuchsia-600 rounded-lg border px-3 py-2" onClick={() => { setIsModalOpen(true) }}>
                    +
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl mb-4">Add Item</h2>
                <ItemForm onSubmit={handleAddItemSubmit} />
            </Modal>

            {/* This div is for the ReactDOM.createPortal target */}
            <div id="modal-root"></div>
        </div>
    );
}

export default ItemList
