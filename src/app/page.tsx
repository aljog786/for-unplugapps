'use client'
import { useState } from "react";
import HeaderSection from "../components/HeaderSection";
import DetailsSection from "../components/DetailsSection";
import ButtonsSection from "../components/ButtonsSection"; 

export interface DetailRow {
  id: number;
  srNo: number;
  itemCode: string;
  itemName: string;
  qty: number;
  rate: number;
  amt: number;
}

export default function Home() {
  const [rows, setRows] = useState<DetailRow[]>([
    { id: 1, srNo: 1, itemCode: "ITEM-001", itemName: "", qty: 0, rate: 0, amt: 0 }
  ]);

  // Calculate total amount dynamically
  const totalAmount = rows.reduce((sum, row) => sum + row.amt, 0);

  const addRow = () => {
    setRows(prev => {
      const lastRow = prev[prev.length - 1];
      const newSrNo = lastRow ? lastRow.srNo + 1 : 1;
      return [
        ...prev,
        { 
          id: Date.now(), 
          srNo: newSrNo, 
          itemCode: `ITEM-00${newSrNo}`, 
          itemName: "", 
          qty: 0, 
          rate: 0, 
          amt: 0 
        }
      ];
    });
  };

  return (
    <main className="container mx-auto px-10 py-10">
      <div className="flex justify-between items-start gap-10">
        <div className="flex-1">
          <HeaderSection totalAmount={totalAmount} />
        </div>
        <div className="flex-none">
          <ButtonsSection onInsert={addRow} />
        </div>
      </div>
      <DetailsSection rows={rows} setRows={setRows} />
    </main>
  );
}
