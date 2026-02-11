'use client'
import { HeaderSectionProps } from "../types";
import { InputField, SelectField } from "./ui/FormControls";

const HeaderSection = ({ totalAmount, data, onChange }: HeaderSectionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    onChange({ [name]: type === 'number' ? Number(value) : value });
  };

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-center bg-yellow-300 py-3 mb-6 uppercase tracking-wider shadow-sm rounded-lg">
        Header
      </h1>

      <form className="flex flex-col items-center gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <fieldset className="flex flex-wrap justify-center gap-6">
          <InputField
            label="Vr no:"
            id="vrNo"
            name="vrNo"
            type="text"
            value={data.vrNo}
            onChange={handleChange}
            className="w-32"
            required
          />

          <InputField
            label="Vr date:"
            id="vrDate"
            name="vrDate"
            type="date"
            value={data.vrDate}
            onChange={handleChange}
            required
          />

          <SelectField
            label="Status:"
            id="status"
            name="status"
            value={data.status}
            onChange={handleChange}
            className="w-24"
            options={[
              { value: "A", label: "A" },
              { value: "I", label: "I" }
            ]}
          />
        </fieldset>

        <fieldset className="flex flex-wrap justify-center gap-6">
          <InputField
            label="A/c name:"
            id="acName"
            name="acName"
            type="text"
            value={data.acName}
            onChange={handleChange}
            className="w-64"
            required
          />

          <InputField
            label="A/c amt:"
            id="acAmt"
            name="acAmt"
            type="text"
            value={totalAmount?.toFixed(2) || "0.00"}
            readOnly
            className="w-32 bg-slate-50 font-semibold text-slate-900"
            required
          />
        </fieldset>
      </form>
    </header>
  );
};

export default HeaderSection;
