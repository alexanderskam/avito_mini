import { type FC } from 'react';
import type { IItemGlobal } from '../../types/item';
import image from '../../images/no photo.avif';
import { useNavigate } from 'react-router';

interface ICardColumn {
    item: IItemGlobal;
}

const CardGrid: FC<ICardColumn> = ({ item }) => {
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
            className="flex w-full h-22/100 bg-white rounded-2xl cursor-pointer mb-2"
        >
            <img className=" w-1/7 rounded-l-2xl" src={image} alt="No image" />
            <div className="ml-6 mt-3">
                <p className="text-gray-500">{getCategory()}</p>
                <p>{item.title}</p>
                <p className="text-gray-500 font-medium">{item.price + ' ₽'}</p>
                {item.needsRevision && (
                    <div className="bg-amber-100 text-amber-500 pl-2 pr-2 rounded-md w-fit">
                        • Требует доработок
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardGrid;
