"use client"

import React from "react";
import useSWR from "swr";
import { dateReadable, rupiahFormat } from "@/lib/helpers";
import Datatables from "../components/Datatables";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { fetcherGet } from "@/lib/api-instance";

export default function App() {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");

    const { data, isLoading, mutate } = useSWR(`sales/datatables?page=${page}&per_page=${rowsPerPage}&search=${search}`, fetcherGet, {
        keepPreviousData: true,
    });

    const headers : any[] = [
        { label : 'transaction_number', key : 'transaction_number', },
        { label : 'user_name', key : 'user.name', },
        { label : 'date', key : 'date', format : (value) => dateReadable(value) },
        { label : 'cargo_fee', key : 'cargo_fee', format : (value) => rupiahFormat(value) },
        { label : 'total_balance', key : 'total_balance', format : (value) => rupiahFormat(value) },
        { label : 'grand_total', key : 'grand_total', format : (value) => rupiahFormat(value) },
        { label : 'actions', key : 'actions', }
    ]

    const router = useRouter();
    const handleToCredit = (id : number) => {
        console.log('TETSTTS : ', id);
        
        router.push(`/credit/${id}`);
    }

    return (
        <>
            <div className="mb-3 text-2xl font-semibold">Sales</div>
            <Datatables 
                search={search} 
                setSearch={setSearch} 
                data={data?.data} 
                page={page} 
                setPage={setPage} 
                isLoading={isLoading} 
                headers={headers} 
                rowsPerPage={rowsPerPage} 
                setRowsPerPage={setRowsPerPage}
                handleToDetail={(id) => handleToCredit(id)} />
        </>
    )
}
