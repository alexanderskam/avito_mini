import React, { type FC } from 'react';
import type {
    AutoItemParamsClient,
    ElectronicsItemParamsClient,
    RealEstateItemParamsClient,
} from '../../types/item';
import Select from '../../UI/Select';
import Input from '../../UI/Input';
import { MdClear } from 'react-icons/md';

interface IElectronicParams {
    params: ElectronicsItemParamsClient;
    setParams: React.Dispatch<
        React.SetStateAction<
            | Partial<AutoItemParamsClient>
            | Partial<RealEstateItemParamsClient>
            | Partial<ElectronicsItemParamsClient>
        >
    >;
}

const ElectronicsParams: FC<IElectronicParams> = ({ params, setParams }) => {
    const handleChangeType = (value: string) => {
        switch (value) {
            case 'Смартфон':
                setParams({ ...params, type: 'phone' });
                break;
            case 'Ноутбук':
                setParams({ ...params, type: 'laptop' });
                break;
            case 'Другое':
                setParams({ ...params, type: 'misc' });
                break;
            default:
                break;
        }
    };

    const getType = () => {
        switch (params.type) {
            case 'phone':
                return 'Смартфон';
            case 'laptop':
                return 'Ноутбук';
            case 'misc':
                return 'Другое';

            default:
                break;
        }
    };

    const handleChangeCondition = (value: string) => {
        switch (value) {
            case 'Новое':
                setParams({ ...params, condition: 'new' });
                break;
            case 'Б/у':
                setParams({ ...params, condition: 'used' });
                break;
            default:
                break;
        }
    };

    const getCondition = () => {
        switch (params.condition) {
            case 'new':
                return 'Новое';
            case 'used':
                return 'Б/у';
            default:
                break;
        }
    };

    return (
        <div className="w-full">
            <p className="font-medium mt-3 mb-2">Тип устройства</p>
            <div className="mb-3">
                <Select
                    className="w-2/8"
                    placeholder="Выбрать тип"
                    options={['Смартфон', 'Ноутбук', 'Другое']}
                    value={getType()}
                    onChange={handleChangeType}
                />
            </div>

            <p className="font-medium mt-1 mb-2">Название марки</p>
            <Input
                value={params.brand}
                placeholder="Введите марку"
                className={`w-1/2 mb-3 ${!params.brand ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, brand: e.target.value })
                }
                decoration={
                    <MdClear
                        name="brand"
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, brand: '' })}
                    />
                }
            />

            <p className="font-medium mt-1 mb-2">Название модели</p>
            <Input
                value={params.model}
                placeholder="Введите модель"
                className={`w-1/2 mb-3 ${!params.model ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, model: e.target.value })
                }
                decoration={
                    <MdClear
                        name="model"
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, model: '' })}
                    />
                }
            />

            <p className="font-medium mt-3 mb-2">Состояние</p>
            <div className="mb-3">
                <Select
                    className="w-2/8"
                    placeholder="Выбрать состояние"
                    options={['Новое', 'Б/у']}
                    value={getCondition()}
                    onChange={handleChangeCondition}
                />
            </div>

            <p className="font-medium mt-1 mb-2">Цвет</p>
            <Input
                value={params.color}
                placeholder="Введите цвет"
                className={`w-1/2 mb-3 ${!params.color ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, color: e.target.value })
                }
                decoration={
                    <MdClear
                        name="color"
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, color: '' })}
                    />
                }
            />
        </div>
    );
};

export default ElectronicsParams;
