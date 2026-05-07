export interface LookupCategory {
  id?: number;
  name: string;
  lookupType: string;
  isActive: boolean;
}

export interface EquipmentDetail {
  id?: number;
  equipmentName: string;
  quantity: number;
}

export interface Customer {
  customerId?: number;
  customerName: string;
  address: string;
  emailId: string;
  contactPerson: string;
  mobileNo: string;
  alternativeMobNo: string;
  category: LookupCategory | null;
  branch: LookupCategory | null;
  nearestLandmark: string;
  distance: number | null;
  equipmentDetails: EquipmentDetail[];
}

export interface Employee {
  empNo?: number;
  empName: string;
  mobileNo: string;
  resAddr: string;
  jobPosition: LookupCategory | null;
  doj: string;
}

export interface Stock {
  id?: number;
  stockItem: string;
  brand: LookupCategory | null;
  siNumber: string;
  status: string;
}
