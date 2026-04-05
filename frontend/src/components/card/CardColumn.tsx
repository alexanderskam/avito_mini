import { type FC } from 'react';
import type { IItemGlobal } from '../../types/item';
import image from '../../images/no photo.avif';
import { useNavigate } from 'react-router';

interface ICardColumn {
    item: IItemGlobal;
}

const CardColumn: FC<ICardColumn> = ({ item }) => {
    const navigate = useNavigate();
    const getCategory = () => {
        switch (item.category) {
            case 'auto':
                return 'Авто';
            case 'electronics':
                return 'Электроника';
            case 'real_estate':
                return 'Недвижимость';
        }
    };
    return (
        <div
            onClick={() => navigate(`/ads/${item.id}`)}
            className="flex flex-col bg-white rounded-2xl cursor-pointer"
        >
            <div className="relative">
                <img
                    className="rounded-t-2xl w-full h-35 object-cover"
                    src={image}
                    alt="No image"
                />

                <p className="absolute left-4 bottom-0 translate-y-1/2 bg-white border-2 border-gray-300 rounded-md px-2">
                    {getCategory()}
                </p>
            </div>
            <div className="ml-6 mt-6">
                <p>{item.title}</p>
                <p className="text-gray-500 font-medium">{item.price + ' ₽'}</p>

                <div
                    className={`bg-amber-100 text-amber-500 px-2 rounded-md whitespace-nowrap w-fit inline-block mb-4 ${item.needsRevision ? '' : 'invisible'}`}
                >
                    • Требует доработок
                </div>
            </div>
        </div>
    );
};

export default CardColumn;
