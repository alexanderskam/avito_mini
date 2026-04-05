import { type FC } from 'react';
import Button from '../../../UI/Button';
import { VscLightbulbEmpty } from 'react-icons/vsc';
import type {
    AutoItemParamsClient,
    ElectronicsItemParamsClient,
    IOllamaRequest,
    RealEstateItemParamsClient,
} from '../../../types/item';

interface IAiPrice {
    aiPrice: string;
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
    setAiPrice: React.Dispatch<React.SetStateAction<string>>;
}

const AiPrice: FC<IAiPrice> = ({
    aiPrice,
    isRequestPending,
    category,
    request,
    params,
    title,
    price,
    description,
    handleParseCategory,
    setAiPrice,
}) => {
    return (
        <div className="relative flex flex-col items-start w-1/2">
            {aiPrice && (
                <div className="absolute mb-2 bottom-full left-5 p-2 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded transform -translate-y-2">
                    {aiPrice}
                </div>
            )}
            <Button
                className={` ml-4 ${isRequestPending ? 'bg-gray-400 text-black' : 'bg-amber-100 hover:bg-amber-200 text-amber-600'}`}
                content={
                    isRequestPending
                        ? 'Ассистент думает...'
                        : `Узнать рыночную цену`
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
                        'price',
                    );
                    if (response) setAiPrice(response);
                }}
            />
        </div>
    );
};

export default AiPrice;
