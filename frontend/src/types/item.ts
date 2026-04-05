export interface IItemGlobal {
    category: 'auto' | 'real_estate' | 'electronics';
    title: string;
    price: number;
    id: number;
    // Требуются ли доработки
    needsRevision: boolean;
}

export interface IItemsResponse {
    items: IItemGlobal[];
    total: number;
}

export interface IItemOne {
    id: number;
    category: 'auto' | 'real_estate' | 'electronics';
    title: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    params: {
        type: string;
        brand: string;
        model: string;
        condition: string;
        color: string;
    };
    needsRevision: boolean;
}

export type AutoItemParams = {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
};

export type RealEstateItemParams = {
    type?: 'flat' | 'house' | 'room';
    address?: string;
    area?: number;
    floor?: number;
};

export type ElectronicsItemParams = {
    type?: 'phone' | 'laptop' | 'misc';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
};

export type IItemUpdateBody =
    | {
          category: 'auto';
          title?: string;
          description?: string;
          price?: number | null;
          params?: Partial<AutoItemParams>;
      }
    | {
          category: 'real_estate';
          title?: string;
          description?: string;
          price?: number | null;
          params?: Partial<RealEstateItemParams>;
      }
    | {
          category: 'electronics';
          title?: string;
          description?: string;
          price?: number | null;
          params?: Partial<ElectronicsItemParams>;
      };

export type AutoItemParamsClient = {
    brand: string;
    model: string;
    yearOfManufacture: string;
    transmission: 'automatic' | 'manual';
    mileage: string;
    enginePower: string;
};

export type RealEstateItemParamsClient = {
    type: 'flat' | 'house' | 'room';
    address: string;
    area: string;
    floor: string;
};

export type ElectronicsItemParamsClient = {
    type: 'phone' | 'laptop' | 'misc';
    brand: string;
    model: string;
    condition: 'new' | 'used';
    color: string;
};

export type IOllamaRequest =
    | {
          category: 'auto';
          title?: string;
          description?: string;
          price?: string | null;
          params?: Partial<AutoItemParamsClient>;
      }
    | {
          category: 'real_estate';
          title?: string;
          description?: string;
          price?: string | null;
          params?: Partial<RealEstateItemParamsClient>;
      }
    | {
          category: 'electronics';
          title?: string;
          description?: string;
          price?: string | null;
          params?: Partial<ElectronicsItemParamsClient>;
      };
