export type RentStatus = "PAID" | "PENDING" | "OVERDUE";

export type Owner = {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertiesCount: number;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  type: string;
  ownerId: string;
  monthlyRent: number;
  units: number;
  occupiedUnits: number;
};

export type Tenant = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  propertyId: string;
  monthlyRent: number;
  status: RentStatus;
};

export type RentPayment = {
  id: string;
  tenantId: string;
  propertyId: string;
  period: string;
  amount: number;
  dueDate: string;
  status: RentStatus;
};

export const owners: Owner[] = [
  {
    id: "owner-1",
    name: "Agence Immo Pro",
    phone: "+221 77 000 11 22",
    email: "contact@agenceimmopro.sn",
    propertiesCount: 2,
  },
  {
    id: "owner-2",
    name: "Mamadou Ba",
    phone: "+221 76 234 56 78",
    email: "mamadou.ba@example.com",
    propertiesCount: 1,
  },
  {
    id: "owner-3",
    name: "Fatou Gueye",
    phone: "+221 70 345 67 89",
    email: "fatou.gueye@example.com",
    propertiesCount: 1,
  },
];

export const properties: Property[] = [
  {
    id: "property-1",
    name: "Appartement 4A - Almadies",
    address: "Route des Almadies, Dakar",
    type: "Appartement",
    ownerId: "owner-1",
    monthlyRent: 175000,
    units: 1,
    occupiedUnits: 1,
  },
  {
    id: "property-2",
    name: "Studio 2B - Ngor",
    address: "Ngor Virage, Dakar",
    type: "Studio",
    ownerId: "owner-1",
    monthlyRent: 120000,
    units: 1,
    occupiedUnits: 1,
  },
  {
    id: "property-3",
    name: "Villa 14 - Fann Residence",
    address: "Fann Residence, Dakar",
    type: "Villa",
    ownerId: "owner-2",
    monthlyRent: 450000,
    units: 1,
    occupiedUnits: 1,
  },
  {
    id: "property-4",
    name: "Appartement 1 - Mermoz",
    address: "Mermoz Sacre-Coeur, Dakar",
    type: "Appartement",
    ownerId: "owner-3",
    monthlyRent: 200000,
    units: 1,
    occupiedUnits: 1,
  },
];

export const tenants: Tenant[] = [
  {
    id: "tenant-1",
    firstName: "Moustapha",
    lastName: "Diop",
    phone: "+221 77 123 45 67",
    propertyId: "property-1",
    monthlyRent: 175000,
    status: "PAID",
  },
  {
    id: "tenant-2",
    firstName: "Awa",
    lastName: "Ndiaye",
    phone: "+221 76 987 65 43",
    propertyId: "property-2",
    monthlyRent: 120000,
    status: "PENDING",
  },
  {
    id: "tenant-3",
    firstName: "Ibrahima",
    lastName: "Sall",
    phone: "+221 70 555 44 33",
    propertyId: "property-3",
    monthlyRent: 450000,
    status: "OVERDUE",
  },
  {
    id: "tenant-4",
    firstName: "Fatou",
    lastName: "Sarr",
    phone: "+221 77 444 11 22",
    propertyId: "property-4",
    monthlyRent: 200000,
    status: "PAID",
  },
];

export const rentPayments: RentPayment[] = tenants.map((tenant, index) => ({
  id: `rent-${index + 1}`,
  tenantId: tenant.id,
  propertyId: tenant.propertyId,
  period: "Juin 2026",
  amount: tenant.monthlyRent,
  dueDate: "2026-06-05",
  status: tenant.status,
}));

export function formatCurrency(amount: number) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function getPropertyById(propertyId: string) {
  return properties.find((property) => property.id === propertyId);
}

export function getOwnerById(ownerId: string) {
  return owners.find((owner) => owner.id === ownerId);
}

export function getTenantById(tenantId: string) {
  return tenants.find((tenant) => tenant.id === tenantId);
}
