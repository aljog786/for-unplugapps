'use client'
import { useState } from "react";

const HeaderSection = () => {
    const [headerData, setHeaderData] = useState({
    vrNo: "",
    vrDate: "",
    status: "A",
    acName: "",
    acAmt: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeaderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-center bg-yellow-300 py-3 mb-6">
        Header
      </h1>

      <form className="flex flex-col items-center gap-6">
        <fieldset className="flex gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="vrNo">Vr no:</label>
            <input
              id="vrNo"
              name="vrNo"
              type="text"
              value={headerData.vrNo}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="vrDate">Vr date:</label>
            <input
              id="vrDate"
              name="vrDate"
              type="date"
              value={headerData.vrDate}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="status">Status:</label>
            <input
              id="status"
              name="status"
              type="text"
              value={headerData.status}
              readOnly
              className="border rounded px-2 py-1 w-12 text-center bg-gray-100"
            />
          </div>
        </fieldset>

        <fieldset className="flex gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="acName">A/c name:</label>
            <input
              id="acName"
              name="acName"
              type="text"
              value={headerData.acName}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="acAmt">A/c amt:</label>
            <input
              id="acAmt"
              name="acAmt"
              type="text"
              value={headerData.acAmt}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          </div>
        </fieldset>
      </form>
    </header>
  );
};

export default HeaderSection;
