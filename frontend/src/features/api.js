import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const  adminApi = createApi ({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery ({baseUrl: process.env.REACT_APP_BASE_URL}),
    tagTypes: ['User', 'Products', 'Customers', 'Transaction', 'Geography', 'Dashboard',
                'Overview', 'Daily', 'Monthly', 'SalesByCategory', 'Admins', 'Performance'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => ({
                url: `general/user/${id}`,
                // responseHandler: (res) => res.text()
            }),
            providesTags: ['User']
        }),
        getProducts: build.query({
            query: () => ({
                url: `clients/products`,
                // responseHandler: (res) => res.text()
            }),
            providesTags: ['Products']
        }),
        getCustomers: build.query({
            query: () => ({
                url: `clients/customers`
            }),
            providesTags: ['Customers']
        }),
        getTransaction: build.query ({
            query: ({page, pageSize, sort, search}) => ({
                url: 'clients/transactions',
                method: 'GET',
                params: {page, pageSize, search}
            }),
            providesTags: ['Transaction']
        }),
        getGeography: build.query ({
            query: () => ({
                url: 'clients/geography',
                method: 'GET'
            }),
            providesTags: ['Geography']
        }),
        getSales: build.query ({
            query: () => ({
                url: 'sales/overview',
                method: 'GET'
            }),
            providesTags: ['Overview']
        }),
        getDailySales: build.query ({
            query: () => ({
                url: 'sales/daily',
                method: 'GET'
            }),
            providesTags: ['Daily']
        }),
        getMonthlySales: build.query ({
            query: () => ({
                url: 'sales/monthly',
                method: 'GET'
            }),
            providesTags: ['Monthly']
        }),
        getSalesByCategory: build.query ({
            query: () => ({
                url: 'sales/category',
                method: 'GET'
            }),
            providesTags: ['SalesByCategory']
        }),
        getAdmins: build.query ({
            query: () => ({
                url: 'management/admins',
                method: 'GET'
            }),
            providesTags: ['Admins']
        }),
        getPerformance: build.query ({
            query: (id) => ({
                url: `management/performance/${id}`,
                method: 'GET'
            }),
            providesTags: ['Performance']
        }),
        getDashboard: build.query ({
            query: () => ({
                url: 'general/dashboard',
                method: 'GET'
            }),
            providesTags: ['Dashboard']
        }),
    })
})
export { adminApi }
export const { 
    useGetUserQuery, 
    useGetProductsQuery,
    useGetCustomersQuery, 
    useGetTransactionQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetDailySalesQuery,
    useGetMonthlySalesQuery,
    useGetSalesByCategoryQuery,
    useGetAdminsQuery,
    useGetPerformanceQuery,
    useGetDashboardQuery
} = adminApi