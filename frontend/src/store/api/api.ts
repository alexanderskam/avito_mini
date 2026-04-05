import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type IItemUpdateBody,
    type IItemOne,
    type IItemsResponse,
} from '../../types/item';

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        getItems: builder.query<
            IItemsResponse,
            {
                q?: string;
                limit?: number;
                skip?: number;
                needsRevision?: boolean;
                categories?: 'auto' | 'real_estate' | 'electronics';
                sortColumn?: 'title' | 'createdAt';
                sortDirection?: 'asc' | 'desc';
            }
        >({
            query: (params) => {
                const queryString = new URLSearchParams();
                console.log('FETCHING');

                if (params.q) queryString.append('q', params.q);
                if (params.limit)
                    queryString.append('limit', String(params.limit));
                if (params.skip)
                    queryString.append('skip', String(params.skip));
                if (params.needsRevision !== undefined)
                    queryString.append(
                        'needsRevision',
                        String(params.needsRevision),
                    );
                if (params.categories)
                    queryString.append('categories', params.categories);
                if (params.sortColumn)
                    queryString.append('sortColumn', params.sortColumn);
                if (params.sortDirection)
                    queryString.append('sortDirection', params.sortDirection);

                console.log(`items?${queryString.toString()}`);
                return `items?${queryString.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map((item) => ({
                              type: 'Items' as const,
                              id: item.id,
                          })),
                          { type: 'Items', id: 'LIST' },
                      ]
                    : [{ type: 'Items', id: 'LIST' }],
        }),
        getItem: builder.query<IItemOne, { id: number }>({
            query: (params) => `items/${params.id}`,
            providesTags: (_result, _error, { id }) => [{ type: 'Items', id }],
        }),
        updateItem: builder.mutation<
            { success: boolean },
            { id: number; data: IItemUpdateBody }
        >({
            query: ({ id, data }) => ({
                url: `items/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Items', id },
                { type: 'Items', id: 'LIST' },
            ],
        }),
    }),
});

export const { useGetItemsQuery, useGetItemQuery, useUpdateItemMutation } =
    itemsApi;
