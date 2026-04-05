export const getClientCharacteristic = (desc: string) => {
    console.log(desc);
    switch (desc) {
        case 'automatic':
            return 'Автомат';
        case 'manual':
            return 'Механика';
        case 'new':
            return 'Новое';
        case 'used':
            return 'Б/у';
        case 'flat':
            return 'Квартира';
        case 'house':
            return 'Дом';
        case 'room':
            return 'Квартира';
        case 'phone':
            return 'Смартфон';
        case 'laptop':
            return 'Ноутбук';
        case 'misc':
            return 'Другое';
        default:
            return desc;
    }
};
