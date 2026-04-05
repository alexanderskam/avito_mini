import type {
    AutoItemParams,
    ElectronicsItemParams,
    RealEstateItemParams,
} from '../types/item';

export const needsRevision = (
    description: string,
    item:
        | { category: 'auto'; params: AutoItemParams }
        | { category: 'real_estate'; params: RealEstateItemParams }
        | { category: 'electronics'; params: ElectronicsItemParams },
) => {
    const revisions: string[] = [];

    if (!description || description.trim() === '') revisions.push('Описание');

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
            requiredKeys.forEach((key) => {
                if (
                    !(key.name in item.params) ||
                    item.params[key.name] === '' ||
                    item.params[key.name] === undefined
                )
                    revisions.push(key.desc);
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
            requiredKeys.forEach((key) => {
                if (
                    !(key.name in item.params) ||
                    item.params[key.name] === '' ||
                    item.params[key.name] === undefined
                )
                    revisions.push(key.desc);
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
            requiredKeys.forEach((key) => {
                if (
                    !(key.name in item.params) ||
                    item.params[key.name] === '' ||
                    item.params[key.name] === undefined
                )
                    revisions.push(key.desc);
            });
            break;
        }
    }

    return revisions;
};
