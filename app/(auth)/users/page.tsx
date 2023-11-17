"use client"

import React from "react";
import useSWR from "swr";
import Datatables from "../components/Datatables";
import { fetcher, fetcherGet } from "@/lib/api-instance";

export default function App() {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");

    const { data, isLoading } = useSWR(`users/datatables?page=${page}&per_page=${rowsPerPage}&search=${search}`, fetcherGet, {
        keepPreviousData: true,
    });

    const headers : any[] = [
        { label : 'name', key : 'name', },
        { label : 'email', key : 'email', },
    ]

    return (
        <>
            <div className="mb-3 text-2xl font-semibold">Users</div>
            <Datatables search={search} setSearch={setSearch} data={data?.data} page={page} setPage={setPage} isLoading={isLoading} headers={headers} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
        </>
    );
}
