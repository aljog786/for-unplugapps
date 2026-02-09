'use client'
import { DetailRow } from '../app/page';
import { InputField } from './ui/FormControls';

const DetailsSection = ({ rows, setRows }: { rows: DetailRow[], setRows: React.Dispatch<React.SetStateAction<DetailRow[]>> }) => {
  const handleInputChange = (rowId: number, field: keyof DetailRow, value: string | number) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        const updatedRow = { ...row, [field]: value };
        
        if (field === 'qty' || field === 'rate') {
          const qty = field === 'qty' ? Number(value) : row.qty;
          const rate = field === 'rate' ? Number(value) : row.rate;
          updatedRow.amt = qty * rate;
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const totalAmount = rows.reduce((sum, row) => sum + row.amt, 0);

  return (
    <section className="my-4">
      <h1 className="text-4xl font-bold text-center bg-yellow-600 text-white py-3 mb-6 uppercase tracking-wider shadow-md rounded-lg">
        Detail
      </h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-lg bg-white">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Sr no</th>
              <th className="px-6 py-4">Item Code</th>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Rate</th>
              <th className="px-6 py-4">Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <InputField
                    type="number"
                    value={row.srNo}
                    readOnly
                    className="w-16 bg-slate-50 border-none text-center font-medium"
                    containerClassName=""
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    type="text"
                    placeholder={row.itemCode}
                    className="w-32"
                    containerClassName=""
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    type="text"
                    placeholder="Enter item name"
                    className="w-full min-w-[200px]"
                    containerClassName=""
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    type="number"
                    min="0"
                    value={row.qty}
                    onChange={(e) => handleInputChange(row.id, 'qty', Number(e.target.value))}
                    className="w-24 text-center"
                    containerClassName=""
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    type="number"
                    min="0"
                    value={row.rate}
                    onChange={(e) => handleInputChange(row.id, 'rate', Number(e.target.value))}
                    className="w-28 text-right"
                    containerClassName=""
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    type="number"
                    value={row.amt}
                    readOnly
                    className="w-32 bg-slate-50 border-none font-semibold text-slate-900"
                    containerClassName=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end items-center gap-4 border-t border-slate-200 pt-8">
        <label htmlFor="totalAmt" className="text-xl font-bold text-slate-800 uppercase tracking-tight">
          Grand Total:
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
          <InputField
            id="totalAmt"
            type="text"
            readOnly
            className="w-56 bg-yellow-50 border-yellow-200 px-10 py-4 text-right text-2xl font-black text-slate-900 shadow-inner rounded-xl"
            value={totalAmount.toFixed(2)}
            containerClassName=""
          />
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;