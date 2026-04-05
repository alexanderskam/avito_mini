import { useEffect, useState } from 'react';

export const useDebounce = (value: string, callback: () => void) => {
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
            callback();
        }, 300);
        return () => clearTimeout(timeout);
    }, [value]);
    return debouncedValue;
};
