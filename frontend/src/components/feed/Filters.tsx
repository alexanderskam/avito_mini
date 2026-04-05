import { useState, type FC } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface IFilters {
    category: '' | 'auto' | 'real_estate' | 'electronics';
    setCategory: React.Dispatch<
        React.SetStateAction<'' | 'auto' | 'real_estate' | 'electronics'>
    >;
    setOnlyRevision: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filters: FC<IFilters> = ({
    setCategory,
    setOnlyRevision,
    category,
    setPage,
}) => {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const handleToggle = () => {
        setEnabled(!enabled);
        setOnlyRevision(!enabled);
        setPage(1);
    };
    const handleCheckbox = (
        name: '' | 'auto' | 'real_estate' | 'electronics',
    ) => {
        setCategory(name);
        setPage(1);
    };
    const resetHandler = () => {
        setEnabled(false);
        setOnlyRevision(false);
        setCategory('');
        setPage(1);
    };
    return (
        <div className="flex flex-col w-1/5">
            <div className=" bg-white p-4 mt-4 rounded-2xl h-fit">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <p className="font-medium">Категория</p>
                    <FaChevronDown
                        className={`transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </div>
                {open && (
                    <div className="mt-2 flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer ">
                            <input
                                type="radio"
                                name="category"
                                checked={category === 'auto'}
                                onClick={() => handleCheckbox('auto')}
                                readOnly={true}
                            />
                            Авто
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={category === 'electronics'}
                                onClick={() => handleCheckbox('electronics')}
                                readOnly={true}
                            />
                            Электроника
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={category === 'real_estate'}
                                onClick={() => handleCheckbox('real_estate')}
                                readOnly={true}
                            />
                            Недвижимость
                        </label>
                    </div>
                )}
                <hr className="w-full text-gray-300 mt-4 mb-4"></hr>
                <div className="flex items-center justify-between">
                    <p className="font-medium">Только требующие доработок</p>
                    <div
                        onClick={handleToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            enabled ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                enabled ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={resetHandler}
                className=" bg-white p-4 mt-4 rounded-2xl h-fit cursor-pointer"
            >
                Сбросить фильтры
            </button>
        </div>
    );
};

export default Filters;
