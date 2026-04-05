import axios from 'axios';
import type { IOllamaRequest } from '../types/item';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface IOllamaResponse {
    response: string;
}

export const useOllama = () => {
    const [loading, setLoading] = useState<{
        price: boolean;
        description: boolean;
    }>({ price: false, description: false });

    const createPricePrompt = (promptObject: IOllamaRequest): string => {
        let characteristics = '';

        if (promptObject.title)
            characteristics += `Название: ${promptObject.title}, `;
        if (promptObject.description)
            characteristics += `Описание: ${promptObject.description}, `;

        switch (promptObject.category) {
            case 'auto':
                if (!promptObject.params) break;
                const {
                    transmission,
                    brand,
                    model,
                    yearOfManufacture,
                    mileage,
                } = promptObject.params;
                if (brand) characteristics += `Марка: ${brand}, `;
                if (model) characteristics += `Модель: ${model}, `;
                if (yearOfManufacture)
                    characteristics += `Год производства: ${yearOfManufacture}, `;
                if (transmission)
                    characteristics += `Коробка: ${transmission}, `;
                if (mileage) characteristics += `Пробег: ${mileage}. `;
                break;

            case 'electronics':
                if (!promptObject.params) break;
                const {
                    type,
                    brand: eBrand,
                    model: eModel,
                    color,
                    condition,
                } = promptObject.params;
                if (type) characteristics += `Тип: ${type}, `;
                if (eBrand) characteristics += `Марка: ${eBrand}, `;
                if (eModel) characteristics += `Модель: ${eModel}, `;
                if (condition) characteristics += `Состояние: ${condition}, `;
                if (color) characteristics += `Цвет: ${color}. `;
                break;

            case 'real_estate':
                if (!promptObject.params) break;
                const {
                    type: rType,
                    address,
                    floor,
                    area,
                } = promptObject.params;
                if (rType) characteristics += `Тип: ${rType}, `;
                if (address) characteristics += `Адрес: ${address}, `;
                if (floor) characteristics += `Этаж: ${floor}, `;
                if (area) characteristics += `Площадь: ${area} кв.м. `;
                break;

            default:
                break;
        }

        return `Ты - ии-оценщик стоимости. Назови рыночную стоимость данного объявления в российских рублях, опиши свое решение в 120-160 символов. Объявление: ${characteristics}. Если какие-то из характеристик кажутся бесполезными или некорректными, не учитывай их.`;
    };

    const createDescriptionPrompt = (promptObject: IOllamaRequest): string => {
        let characteristics = '';

        if (promptObject.title)
            characteristics += `Название: ${promptObject.title}, `;
        if (promptObject.price)
            characteristics += `Цена: ${promptObject.description}, `;

        switch (promptObject.category) {
            case 'auto':
                if (!promptObject.params) break;
                const {
                    transmission,
                    brand,
                    model,
                    yearOfManufacture,
                    mileage,
                } = promptObject.params;
                if (brand) characteristics += `Марка: ${brand}, `;
                if (model) characteristics += `Модель: ${model}, `;
                if (yearOfManufacture)
                    characteristics += `Год производства: ${yearOfManufacture}, `;
                if (transmission)
                    characteristics += `Коробка: ${transmission}, `;
                if (mileage) characteristics += `Пробег: ${mileage}. `;
                break;

            case 'electronics':
                if (!promptObject.params) break;
                const {
                    type,
                    brand: eBrand,
                    model: eModel,
                    color,
                    condition,
                } = promptObject.params;
                if (type) characteristics += `Тип: ${type}, `;
                if (eBrand) characteristics += `Марка: ${eBrand}, `;
                if (eModel) characteristics += `Модель: ${eModel}, `;
                if (condition) characteristics += `Состояние: ${condition}, `;
                if (color) characteristics += `Цвет: ${color}. `;
                break;

            case 'real_estate':
                if (!promptObject.params) break;
                const {
                    type: rType,
                    address,
                    floor,
                    area,
                } = promptObject.params;
                if (rType) characteristics += `Тип: ${rType}, `;
                if (address) characteristics += `Адрес: ${address}, `;
                if (floor) characteristics += `Этаж: ${floor}, `;
                if (area) characteristics += `Площадь: ${area} кв.м. `;
                break;

            default:
                break;
        }

        return `Ты - ии-помощник редактирования описания. Придумай описание данного объявления, опиши его в 120-160 символов на русском языке. Объявление: ${characteristics}. Если какие-то из характеристик кажутся бесполезными или некорректными, не учитывай их.`;
    };

    const getAiResponse = async (
        promptObject: IOllamaRequest,
        type: 'price' | 'description',
    ) => {
        try {
            setLoading((prev) => {
                return { ...prev, [type]: true };
            });
            const response = await axios.post<IOllamaResponse>(
                'http://localhost:11434/api/generate',
                {
                    model: 'llama3',
                    prompt:
                        type === 'price'
                            ? createPricePrompt(promptObject)
                            : createDescriptionPrompt(promptObject),
                    stream: false,
                },
            );
            console.log(response.data.response);
            return response.data.response;
        } catch (error) {
            console.log(error);
            toast.error('Возникла ошибка при запросе к ии');
        } finally {
            setLoading((prev) => {
                return { ...prev, [type]: false };
            });
        }
    };

    return { request: getAiResponse, isRequestPending: loading };
};
