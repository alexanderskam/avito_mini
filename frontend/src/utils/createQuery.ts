interface IParams {
    search: string;
    page: number;
    switch: {
        content: React.ReactNode;
        isSelected: boolean;
        desc: 'grid' | 'column';
    }[];
    onlyRevision: boolean;
    category: '' | 'auto' | 'real_estate' | 'electronics';
    selected: 'По названию' | 'По новизне';
    sortDirection?: 'asc' | 'desc';
}

interface queryObject {
    q?: string;
    limit?: number;
    skip?: number;
    needsRevision?: boolean;
    categories?: 'auto' | 'real_estate' | 'electronics';
    sortColumn?: 'title' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
}

export const createQuery = (params: IParams) => {
    const queryObject: queryObject = {};
    if (params.onlyRevision) queryObject.needsRevision = true;
    if (params.category !== '') queryObject.categories = params.category;
    if (params.selected === 'По названию') {
        queryObject.sortColumn = 'title';
    } else queryObject.sortColumn = 'createdAt';
    if (params.search !== '') queryObject.q = params.search;
    const mode = params.switch.find((el) => el.isSelected === true);
    console.log(mode);
    if (mode) {
        switch (mode.desc) {
            case 'column':
                queryObject.limit = 10;
                queryObject.skip = params.page * 10 - 10;
                break;
            case 'grid':
                queryObject.limit = 4;
                queryObject.skip = params.page * 4 - 4;
                break;
        }
    }

    return queryObject;
};
