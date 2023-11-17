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

    const { data, isLoading, mutate } = useSWR(`credit/datatables?page=${page}&per_page=${rowsPerPage}&search=${search}`, fetcherGet, {
        keepPreviousData: true,
    });

    const headers : any[] = [
        { label : 'order_id', key : 'order_id', },
        { label : 'periode', key : 'periode', format : (value) => `${value} Month` },
        { label : 'has_been_paid', key : 'payment_details_count', format : (value) => `${value} Month` },
        { label : 'actions', key : 'actions', }
    ]

    const router = useRouter();
    const handleToDetail = (id : number) => {
        router.push(`/my-credit/${id}`);
    }

    return (
        <>
            <div className="mb-3 text-2xl font-semibold">My Credit</div>
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
                handleToDetail={(id) => handleToDetail(id)} />
        </>
    )
}
