export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  salePrice: number;
  onSale: boolean;
  category: Category;
  quantity: number;
  imageUrl: string;
}

export enum Category {
  Electronics = 'Electronics',
  Accessories = 'Accessories',
  Storage = 'Storage',
  Wearables = 'Wearables',
  PersonalCare = 'Personal Care',
  KitchenAppliances = 'Kitchen Appliances',
  HomeAppliances = 'Home Appliances',
  Transportation = 'Transportation',
  Photography = 'Photography',
  Computers = 'Computers',
  HomeAutomation = 'Home Automation',
  Furniture = 'Furniture',
  MusicalInstruments = 'Musical Instruments',
}
