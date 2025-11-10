import { Item } from '@/lib/RentalManagementSystem';
import React, { useState, FormEvent } from 'react';

interface ItemFormProps {
    onSubmit: (data: Item) => void;
}

const getEmptyItem = () : Item => {
    return {
        id: undefined,
        name: "",
        category: "dress",
        pricePerDay: 0,
        sizes: [""],
        color: "",
        style: "",
        description: "",
        images: [""],
        alt: ""
    }
};

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Item>(getEmptyItem());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(getEmptyItem());
    };

    return (
        <form onSubmit={handleSubmit}>
            {getTextField("name", formData.name, "Nombre:")}
            {getTextField("pricePerDay", formData.pricePerDay, "Precio por Dia:", "number")}
            {getTextField("color", formData.color, "Color:")}
            {getTextField("style", formData.style, "Estilo:")}
            {getTextField("description", formData.description, "Descripción:")}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </form>
    );

    function getTextField(field: string, value: string | number | undefined, label: string, type: string = "text") {
        return <div className="mb-4">
            <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                type={type}
                id={field}
                name={field}
                value={value}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required />
        </div>;
    }
};

export default ItemForm;