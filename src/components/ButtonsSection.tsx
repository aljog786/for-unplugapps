'use client'
import { ButtonsSectionProps } from "../types";

const ButtonsSection = ({ onNew, onInsert, onSave, onPrint }: ButtonsSectionProps) => {
  const newClickHandler = () => {
    console.log("new button clicked")
    if (onNew) onNew();
  }
  const insertClickHandler = () => {
    console.log("insert button clicked")
    if (onInsert) onInsert();
  }
  const saveClickHandler = () => {
    console.log("save button clicked")
    if (onSave) onSave();
  }
  const printClickHandler = () => {
    console.log("print button clicked")
    if (onPrint) onPrint();
  }
  return (
    <div className="mt-6 flex justify-end">
      <div className="flex w-full max-w-[160px] flex-col gap-3 rounded-2xl border border-yellow-200 bg-linear-to-b from-yellow-100 to-yellow-200 p-4 shadow-md">
        <button onClick={() => newClickHandler()} className="rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300">
          New
        </button>
        <button onClick={() => insertClickHandler()} className="rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300">
          Insert
        </button>
        <button onClick={() => saveClickHandler()} className="rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300">
          Save
        </button>
        <button onClick={() => printClickHandler()} className="rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300">
          Print
        </button>
      </div>
    </div>
  );
};

export default ButtonsSection;