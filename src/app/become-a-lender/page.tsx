"use client"

import Link from "next/link";
import { useState } from "react";
import Modal from "../common/modal";

export default function BecomeALender() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 sm:py-28">
            <div className="max-w-6xl">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                Become a
                <span className="mx-2 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  GlamRent Lender
                </span>.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Become a GlamRent Lender and let your old fashion come back to life, and earn a pretty penny too!
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Tell us a bit about yourself and the items you would like to lend.
            </p>

            <form
              className="mt-8 grid grid-cols-1 gap-6"
              onSubmit={(e) => {
                e.preventDefault();         // prevent full reload
                setIsModalOpen(true);       // open modal
              }}
            >
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="emailLender" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="emailLender"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+598 99 123 456"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="items" className="block text-sm font-medium mb-1">
                  What items do you want to lend?
                </label>
                <textarea
                  id="items"
                  name="items"
                  required
                  rows={4}
                  placeholder="Describe the clothing or accessories you'd like to list..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Submit application
              </button>
            </form>
          </div>
        </section>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center text-white">
            <h3 className="text-xl font-semibold mb-4">
              Thanks for applying!
            </h3>
            <p>An administrator will soon contact you.</p>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 bg-fuchsia-600 hover:bg-fuchsia-500 px-5 py-2 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </Modal>
      </main>
      {/* This div is for the ReactDOM.createPortal target */}
      <div id="modal-root"></div>
    </div>
  );
}
