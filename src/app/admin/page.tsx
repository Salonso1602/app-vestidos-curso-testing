"use client"
// import { isAdmin, getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
import { Item, listItems, createItem, listRentals } from "@/lib/RentalManagementSystem";
import { redirect } from "next/navigation";
import Modal from "../common/modal";
import { useState } from "react";
import ItemForm from "./items/ItemForm";

type AdminItem = {
  id: number | undefined;
  name: string;
  category: string;
  sizes: string[];
  pricePerDay: number;
};

export default function Page() {
  // if (!isAdmin()) redirect("/admin/login");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const csrf = await getOrCreateCsrfToken();

  const items = listItems();
  const rentals = listRentals();

  const handleAddItemSubmit = (formData: Item) => {
    createItem(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm rounded-lg border px-3 py-2">Sign out</button>
        </form>
      </div>

      <section className="mt-8">
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
              <tr key={"AA"} className="border-t">
                <td className="py-2 pr-4">
                  <button className="text-sm rounded-lg border px-3 py-2" onClick={() => { setIsModalOpen(true) }}>
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-semibold">Scheduled rentals</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4">Rental ID</th>
                <th className="py-2 pr-4">Item</th>
                <th className="py-2 pr-4">Dates</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 pr-4">{r.id.slice(0, 8)}</td>
                  <td className="py-2 pr-4">{r.itemId}</td>
                  <td className="py-2 pr-4">
                    {r.start} → {r.end}
                  </td>
                  <td className="py-2 pr-4">
                    {r.customer.name}
                    <div className="text-slate-500 text-xs">{r.customer.email} • {r.customer.phone}</div>
                  </td>
                  <td className="py-2 pr-4 capitalize">{r.status}</td>
                  <td className="py-2 pr-4">
                    {r.status === "active" ? (
                      <form
                        onSubmit={async (e) => {
                          // no-op on server; keep for semantics
                        }}
                        action={`/api/admin/rentals/${r.id}/cancel`}
                        method="POST"
                      >
                        <input type="hidden" name="csrf" value={csrf} />
                        <button className="rounded-lg border px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
                      </form>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {rentals.length === 0 && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={6}>No rentals yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl mb-4">Enter Your Details</h2>
        <ItemForm onSubmit={handleAddItemSubmit} />
      </Modal>

      {/* This div is for the ReactDOM.createPortal target */}
      <div id="modal-root"></div>
    </div>
  );
}
