import type {
    AutoItemParams,
    ElectronicsItemParams,
    RealEstateItemParams,
} from '../types/item';

export const getCharacteristics = (
    item:
        | { category: 'auto'; params: AutoItemParams }
        | { category: 'real_estate'; params: RealEstateItemParams }
        | { category: 'electronics'; params: ElectronicsItemParams },
) => {
    const characteristics: { name: string; desc: string }[] = [];
    switch (item.category) {
        case 'auto': {
            const requiredKeys: { name: keyof AutoItemParams; desc: string }[] =
                [
                    { name: 'brand', desc: 'Марка' },
                    { name: 'model', desc: 'Модель' },
                    { name: 'yearOfManufacture', desc: 'Год выпуска' },
                    { name: 'enginePower', desc: 'Мощность двигателя' },
                    { name: 'mileage', desc: 'Пробег' },
                    { name: 'transmission', desc: 'Коробка передач' },
                ];
            Object.keys(item.params).map((param) => {
                const paramToPush = requiredKeys.find(
                    (key) => key.name === param,
                );
                if (!paramToPush) return;
                characteristics.push({
                    name: paramToPush.desc,
                    desc: item.params[paramToPush.name]!.toString(),
                });
            });
            break;
        }

        case 'real_estate': {
            const requiredKeys: {
                name: keyof RealEstateItemParams;
                desc: string;
            }[] = [
                { name: 'type', desc: 'Тип недвижимости' },
                { name: 'address', desc: 'Адрес' },
                { name: 'area', desc: 'Площадь' },
                { name: 'floor', desc: 'Этаж' },
            ];
            Object.keys(item.params).map((param) => {
                const paramToPush = requiredKeys.find(
                    (key) => key.name === param,
                );
                if (!paramToPush) return;
                characteristics.push({
                    name: paramToPush.desc,
                    desc: item.params[paramToPush.name]!.toString(),
                });
            });
            break;
        }

        case 'electronics': {
            const requiredKeys: {
                name: keyof ElectronicsItemParams;
                desc: string;
            }[] = [
                { name: 'type', desc: 'Тип устройства' },
                { name: 'brand', desc: 'Марка' },
                { name: 'model', desc: 'Модель' },
                { name: 'condition', desc: 'Состояние' },
                { name: 'color', desc: 'Цвет' },
            ];
            Object.keys(item.params).map((param) => {
                const paramToPush = requiredKeys.find(
                    (key) => key.name === param,
                );
                if (!paramToPush) return;
                characteristics.push({
                    name: paramToPush.desc,
                    desc: item.params[paramToPush.name]!.toString(),
                });
            });
            break;
        }
    }
    return characteristics;
};
