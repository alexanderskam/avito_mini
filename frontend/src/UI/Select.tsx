import { type FC } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ISelect {
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const Select: FC<ISelect> = ({
    options,
    value,
    onChange = () => {},
    placeholder = 'Сортировать',
    className = '',
}) => {
    return (
        <div className={`relative flex-1 ${className}`}>
            <select
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-gray-200 rounded-xl p-2 pl-3 pr-10 w-full cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option disabled value="">
                    {placeholder}
                </option>

                {options.map((opt, index) => (
                    <option key={index} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                <FaChevronDown />
            </div>
        </div>
    );
};

export default Select;
