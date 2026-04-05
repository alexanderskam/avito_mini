import { useNavigate, useParams } from 'react-router';
import { useGetItemQuery } from '../../store/api/api';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import Select from '../../UI/Select';
import { useCategoriser } from '../../hooks/useCategoriser';
import Input from '../../UI/Input';
import { useEffect, useState, type ChangeEventHandler } from 'react';
import { MdClear } from 'react-icons/md';
import Button from '../../UI/Button';
import AutoParams from './AutoParams';
import {
    type AutoItemParamsClient,
    type ElectronicsItemParamsClient,
    type RealEstateItemParamsClient,
} from '../../types/item';
import ElectronicsParams from './ElectronicsParams';
import RealEstateParams from './RealEstateParams';
import { useSubmit } from '../../hooks/useSubmit';
import { useOllama } from '../../hooks/useOllama';
import AiPrice from './ai/AiPrice';
import AiDescription from './ai/AiDescription';

const Edit = () => {
    const queryParams = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { request, isRequestPending } = useOllama();
    const { data, isLoading, isSuccess, isError } = useGetItemQuery({
        id: Number(queryParams.id),
    });
    const { submit, mutationInProgress } = useSubmit(Number(queryParams.id));

    const [params, setParams] = useState<
        | Partial<AutoItemParamsClient>
        | Partial<RealEstateItemParamsClient>
        | Partial<ElectronicsItemParamsClient>
    >({});

    const { category, setCategory, handleParseCategory } = useCategoriser(data);
    const handleChangeCategory = (value: string) => {
        setCategory(value as 'Недвижимость' | 'Электроника' | 'Авто');
        const parsedCategory = handleParseCategory(
            value as 'Недвижимость' | 'Электроника' | 'Авто',
        );
        switch (parsedCategory) {
            case 'auto': {
                const paramsEmptyObject: Partial<AutoItemParamsClient> = {
                    brand: '',
                    model: '',
                    yearOfManufacture: '',
                    transmission: undefined,
                    mileage: '',
                    enginePower: '',
                };
                setParams(paramsEmptyObject);
                break;
            }
            case 'electronics': {
                const paramsEmptyObject: Partial<ElectronicsItemParamsClient> =
                    {
                        brand: '',
                        model: '',
                        type: undefined,
                        condition: undefined,
                        color: '',
                    };
                setParams(paramsEmptyObject);
                break;
            }
            case 'real_estate': {
                const paramsEmptyObject: Partial<RealEstateItemParamsClient> = {
                    type: undefined,
                    address: '',
                    area: '',
                    floor: '',
                };
                setParams(paramsEmptyObject);
                break;
            }

            default:
                break;
        }
    };

    const selectParamsForm = () => {
        if (!category) return;
        switch (handleParseCategory(category)) {
            case 'auto':
                return (
                    <AutoParams
                        params={params as AutoItemParamsClient}
                        setParams={setParams}
                    />
                );
            case 'electronics':
                return (
                    <ElectronicsParams
                        params={params as ElectronicsItemParamsClient}
                        setParams={setParams}
                    />
                );
            case 'real_estate':
                return (
                    <RealEstateParams
                        params={params as RealEstateItemParamsClient}
                        setParams={setParams}
                    />
                );

            default:
                break;
        }
    };

    const [title, setTitle] = useState<string>('');
    const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    };

    const [price, setPrice] = useState<string>('');
    const handleChangePrice: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPrice(e.target.value);
    };

    const [description, setDescription] = useState<string>('');
    const handleChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (
        e,
    ) => {
        setDescription(e.target.value);
    };

    const [aiPrice, setAiPrice] = useState<string>('');
    const [aiDescription, setAiDescription] = useState<string>('');

    useEffect(() => {
        if (data && data.title) setTitle(data.title);
        if (data && data.price) setPrice(data.price.toString());
        if (data && data.description) setDescription(data.description);
        if (data && data.params) setParams(data.params);
    }, [data]);

    return (
        <div className="flex w-full">
            {isLoading && (
                <div className="flex w-full h-screen">
                    <LoadingState />
                </div>
            )}
            {isError && (
                <div className="flex w-full h-screen">
                    <ErrorState />
                </div>
            )}
            {isSuccess && data && (
                <div className="w-full m-8 flex flex-col">
                    <h2 className="font-medium text-3xl mb-3">
                        Редактирование объявления
                    </h2>
                    <hr className="w-full text-gray-300"></hr>
                    <p className="font-medium mt-3 mb-2">Категория</p>
                    <div className="mb-3">
                        <Select
                            className="w-2/8"
                            value={category ? category : ''}
                            options={['Недвижимость', 'Электроника', 'Авто']}
                            onChange={handleChangeCategory}
                        />
                    </div>
                    <hr className="w-full text-gray-300"></hr>
                    <p className="font-medium mt-1 mb-2">
                        <span className="text-red-500">* </span>Название
                    </p>
                    <Input
                        value={title}
                        placeholder="Введите название"
                        className={`w-1/2 mb-3 ${!title ? 'border rounded-xl border-red-500' : ''}`}
                        onChange={handleChangeTitle}
                        decoration={
                            <MdClear
                                className="cursor-pointer"
                                onClick={() => setTitle('')}
                            />
                        }
                    />
                    <hr className="w-full text-gray-300"></hr>
                    <p className="font-medium mt-3 mb-2">
                        <span className="text-red-500">* </span>Цена
                    </p>
                    <div className="w-full flex mb-3">
                        <Input
                            value={price}
                            placeholder="Введите цену"
                            className={`w-1/2 ${!Number(price) || !price ? 'border rounded-xl border-red-500' : ''}`}
                            onChange={handleChangePrice}
                            decoration={
                                <MdClear
                                    className="cursor-pointer"
                                    onClick={() => setPrice('')}
                                />
                            }
                        />
                        <AiPrice
                            aiPrice={aiPrice}
                            setAiPrice={setAiPrice}
                            category={category}
                            params={params}
                            isRequestPending={isRequestPending.price}
                            title={title}
                            request={request}
                            price={price}
                            description={description}
                            handleParseCategory={handleParseCategory}
                        />
                    </div>
                    <hr className="w-full text-gray-300"></hr>
                    <p className="font-medium mt-3 mb-2">Характеристики</p>
                    {selectParamsForm()}
                    <p className="font-medium mt-3 mb-2">Описание</p>
                    <textarea
                        value={description}
                        onChange={handleChangeDescription}
                        placeholder="Введите описание"
                        maxLength={1000}
                        className={`border bg-gray-200 rounded-2xl w-2/3 p-4 ${!description ? 'border-amber-300' : 'border-gray-300'}`}
                    />
                    <AiDescription
                        aiDescription={aiDescription}
                        setAiDescription={setAiDescription}
                        category={category}
                        params={params}
                        isRequestPending={isRequestPending.description}
                        title={title}
                        request={request}
                        price={price}
                        description={description}
                        handleParseCategory={handleParseCategory}
                    />
                    <div className="flex gap-2 mt-8">
                        <Button
                            className={` text-white  w-fit ${!title || !price ? 'bg-red-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                            content={
                                mutationInProgress ? 'Загрузка...' : 'Сохранить'
                            }
                            disabled={!title || !price || mutationInProgress}
                            onClick={() => {
                                if (!category) return;
                                submit({
                                    category: handleParseCategory(category),
                                    params,
                                    title,
                                    price,
                                    description,
                                });
                            }}
                        />
                        <Button
                            onClick={() => navigate(`/ads/${queryParams.id}`)}
                            className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-fit"
                            content="Отменить"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Edit;
