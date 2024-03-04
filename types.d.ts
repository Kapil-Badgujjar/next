interface ProductType {
    id: string;
    image: string;
    productName: string;
    price: number; // Use 'number' for primitive type
    category: string;
    description: string;
    stocks: number;
    sellerId: string;
    offer: number;
    isAssured: boolean;
    isActive: boolean;
    otherSpecifications: Record<string, unknown>; // Use for flexibility
  }