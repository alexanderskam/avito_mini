import { useGetItemsQuery } from '../../store/api/api';
import Input from '../../UI/Input';
import { IoMdSearch } from 'react-icons/io';
import Switch from '../../UI/Switch';
import { CiGrid41 } from 'react-icons/ci';
import { CiGrid2H } from 'react-icons/ci';
import Select from '../../UI/Select';
import { useMemo, useState, type ChangeEventHandler } from 'react';
import Filters from './Filters';
import { useDebounce } from '../../hooks/useDebounce';
import CardGrid from '../card/CardGrid';
import { createQuery } from '../../utils/createQuery';
import { usePages } from '../../hooks/usePages';
import CardColumn from '../card/CardColumn';
import ErrorState from '../ErrorState';
import Pages from './Pages';

const Main = () => {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const [selected, setSelected] = useState<'По новизне' | 'По названию'>(
        'По новизне',
    );
    const debouncedSearch = useDebounce(search, () => setPage(1));

    const [category, setCategory] = useState<
        '' | 'real_estate' | 'electronics' | 'auto'
    >('');

    const [onlyRevision, setOnlyRevision] = useState<boolean>(false);

    const [switches, setSwitches] = useState<
        {
            content: React.ReactNode;
            isSelected: boolean;
            desc: 'grid' | 'column';
        }[]
    >([
        {
            content: <CiGrid2H className="cursor-pointer" />,
            isSelected: true,
            desc: 'grid',
        },
        {
            content: <CiGrid41 className="cursor-pointer" />,
            isSelected: false,
            desc: 'column',
        },
    ]);

    const queryObject = useMemo(() => {
        return createQuery({
            page,
            switch: switches,
            search: debouncedSearch,
            selected,
            onlyRevision,
            category,
        });
    }, [debouncedSearch, selected, onlyRevision, category, switches, page]);

    const { data, isSuccess, isFetching, isError, isLoading } =
        useGetItemsQuery(queryObject);

    const pagesAmount = usePages(data?.total, switches);

    const changeSelectHandler = (value: string) => {
        if (value === 'По новизне' || value === 'По названию')
            setSelected(value);
    };

    const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
    };

    const getMode = () => {
        const mode = switches.find((el) => el.isSelected === true);
        if (mode) return mode.desc;
    };

    const options = ['По новизне', 'По названию'];

    return (
        <div className="bg-gray-200 h-screen w-full flex flex-col">
            <div className="p-6">
                <h1 className="font-bold text-2xl">Мои объявления</h1>

                <p className="text-gray-500">
                    {isSuccess ? `${data.total} объявления` : 'Загрузка...'}
                </p>
            </div>
            <div className=" flex ml-6 mr-6 bg-white rounded-2xl p-3 gap-2">
                <Input
                    value={search}
                    placeholder="Найти объявление..."
                    className="w-3/4"
                    decoration={<IoMdSearch />}
                    onChange={searchHandler}
                />
                <Switch
                    switches={switches}
                    setSwitches={setSwitches}
                    setPage={setPage}
                />
                <Select
                    value={selected}
                    options={options}
                    onChange={changeSelectHandler}
                />
            </div>
            <div className="flex ml-6 mr-6 flex-1 overflow-hidden">
                <Filters
                    setPage={setPage}
                    category={category}
                    setCategory={setCategory}
                    setOnlyRevision={setOnlyRevision}
                />
                <div
                    className={`flex-1 p-4 flex flex-col overflow-hidden  ${isFetching ? 'opacity-50' : ''}`}
                >
                    {isError && <ErrorState />}
                    <div className="flex-1 overflow-y-auto">
                        {isSuccess &&
                            getMode() === 'grid' &&
                            data.items.map((item) => {
                                return <CardGrid key={item.id} item={item} />;
                            })}

                        {isSuccess && getMode() === 'column' && (
                            <div className="grid grid-cols-5 grid-rows-2 gap-2">
                                {data.items.map((item) => {
                                    return (
                                        <CardColumn key={item.id} item={item} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {!isError && !isLoading && (
                        <Pages
                            page={page}
                            setPage={setPage}
                            pagesAmount={pagesAmount}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
