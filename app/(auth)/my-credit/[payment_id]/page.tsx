"use client"
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import useSWR from "swr";
import { dateReadable, rupiahFormat } from "@/lib/helpers";
import { Tooltip } from "@nextui-org/react";
import { METHOD_POST, fetcher, fetcherGet } from "@/lib/api-instance";
import Datatables from '../../components/Datatables';
import { toastSuccess } from '@/lib/my-toast';

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

export default function page() {

    React.useEffect(() => {
        // const snapSrcUrl = 'https://app.stg.midtrans.com/snap/snap.js'
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const myMidtransClientKey = `${CLIENT_KEY}`
        const script = document.createElement('script')
        script.src = snapSrcUrl
        script.setAttribute('data-client-key', myMidtransClientKey)
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])


    const params = useParams()
    const router = useRouter()
    const { payment_id } = params;
    console.log('payment_id : ', payment_id );


    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");

    const { data, isLoading, mutate } = useSWR(`payment/detail/datatables?payment_id=${payment_id}&page=${page}&per_page=${rowsPerPage}&search=${search}`, fetcherGet, {
        keepPreviousData: true,
    });

    const headers : any[] = [
        { label : 'unique_id', key : 'unique_id' },
        { label : 'instalment', key : 'instalment', format : (value) => rupiahFormat(value) },
        { label : 'first_date_of_payment', key : 'first_date_of_payment' },
        { label : 'last_date_of_payment', key : 'last_date_of_payment' },
        { label : 'payment_date', key : 'payment_date' },
        { label : 'status', key : 'status'  },
        { label : 'actions', key : 'actions', 'text' : 'Pay', render : (item) => item.status == "UNPAID" }
    ]

    const handleToDetail = async (payment_detail_id : number) => {
        const response = await fetcher("payment/detail/snap/generate", {
            arg : {
                method : METHOD_POST,
                body : {
                    payment_detail_id
                }
            }
        })

        if (response.status) {
            const token = response.data.token;
            const payment_detail_id = response.data.payment_detail_id;
            window.snap.pay(token, {
                // embedId: 'snap-container',
                onSuccess: async function (result: any) {
                    const response = await fetcher("payment/detail/pay", {
                        arg : {
                            method : METHOD_POST,
                            body : {
                                payment_detail_id
                            }
                        }
                    })
                    toastSuccess("payment successfully");

                    if (response.status) {
                        router.push('/my-credit');
                    }
                },
                onPending: function (result) {
                  /* You may add your own implementation here */
                  alert("wating your payment!"); console.log(result);
                },
                onError: function (result) {
                  /* You may add your own implementation here */
                  alert("payment failed!"); console.log(result);
                },
                onClose: function () {
                  /* You may add your own implementation here */
                  alert('you closed the popup without finishing the payment');
                }
            });
        }
    }

    return (
        <>
            <div className="mb-3 text-2xl font-semibold">My Credit Detail</div>
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
