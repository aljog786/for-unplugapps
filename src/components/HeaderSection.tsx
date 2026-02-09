'use client'
import { useForm } from "../hooks/useForm";
import { InputField, SelectField } from "./ui/FormControls";

interface HeaderSectionProps {
  totalAmount?: number;
}

const HeaderSection = ({ totalAmount }: HeaderSectionProps) => {
  const { data: headerData, handleChange } = useForm({
    vrNo: "",
    vrDate: "",
    status: "A",
    acName: "",
  });

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
            value={headerData.vrNo}
            onChange={handleChange}
            className="w-32"
          />

          <InputField
            label="Vr date:"
            id="vrDate"
            name="vrDate"
            type="date"
            value={headerData.vrDate}
            onChange={handleChange}
          />

          <SelectField
            label="Status:"
            id="status"
            name="status"
            value={headerData.status}
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
            value={headerData.acName}
            onChange={handleChange}
            className="w-64"
          />

          <InputField
            label="A/c amt:"
            id="acAmt"
            name="acAmt"
            type="text"
            value={totalAmount?.toFixed(2) || "0.00"}
            readOnly
            className="w-32 bg-slate-50 font-semibold text-slate-900"
          />
        </fieldset>
      </form>
    </header>
  );
};

export default HeaderSection;
