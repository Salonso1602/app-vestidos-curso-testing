import { Category, Item } from '@/lib/RentalManagementSystem';
import React, { useState, FormEvent } from 'react';

interface ItemFormProps {
    item?: Item,
    onSubmit: (data: Item) => void;
}

const getEmptyItem = (): Item => {
    return {
        id: undefined,
        name: "",
        category: "dress",
        pricePerDay: 0,
        sizes: [],
        color: "",
        style: "",
        description: "",
        images: [],
        alt: ""
    }
};

const categoryLabels: Record<Category, string> = {
    dress: "Dress",
    shoes: "Shoes",
    bag: "Bag",
    jacket: "jacket",
};

const ItemForm: React.FC<ItemFormProps> = ({ item = undefined, onSubmit }) => {
    const [formData, setFormData] = useState<Item>(item ?? getEmptyItem());

    const [sizeInputs, setSizeInputs] = useState<string[]>(formData.sizes.length > 0 ? formData.sizes : [""]);
    const [imageInputs, setImageInputs] = useState<string[]>(formData.images.length > 0 ? formData.images : [""]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "number"
                ? (value === "" ? 0 : Number(value))
                : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        onSubmit(formData);
        setFormData(getEmptyItem());
    };

    return (
        <form onSubmit={handleSubmit}>
            {getTextField("name", formData.name, "Name:")}
            {getTextField("alt", formData.alt, "Alternative Name:")}
            {getCategoriesDropdown()}
            {getTextField("color", formData.color, "Color:")}
            {getTextField("style", formData.style, "Style:")}
            {getTextListField(sizeInputs)}
            {getTextField("description", formData.description, "Description:")}
            {getTextField("pricePerDay", formData.pricePerDay, "Price Per Day:", "number")}
            {getImagesField(imageInputs)}
            <button
                type="submit"
                className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Agregar
            </button>
        </form>
    );

    function getTextField(field: string, value: string | number | undefined, label: string, type: string = "text") {
        return <div className="mb-4">
            <label htmlFor={field} className="block text-white-700 text-sm font-bold mb-2">{label}</label>
            <input
                id={field}
                name={field}
                value={value}
                type={type}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                required />
        </div>;
    }

    function getCategoriesDropdown() {
        return (
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Categoría:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as Category })
                    }
                    className="
                        shadow border rounded w-full py-2 px-3
                        bg-black text-white
                        appearance-none
                    "
                >
                    {(Object.keys(categoryLabels) as Category[]).map((c) => (
                        <option key={c} value={c}>
                            {categoryLabels[c]}
                        </option>
                    ))}
                </select>
            </div>

        );
    }

    function handleSizeChange(index: number, value: string) {
        const newInputs = [...sizeInputs];
        newInputs[index] = value;

        if (index === newInputs.length - 1 && value.trim() !== "") {
            newInputs.push("");
        }

        setSizeInputs(newInputs);

        const filtered = newInputs.filter(s => s.trim() !== "");
        setFormData((prev) => ({ ...prev, sizes: filtered }));
    };

    function getTextListField(values: string[]) {
        return (
            <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2">Talles:</label>

                <div className="flex flex-col gap-2">
                    {values.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            placeholder="Enter size..."
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    ))}
                </div>
            </div>
        )
    }

    function handleImageChange(index: number, file: File | null) {
        const newInputs = [...imageInputs];

        if (file) {
            const objectUrl = URL.createObjectURL(file);
            newInputs[index] = objectUrl;
        }
        else {
            newInputs[index] = "";
        }

        // if a new item was added,. create an empty field
        if (index === newInputs.length - 1 && newInputs[index].trim() !== "") {
            newInputs.push("");
        }

        setImageInputs(newInputs);

        const filtered = newInputs.filter(i => i.trim() !== "");
        setFormData(prev => ({ ...prev, images: filtered }));
    };

    function getImagesField(images: string[]) {
        return (
            <div className="mb-4">
                <label className="block text-white-700 text-sm font-bold mb-2">Images:</label>

                <div className="flex flex-col gap-2">
                    {images.map((img, index) => (
                        <input
                            key={index}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    ))}
                </div>
            </div>
        )
    }
};

export default ItemForm;