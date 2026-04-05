import { useEffect, useState } from 'react';
import type { IItemOne } from '../types/item';

export const useCategoriser = (data: IItemOne | undefined) => {
    const [category, setCategory] = useState<
        'Недвижимость' | 'Электроника' | 'Авто' | null
    >(null);

    useEffect(() => {
        function getCategory(): 'Недвижимость' | 'Электроника' | 'Авто' | null {
            if (!data || !data.category) return null;
            switch (data.category) {
                case 'real_estate':
                    return 'Недвижимость';

                case 'auto':
                    return 'Авто';

                case 'electronics':
                    return 'Электроника';

                default:
                    return null;
            }
        }
        setCategory(getCategory());
    }, [data]);

    const handleParseCategory = (
        category: 'Недвижимость' | 'Электроника' | 'Авто',
    ) => {
        switch (category) {
            case 'Недвижимость':
                return 'real_estate';
            case 'Электроника':
                return 'electronics';
            case 'Авто':
                return 'auto';

            default:
                return 'auto';
        }
    };

    return { category, setCategory, handleParseCategory };
};
