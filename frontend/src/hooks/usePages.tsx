import { useEffect, useState } from 'react';

export const usePages = (
    total: number | undefined,
    modeArray: {
        content: React.ReactNode;
        isSelected: boolean;
        desc: 'grid' | 'column';
    }[],
) => {
    const [pagesAmount, setPagesAmount] = useState<number>(-1);
    useEffect(() => {
        const mode = modeArray.find((el) => el.isSelected === true);
        console.log(mode);
        if (mode && total) {
            switch (mode.desc) {
                case 'column':
                    setPagesAmount(Math.ceil(total / 10));
                    break;
                case 'grid':
                    setPagesAmount(Math.ceil(total / 4));
                    break;
            }
        }
    }, [modeArray, total]);

    return pagesAmount;
};
