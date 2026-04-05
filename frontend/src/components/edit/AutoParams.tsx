import type { FC } from 'react';
import type {
    AutoItemParamsClient,
    ElectronicsItemParamsClient,
    RealEstateItemParamsClient,
} from '../../types/item';
import Input from '../../UI/Input';
import { MdClear } from 'react-icons/md';
import Select from '../../UI/Select';

interface IAutoParams {
    params: AutoItemParamsClient;
    setParams: React.Dispatch<
        React.SetStateAction<
            | Partial<AutoItemParamsClient>
            | Partial<RealEstateItemParamsClient>
            | Partial<ElectronicsItemParamsClient>
        >
    >;
}

const AutoParams: FC<IAutoParams> = ({ params, setParams }) => {
    const handleChangeTransmission = (value: string) => {
        switch (value) {
            case 'Автомат':
                setParams({ ...params, transmission: 'automatic' });
                break;
            case 'Механика':
                setParams({ ...params, transmission: 'manual' });
                break;
            default:
                break;
        }
    };

    const getTransmission = () => {
        switch (params.transmission) {
            case 'automatic':
                return 'Автомат';
            case 'manual':
                return 'Механика';

            default:
                break;
        }
    };
    return (
        <div className="w-full">
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

            <p className="font-medium mt-1 mb-2">Год выпуска</p>
            <Input
                value={params.yearOfManufacture}
                placeholder="Введите год выпуска"
                className={`w-1/2 mb-3 ${!params.yearOfManufacture ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, yearOfManufacture: e.target.value })
                }
                decoration={
                    <MdClear
                        name=""
                        className="cursor-pointer"
                        onClick={() =>
                            setParams({ ...params, yearOfManufacture: '' })
                        }
                    />
                }
            />

            <p className="font-medium mt-3 mb-2">Трансмиссия</p>
            <div className="mb-3">
                <Select
                    className="w-2/8"
                    placeholder="Выбрать тип"
                    options={['Автомат', 'Механика']}
                    value={getTransmission()}
                    onChange={handleChangeTransmission}
                />
            </div>

            <p className="font-medium mt-1 mb-2">Пробег</p>
            <Input
                value={params.mileage}
                placeholder="Введите пробег"
                className={`w-1/2 mb-3 ${!params.mileage ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, mileage: e.target.value })
                }
                decoration={
                    <MdClear
                        name="mileage"
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, mileage: '' })}
                    />
                }
            />

            <p className="font-medium mt-1 mb-2">Мощность</p>
            <Input
                value={params.enginePower}
                placeholder="Введите мощность"
                className={`w-1/2 mb-3 ${!params.enginePower ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, enginePower: e.target.value })
                }
                decoration={
                    <MdClear
                        name="enginePower"
                        className="cursor-pointer"
                        onClick={() =>
                            setParams({ ...params, enginePower: '' })
                        }
                    />
                }
            />
        </div>
    );
};

export default AutoParams;
