"use client"

import React from "react";
import useSWR from "swr";
import Datatables from "../components/Datatables";
import { rupiahFormat } from "@/lib/helpers";
import { fetcher, fetcherGet } from "@/lib/api-instance";

export default function App() {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");

    const { data, isLoading } = useSWR(`revenue/datatables?page=${page}&per_page=${rowsPerPage}&search=${search}`, fetcherGet, {
        keepPreviousData: true,
    });

    console.log('data : ', data);
    

    const headers : any[] = [
        { label : 'user_name', key : 'user_name', },
        { label : 'month', key : 'month', },
        { label : 'revenue', key : 'revenue', format : (value) => rupiahFormat(value) },
        { label : 'commission_percentage (%)', key : 'commission_percentage' },
        { label : 'commission_nominal', key : 'commission_nominal', format : (value) => rupiahFormat(value) },
    ]

    return (
        <>
            <div className="mb-3 text-2xl font-semibold">Revenue</div>
            <Datatables search={search} setSearch={setSearch} data={data?.data} page={page} setPage={setPage} isLoading={isLoading} headers={headers} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
        </>
    );
}
