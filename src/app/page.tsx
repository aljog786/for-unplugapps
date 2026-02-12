'use client'
import { useState, useCallback } from "react";
import HeaderSection from "../components/HeaderSection";
import DetailsSection from "../components/DetailsSection";
import ButtonsSection from "../components/ButtonsSection";
import { DetailRow, HeaderData } from "../types";

export default function Home() {
  const [headerData, setHeaderData] = useState<HeaderData>({
    vrNo: 0, // Changed from 1 to avoid duplicate key errors
    vrDate: new Date().toISOString().split('T')[0],
    status: "A",
    acName: "",
  });

  const [rows, setRows] = useState<DetailRow[]>([
    { id: 1, srNo: 1, itemCode: "", itemName: "", description: "", qty: 0, rate: 0, amt: 0 }
  ]);

  const totalAmount = rows.reduce((sum, row) => sum + row.amt, 0);

  const resetData = useCallback(() => {
    setHeaderData({
      vrNo: 0,
      vrDate: new Date().toISOString().split('T')[0],
      status: "A",
      acName: "",
    });
    setRows([
      { id: 1, srNo: 1, itemCode: "", itemName: "", description: "", qty: 0, rate: 0, amt: 0 }
    ]);
  }, []);

  const addRow = useCallback(() => {
    setRows(prev => {
      const lastRow = prev[prev.length - 1];
      const newSrNo = lastRow ? lastRow.srNo + 1 : 1;
      return [
        ...prev,
        {
          id: Date.now(),
          srNo: newSrNo,
          itemCode: "",
          itemName: "",
          description: "",
          qty: 0,
          rate: 0,
          amt: 0
        }
      ];
    });
  }, []);

  const removeRow = useCallback((id: number) => {
    setRows(prev => {
      const filtered = prev.filter(row => row.id !== id);
      return filtered.map((row, index) => ({ ...row, srNo: index + 1 }));
    });
  }, []);

  const handleSave = async () => {
    // Basic validation
    if (!headerData.acName) {
      alert("A/c name is required");
      return;
    }

    const invalidRow = rows.find(row => !row.itemCode || !row.itemName || row.qty <= 0 || row.rate <= 0);
    if (invalidRow) {
      alert(`Please fill all required fields for row ${invalidRow.srNo}`);
      return;
    }

    // Construct payload as per EXACT screenshot structure
    // Important: vr_no must be a number, vr_date must be yyyy-mm-dd
    const payload = {
      header_table: {
        vr_no: Number(headerData.vrNo),
        vr_date: headerData.vrDate,
        ac_name: headerData.acName,
        ac_amt: Number(totalAmount.toFixed(2)),
        status: headerData.status,
      },
      detail_table: rows.map(row => ({
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

      // Handle response based on content-type
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
        // If result is empty or just says 500, it's likely a DB constraint or unique key error
        alert(`Failed to save data: ${result.message || response.statusText || 'Internal Server Error'}`);
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
            onChange={(newData) => setHeaderData(prev => ({ ...prev, ...newData }))}
          />
        </div>
        <div className="flex-none print:hidden">
          <ButtonsSection onNew={resetData} onInsert={addRow} onSave={handleSave} onPrint={handlePrint} />
        </div>
      </div>
      <div className="print:mt-4">
        <DetailsSection rows={rows} setRows={setRows} onRemoveRow={removeRow} />
      </div>
    </main>
  );
}
