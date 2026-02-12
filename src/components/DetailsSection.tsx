import { DetailsSectionProps, DetailRow, Item } from '../types';
import { InputField } from './ui/FormControls';
import ItemAutocomplete from './ui/ItemAutocomplete';
import { useAppDispatch } from '../store/store';
import { updateRowField, updateRowFromItem } from '../store/salesSlice';

const DetailsSection = ({ rows, onRemoveRow }: Omit<DetailsSectionProps, 'setRows'>) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (rowId: number, field: keyof DetailRow, value: string | number) => {
    dispatch(updateRowField({ id: rowId, field, value }));
  };

  const handleSelectItem = (rowId: number, item: Item) => {
    dispatch(updateRowFromItem({ id: rowId, itemCode: item.item_code, itemName: item.item_name }));
  };

  const totalAmount = rows.reduce((sum, row) => sum + row.amt, 0);

  return (
    <section className="my-4 print:my-0">
      <h1 className="text-4xl font-bold text-center bg-yellow-600 text-white py-3 mb-6 uppercase tracking-wider shadow-md rounded-lg print:bg-slate-100 print:text-black print:shadow-none">
        Detail
      </h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-lg bg-white print:shadow-none print:border-slate-300">
        <table className="min-w-full text-left text-sm text-slate-700 print:text-xs">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-slate-200 print:bg-white">
            <tr>
              <th className="px-6 py-4 print:px-2 print:py-2">Sr no</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Item Code</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Item Name</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Description</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Qty</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Rate</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Amt</th>
              <th className="px-6 py-4 print:hidden">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors print:hover:bg-white">
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="number"
                    value={row.srNo}
                    readOnly
                    className="w-16 bg-slate-50 border-none text-center font-medium print:bg-white print:w-8"
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <ItemAutocomplete
                    value={row.itemCode}
                    field="item_code"
                    placeholder="Code"
                    className="w-32 print:w-24 print:border-none"
                    onSelect={(item) => handleSelectItem(row.id, item)}
                    onChange={(val) => handleInputChange(row.id, 'itemCode', val)}
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="text"
                    value={row.itemName}
                    readOnly
                    placeholder="Item name"
                    className="w-full min-w-[200px] bg-slate-50 border-none font-medium print:bg-white print:min-w-[150px]"
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="text"
                    placeholder="Enter description"
                    className="w-full min-w-[200px]"
                    value={row.description}
                    onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="number"
                    min="0"
                    value={row.qty}
                    onChange={(e) => handleInputChange(row.id, 'qty', Number(e.target.value))}
                    className="w-24 text-center print:w-16 print:border-none"
                    required
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="number"
                    min="0"
                    value={row.rate}
                    onChange={(e) => handleInputChange(row.id, 'rate', Number(e.target.value))}
                    className="w-28 text-right print:w-20 print:border-none"
                    required
                  />
                </td>
                <td className="px-6 py-4 print:px-2 print:py-2">
                  <InputField
                    type="number"
                    value={row.amt}
                    readOnly
                    className="w-32 bg-slate-50 border-none text-right font-semibold text-slate-900 print:bg-white print:w-24"
                  />
                </td>
                {rows.length > 1 && <td className="px-6 py-4 print:hidden">
                  <button
                    onClick={() => onRemoveRow(row.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end items-center gap-4 border-t border-slate-200 pt-8 print:mt-4 print:pt-4">
        <label htmlFor="totalAmt" className="text-xl font-bold text-slate-800 uppercase tracking-tight print:text-lg">
          Grand Total:
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg print:text-base print:left-2">₹</span>
          <InputField
            id="totalAmt"
            type="text"
            readOnly
            className="w-56 bg-yellow-50 border-yellow-200 px-10 py-4 text-right text-2xl font-black text-slate-900 shadow-inner rounded-xl print:bg-white print:border-none print:text-xl print:w-32 print:px-6"
            value={totalAmount.toFixed(2)}
          />
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;