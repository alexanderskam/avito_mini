import type { FC } from 'react';
import type {
    AutoItemParamsClient,
    ElectronicsItemParamsClient,
    RealEstateItemParamsClient,
} from '../../types/item';
import Select from '../../UI/Select';
import Input from '../../UI/Input';
import { MdClear } from 'react-icons/md';

interface IRealEstateParams {
    params: RealEstateItemParamsClient;
    setParams: React.Dispatch<
        React.SetStateAction<
            | Partial<AutoItemParamsClient>
            | Partial<RealEstateItemParamsClient>
            | Partial<ElectronicsItemParamsClient>
        >
    >;
}

const RealEstateParams: FC<IRealEstateParams> = ({ params, setParams }) => {
    const handleChangeType = (value: string) => {
        switch (value) {
            case 'Комната':
                setParams({ ...params, type: 'room' });
                break;
            case 'Квартира':
                setParams({ ...params, type: 'flat' });
                break;
            case 'Дом':
                setParams({ ...params, type: 'house' });
                break;
            default:
                break;
        }
    };

    const getType = () => {
        switch (params.type) {
            case 'flat':
                return 'Квартира';
            case 'house':
                return 'Дом';
            case 'room':
                return 'Комната';

            default:
                break;
        }
    };
    return (
        <div className="w-full">
            <p className="font-medium mt-3 mb-2">Тип</p>
            <div className="mb-3">
                <Select
                    className="w-2/8"
                    placeholder="Выбрать тип"
                    options={['Квартира', 'Дом', 'Комната']}
                    value={getType()}
                    onChange={handleChangeType}
                />
            </div>

            <p className="font-medium mt-1 mb-2">Адрес</p>
            <Input
                value={params.address}
                placeholder="Введите адрес"
                className={`w-1/2 mb-3 ${!params.address ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, address: e.target.value })
                }
                decoration={
                    <MdClear
                        name="brand"
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, address: '' })}
                    />
                }
            />

            <p className="font-medium mt-1 mb-2">Этаж</p>
            <Input
                value={params.floor}
                placeholder="Введите этаж"
                className={`w-1/2 mb-3 ${!params.floor ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) =>
                    setParams({ ...params, floor: e.target.value })
                }
                decoration={
                    <MdClear
                        name=""
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, floor: '' })}
                    />
                }
            />

            <p className="font-medium mt-1 mb-2">Площадь</p>
            <Input
                value={params.area}
                placeholder="Введите площадь"
                className={`w-1/2 mb-3 ${!params.area ? 'border rounded-xl border-yellow-500' : ''}`}
                onChange={(e) => setParams({ ...params, area: e.target.value })}
                decoration={
                    <MdClear
                        name=""
                        className="cursor-pointer"
                        onClick={() => setParams({ ...params, area: '' })}
                    />
                }
            />
        </div>
    );
};

export default RealEstateParams;
