import React from 'react';

const DetailsSection = () => {
  return (
    <section className="my-4">
      <h1 className="text-4xl font-bold text-center bg-yellow-600 py-3 mb-6">
        Detail
      </h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Sr no</th>
              <th className="px-4 py-3">Item Code</th>
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <input
                  className="w-20 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  type="number"
                  min="1"
                  placeholder="1"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-40 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  type="text"
                  placeholder="ITEM-001"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-56 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  type="text"
                  placeholder="Enter item name"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-24 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-28 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  type="number"
                  min="0"
                  placeholder="0.00"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-32 rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 shadow-sm"
                  type="text"
                  placeholder="0.00"
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DetailsSection;