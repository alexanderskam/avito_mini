import { type FC } from 'react';
import Button from '../../../UI/Button';
import { VscLightbulbEmpty } from 'react-icons/vsc';
import type {
    AutoItemParamsClient,
    ElectronicsItemParamsClient,
    IOllamaRequest,
    RealEstateItemParamsClient,
} from '../../../types/item';
import { toast } from 'react-toastify';

interface IAiPrice {
    aiDescription: string;
    isRequestPending: boolean;
    category: 'Недвижимость' | 'Электроника' | 'Авто' | null;
    request: (
        promptObject: IOllamaRequest,
        type: 'price' | 'description',
    ) => Promise<string | undefined>;
    params:
        | Partial<AutoItemParamsClient>
        | Partial<RealEstateItemParamsClient>
        | Partial<ElectronicsItemParamsClient>;
    title: string;
    price: string;
    description: string;
    handleParseCategory: (
        category: 'Недвижимость' | 'Электроника' | 'Авто',
    ) => 'auto' | 'real_estate' | 'electronics';
    setAiDescription: React.Dispatch<React.SetStateAction<string>>;
}

const AiDescription: FC<IAiPrice> = ({
    aiDescription,
    isRequestPending,
    category,
    request,
    params,
    title,
    price,
    description,
    handleParseCategory,
    setAiDescription,
}) => {
    return (
        <div className="mt-4 relative flex flex-col items-start w-full">
            {aiDescription && (
                <div
                    className="absolute top-0 left-60 mr-2 p-2 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded cursor-copy"
                    onClick={() => {
                        if (aiDescription) {
                            navigator.clipboard
                                .writeText(aiDescription)
                                .then(() => {
                                    toast.info('Описание скопировано!');
                                    setAiDescription('');
                                })
                                .catch((err) =>
                                    console.error('Ошибка копирования: ', err),
                                );
                        }
                    }}
                >
                    {aiDescription}
                </div>
            )}
            <Button
                className={`${
                    isRequestPending
                        ? 'bg-gray-400 text-black'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-600'
                }`}
                content={
                    isRequestPending
                        ? 'Ассистент думает...'
                        : `Придумать описание`
                }
                decoration={
                    !isRequestPending && (
                        <VscLightbulbEmpty className="text-amber-600" />
                    )
                }
                onClick={async () => {
                    if (isRequestPending || !category) return;
                    const response = await request(
                        {
                            category: handleParseCategory(category),
                            params,
                            title,
                            price,
                            description,
                        } as IOllamaRequest,
                        'description',
                    );
                    if (response) setAiDescription(response);
                }}
            />
        </div>
    );
};

export default AiDescription;
