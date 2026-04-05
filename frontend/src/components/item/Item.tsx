import { useNavigate, useParams } from 'react-router';
import { useGetItemQuery } from '../../store/api/api';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import Button from '../../UI/Button';
import { CiEdit } from 'react-icons/ci';
import { parseDate } from '../../utils/parseDate';
import image from '../../images/no photo.avif';
import Revision from './Revision';
import type {
    AutoItemParams,
    ElectronicsItemParams,
    RealEstateItemParams,
} from '../../types/item';
import { getCharacteristics } from '../../utils/getCharacteristics';
import { getClientCharacteristic } from '../../utils/getClientCharacteristic';
import { useEffect } from 'react';

const Item = () => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isSuccess, isError } = useGetItemQuery({
        id: Number(params.id),
    });
    const images = [image, image, image];
    useEffect(() => {
        if (!Number(params.id)) navigate('/ads');
    });
    return (
        <div className="flex w-full h-screen">
            {isLoading && <LoadingState />}
            {isError && <ErrorState />}
            {isSuccess && data && (
                <div className="w-full m-8 flex flex-col">
                    <div className="flex w-full justify-between">
                        <h2 className="text-2xl font-medium">{data.title}</h2>
                        <h2 className="text-2xl font-medium">
                            {data.price + ' ₽'}
                        </h2>
                    </div>
                    <div className="flex w-full justify-between items-center mt-2">
                        <Button
                            onClick={() => {
                                navigate(`/ads/${data.id}/edit`);
                            }}
                            content="Редактировать"
                            decoration={<CiEdit />}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                        <div className="text-gray-500 flex flex-col">
                            <p className="ml-auto">
                                {'Опубликовано: ' + parseDate(data.createdAt)}
                            </p>
                            <p className="ml-auto">
                                {'Отредактировано: ' +
                                    parseDate(data.updatedAt)}
                            </p>
                        </div>
                    </div>
                    <hr className="w-full text-gray-300 mt-6 mb-6"></hr>
                    <div className="flex h-1/2 overflow-hidden">
                        <div
                            className={`w-1/2 ${images.length > 1 ? 'overflow-y-auto' : ''}`}
                        >
                            <div className="grid grid-cols-3 gap-2 auto-rows-max">
                                <div className="col-span-3">
                                    <img
                                        src={images[0]}
                                        className={
                                            images.length > 1
                                                ? 'w-full object-cover rounded'
                                                : ''
                                        }
                                    />
                                </div>

                                {images.slice(1).map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        className="w-full object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className=" ml-6">
                            {data.needsRevision && (
                                <Revision
                                    description={data.description}
                                    item={
                                        {
                                            category: data.category,
                                            params: data.params,
                                        } as
                                            | {
                                                  category: 'auto';
                                                  params: AutoItemParams;
                                              }
                                            | {
                                                  category: 'real_estate';
                                                  params: RealEstateItemParams;
                                              }
                                            | {
                                                  category: 'electronics';
                                                  params: ElectronicsItemParams;
                                              }
                                    }
                                />
                            )}
                            <h2 className="text-xl font-medium mt-6">
                                Характеристики
                            </h2>
                            <div className="grid grid-cols-1 gap-x-4">
                                {getCharacteristics({
                                    category: data.category,
                                    params: data.params,
                                } as
                                    | {
                                          category: 'auto';
                                          params: AutoItemParams;
                                      }
                                    | {
                                          category: 'real_estate';
                                          params: RealEstateItemParams;
                                      }
                                    | {
                                          category: 'electronics';
                                          params: ElectronicsItemParams;
                                      }).map((characteristic, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-[150px_1fr] gap-x-4 py-1"
                                    >
                                        <p className="text-gray-400">
                                            {characteristic.name}
                                        </p>
                                        <p>
                                            {getClientCharacteristic(
                                                characteristic.desc,
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-medium mt-6 mb-6">Описание</h2>
                    {data.description == '' ||
                    data.description === undefined ? (
                        <p>Описание не добавлено</p>
                    ) : (
                        <p>{data.description}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Item;
