import { toast } from 'react-toastify';
import type {
    AutoItemParams,
    AutoItemParamsClient,
    ElectronicsItemParams,
    ElectronicsItemParamsClient,
    IItemUpdateBody,
    RealEstateItemParams,
    RealEstateItemParamsClient,
} from '../types/item';
import { useUpdateItemMutation } from '../store/api/api';
import { useNavigate } from 'react-router';

interface ISubmitObject {
    params:
        | Partial<AutoItemParamsClient>
        | Partial<RealEstateItemParamsClient>
        | Partial<ElectronicsItemParamsClient>;
    category: 'electronics' | 'auto' | 'real_estate';
    title: string;
    price: string;
    description: string;
}

export const useSubmit = (id: number) => {
    const [updateItem, { isLoading }] = useUpdateItemMutation();
    const navigate = useNavigate();
    const submit = async (submitObject: ISubmitObject) => {
        console.log(submitObject);
        const mutationObject: IItemUpdateBody = {
            params: {},
            category: submitObject.category,
            title: submitObject.title,
        };
        if (submitObject.description)
            mutationObject.description = submitObject.description;
        if (Number(submitObject.price))
            mutationObject.price = Number(submitObject.price);
        else {
            toast.error('Цена должна быть числовым значением');
            return;
        }
        switch (submitObject.category) {
            case 'auto': {
                if (
                    (submitObject.params as Partial<AutoItemParamsClient>).brand
                )
                    (mutationObject.params as AutoItemParams).brand = (
                        submitObject.params as Partial<AutoItemParamsClient>
                    ).brand;

                if (
                    (submitObject.params as Partial<AutoItemParamsClient>)
                        .enginePower
                ) {
                    if (
                        !Number(
                            (
                                submitObject.params as Partial<AutoItemParamsClient>
                            ).enginePower,
                        )
                    ) {
                        toast.error('Мощность должна быть числовым значенем');
                        return;
                    }
                    (mutationObject.params as AutoItemParams).enginePower =
                        Number(
                            (
                                submitObject.params as Partial<AutoItemParamsClient>
                            ).enginePower,
                        );
                }

                if (
                    (submitObject.params as Partial<AutoItemParamsClient>)
                        .yearOfManufacture
                ) {
                    if (
                        !Number(
                            (
                                submitObject.params as Partial<AutoItemParamsClient>
                            ).yearOfManufacture,
                        )
                    ) {
                        toast.error(
                            'Год выпуска должен быть числовым значением',
                        );
                        return;
                    }
                    (
                        mutationObject.params as AutoItemParams
                    ).yearOfManufacture = Number(
                        (submitObject.params as Partial<AutoItemParamsClient>)
                            .yearOfManufacture,
                    );
                }

                if (
                    (submitObject.params as Partial<AutoItemParamsClient>)
                        .transmission
                )
                    (mutationObject.params as AutoItemParams).transmission = (
                        submitObject.params as Partial<AutoItemParamsClient>
                    ).transmission;

                if (
                    (submitObject.params as Partial<AutoItemParamsClient>).model
                )
                    (mutationObject.params as AutoItemParams).model = (
                        submitObject.params as Partial<AutoItemParamsClient>
                    ).model;

                if (
                    (submitObject.params as Partial<AutoItemParamsClient>)
                        .mileage
                ) {
                    if (
                        !Number(
                            (
                                submitObject.params as Partial<AutoItemParamsClient>
                            ).mileage,
                        )
                    ) {
                        toast.error('Пробег должен быть числовым значенем');
                        return;
                    }
                    (mutationObject.params as AutoItemParams).mileage = Number(
                        (submitObject.params as Partial<AutoItemParamsClient>)
                            .mileage,
                    );
                }

                break;
            }

            case 'real_estate': {
                if (
                    (submitObject.params as Partial<RealEstateItemParamsClient>)
                        .floor
                ) {
                    if (
                        !Number(
                            (
                                submitObject.params as Partial<RealEstateItemParamsClient>
                            ).floor,
                        )
                    ) {
                        toast.error('Этаж должен быть числовым значенем');
                        return;
                    }
                    (mutationObject.params as RealEstateItemParams).floor =
                        Number(
                            (
                                submitObject.params as Partial<RealEstateItemParamsClient>
                            ).floor,
                        );
                }

                if (
                    (submitObject.params as Partial<RealEstateItemParamsClient>)
                        .area
                ) {
                    if (
                        !Number(
                            (
                                submitObject.params as Partial<RealEstateItemParamsClient>
                            ).area,
                        )
                    ) {
                        toast.error('Площадь должна быть числовым значенем');
                        return;
                    }
                    (mutationObject.params as RealEstateItemParams).area =
                        Number(
                            (
                                submitObject.params as Partial<RealEstateItemParamsClient>
                            ).area,
                        );
                }

                if (
                    (submitObject.params as Partial<RealEstateItemParamsClient>)
                        .type
                )
                    (mutationObject.params as RealEstateItemParams).type = (
                        submitObject.params as Partial<RealEstateItemParamsClient>
                    ).type;

                if (
                    (submitObject.params as Partial<RealEstateItemParamsClient>)
                        .address
                )
                    (mutationObject.params as RealEstateItemParams).address = (
                        submitObject.params as Partial<RealEstateItemParamsClient>
                    ).address;
                break;
            }

            case 'electronics': {
                if (
                    (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).brand
                )
                    (mutationObject.params as ElectronicsItemParams).brand = (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).brand;

                if (
                    (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).model
                )
                    (mutationObject.params as ElectronicsItemParams).model = (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).model;

                if (
                    (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).color
                )
                    (mutationObject.params as ElectronicsItemParams).color = (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).color;

                if (
                    (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).condition
                )
                    (mutationObject.params as ElectronicsItemParams).condition =
                        (
                            submitObject.params as Partial<ElectronicsItemParamsClient>
                        ).condition;

                if (
                    (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).type
                )
                    (mutationObject.params as ElectronicsItemParams).type = (
                        submitObject.params as Partial<ElectronicsItemParamsClient>
                    ).type;
                break;
            }

            default:
                break;
        }
        console.log(mutationObject);
        try {
            await updateItem({ id, data: mutationObject });
            toast.success('Объявление успешно обновлено');
            navigate(`/ads/${id}`);
        } catch (error) {
            console.log(error);
            toast.error('Возникла ошибка');
        }
    };

    return { submit, mutationInProgress: isLoading };
};
