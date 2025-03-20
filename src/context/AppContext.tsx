import { ContractStatus, SortFields, SortFieldsType, SortOrderFields, SortOrderFieldsType, StatusFields, StatusFieldsType } from "@/types";
import React, { useContext, useMemo, useState } from "react";

interface IAppContext {
    page:number,
    limit:number,
    sortBy: SortFieldsType,
    order: SortOrderFieldsType,
    status: 'both' | ContractStatus,
    totalPages: number,
    searchQuery: string | null,
    renderHelper:number,

    setTotalPages:any,
    setPage:any,
    setSortBy:any,
    setStatus:any,
    setOrder: any,
    setSearchQuery:any,
    setLimit:any,
    handleReRender:any,
}

const AppContext = React.createContext<IAppContext>({
    page:1,
    limit:10,
    sortBy:SortFields.CREATED_AT,
    order:SortOrderFields.DESC,
    status:'both',
    totalPages:1,
    searchQuery:null,
    renderHelper:0,

    setTotalPages: null,
    setPage: null,
    setSortBy: null,
    setStatus:null,
    setOrder:null,
    setSearchQuery: null,
    setLimit:null,
    handleReRender:null
})

export const useAppContext = () => useContext(AppContext);

const AppProvider =({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [page,setPage] = useState<number>(1);
    const [limit,setLimit] = useState<number>(5);
    const [sortBy,setSortBy] = useState<SortFieldsType>(SortFields.CREATED_AT);
    const [order,setOrder] = useState<SortOrderFieldsType>(SortOrderFields.DESC);
    const [status,setStatus] = useState<StatusFieldsType>(StatusFields.BOTH);

    const [totalPages,setTotalPages] = useState<number>(1);

    const [searchQuery,setSearchQuery] = useState<string | null>(null);

    const [renderHelper,setRenderHelper] = useState<number>(0);

    const handleReRender = () =>{
        setRenderHelper(Math.random());
    }

    const value = useMemo(
        () => ({
            page,
            setPage,
            limit,
            setLimit,
            sortBy,
            setSortBy,
            order,
            setOrder,
            status,
            setStatus,
            totalPages,
            setTotalPages,
            searchQuery,
            setSearchQuery,

            renderHelper,
            handleReRender
        }),
        [
            page,
            limit,
            sortBy,
            order,
            status,
            totalPages,
            searchQuery,
            renderHelper
        ]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;