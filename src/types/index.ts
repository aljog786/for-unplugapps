export interface DetailRow {
  id: number;
  srNo: number;
  itemCode: string;
  itemName: string;
  description: string;
  qty: number;
  rate: number;
  amt: number;
}

export interface HeaderData {
  vrNo: number;
  vrDate: string;
  status: string;
  acName: string;
}

export interface HeaderSectionProps {
  totalAmount?: number;
  data: HeaderData;
}

export interface ButtonsSectionProps {
  onNew?: () => void;
  onInsert?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
}

export interface DetailsSectionProps {
  rows: DetailRow[];
  onRemoveRow: (id: number) => void;
}

export interface Item {
  item_code: string;
  item_name: string;
}
