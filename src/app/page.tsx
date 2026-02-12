'use client'
import { useCallback } from "react";
import HeaderSection from "../components/HeaderSection";
import DetailsSection from "../components/DetailsSection";
import ButtonsSection from "../components/ButtonsSection";
import { DetailRow, HeaderData } from "../types";
import { useAppDispatch, useAppSelector, RootState } from "../store/store";
import {
  resetSales,
  addRow,
  removeRow,
  setRows
} from "../store/salesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const headerData = useAppSelector((state: RootState) => state.sales.header);
  const rows = useAppSelector((state: RootState) => state.sales.rows);

  const totalAmount = rows.reduce((sum: number, row: DetailRow) => sum + row.amt, 0);

  const resetData = useCallback(() => {
    dispatch(resetSales());
  }, [dispatch]);

  const handleAddRow = useCallback(() => {
    dispatch(addRow());
  }, [dispatch]);

  const handleRemoveRow = useCallback((id: number) => {
    dispatch(removeRow(id));
  }, [dispatch]);

  const handleSave = async () => {
    // Basic validation
    if (!headerData.acName) {
      alert("A/c name is required");
      return;
    }

    const invalidRow = rows.find((row: DetailRow) => !row.itemCode || !row.itemName || row.qty <= 0 || row.rate <= 0);
    if (invalidRow) {
      alert(`Please fill all required fields for row ${invalidRow.srNo}`);
      return;
    }

    // Construct payload
    const payload = {
      header_table: {
        vr_no: Number(headerData.vrNo),
        vr_date: headerData.vrDate,
        ac_name: headerData.acName,
        ac_amt: Number(totalAmount.toFixed(2)),
        status: headerData.status,
      },
      detail_table: rows.map((row: DetailRow) => ({
        vr_no: Number(headerData.vrNo),
        sr_no: Number(row.srNo),
        item_code: row.itemCode,
        item_name: row.itemName,
        description: row.description || "",
        qty: Number(row.qty),
        rate: Number(row.rate),
      }))
    };

    console.log("Sending payload:", JSON.stringify(payload));

    try {
      const response = await fetch('http://84.46.255.88:3999/header/multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let result;
      try {
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          const text = await response.text();
          result = { message: text };
        }
      } catch (parseError) {
        console.error("Parse error:", parseError);
        result = { message: "Error parsing server response" };
      }

      if (response.ok) {
        alert('Data saved successfully!');
        console.log("Save success:", result);
      } else {
        console.error("Save error details:", result);
        alert(`Failed to save data: ${result.message || response.statusText || 'Internal Server Error'} `);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error. Please check if the API is reachable.');
    }
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <main className="container mx-auto px-10 py-10 print:p-0 print:m-0">
      <div className="flex justify-between items-start gap-10 print:block">
        <div className="flex-1 print:mb-8">
          <HeaderSection
            totalAmount={totalAmount}
            data={headerData}
          />
        </div>
        <div className="flex-none print:hidden">
          <ButtonsSection onNew={resetData} onInsert={handleAddRow} onSave={handleSave} onPrint={handlePrint} />
        </div>
      </div>
      <div className="print:mt-4">
        <DetailsSection
          rows={rows}
          onRemoveRow={handleRemoveRow}
        />
      </div>
    </main>
  );
}
