import type React from 'react';
import type { FC } from 'react';

interface ISwitch {
    switches: {
        content: React.ReactNode;
        isSelected: boolean;
        desc: 'grid' | 'column';
    }[];
    setSwitches: React.Dispatch<
        React.SetStateAction<
            {
                content: React.ReactNode;
                isSelected: boolean;
                desc: 'grid' | 'column';
            }[]
        >
    >;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Switch: FC<ISwitch> = ({ switches, setSwitches, setPage }) => {
    const handleClick = (index: number) => {
        const newSwitches = switches.map((item, i) => ({
            ...item,
            isSelected: i === index,
        }));
        setSwitches(newSwitches);
        setPage(1);
    };

    return (
        <div className="flex items-center bg-gray-200 p-1 rounded-xl">
            {switches.map((item, index) => (
                <div
                    className={`flex items-center cursor-pointer pl-1 ${
                        index < switches.length - 1
                            ? 'border-r border-white pr-1'
                            : 'pr-1'
                    } ${item.isSelected ? 'text-blue-500' : ''}`}
                    key={index}
                    onClick={() => handleClick(index)}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
};

export default Switch;
