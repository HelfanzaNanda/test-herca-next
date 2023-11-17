"use client"

import React from "react";
import useSWR from "swr";
import { dateReadable, rupiahFormat } from "@/lib/helpers";
import { useParams, useRouter } from "next/navigation";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import { toastSuccess } from "@/lib/my-toast";
import { METHOD_POST, fetcher, fetcherGet } from "@/lib/api-instance";

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

export default function App() {
    const params = useParams()
    const router = useRouter()
    const { sale_id } = params;
    // console.log('SALE_ID : ', sale_id );

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
    

    const { data : response, isLoading, } = useSWR(`sales/credit/${sale_id}`, fetcherGet, {
        keepPreviousData: true,
    });


    const handleGenerateSnap = async (month: string) => {
        const response = await fetcher("payment/snap/generate", {
            arg : {
                method : METHOD_POST,
                body : {
                    month : parseInt(month),
                    sale_id : sale_id,
                }
            }
        })

        if (response.status) {
            const token = response.data.token;
            const payment_detail_id = response.data.payment_detail_id;
            window.snap.pay(token, {
                // embedId: 'snap-container',
                onSuccess: async function (result: any) {
                    const response = await fetcher("payment/pay", {
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
    

    // console.log('response ', response);

    // const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    //     switch (columnKey) {
    //       case "actions":
    //         return (
    //             <div className="relative flex items-center gap-2">
    //                 <Tooltip content="Credit" >
    //                     <button onClick={() => handleToCredit(item.id)} className="outline-none border-none text-xs text-default-400 cursor-pointer active:opacity-50">
    //                         Credit
    //                     </button>
    //                 </Tooltip>
    //             </div>
    //         );
    //       default:
    //         const header = headers.find(header => columnKey == header.key)
    //         return header?.format ? header.format(getValueByKey(item, columnKey)) : getValueByKey(item, columnKey);
    //     }
    // }, []);

    return (
        <>
            <div id="snap-container"></div>

            <div className="mb-3 text-2xl font-semibold">Credit</div>

            <div className="flex space-x-5">
                {
                    response && response?.data.map((data, key) => {
                        const month = Object.keys(data);
                        const items = data[month];
                        return (
                            <div key={key} className="w-full">
                                <div className="mb-3">{month} Month</div>
                                <Table isStriped aria-label="Example static collection table" className="mb-3 w-full">
                                    <TableHeader>
                                        <TableColumn>Month</TableColumn>
                                        <TableColumn>Instalment</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.month}</TableCell>
                                                        <TableCell>{rupiahFormat(item.price)}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                                <Button onClick={() => handleGenerateSnap(month[0])} color="primary" className="w-full"> Pay </Button>
                            </div>
                        )
                    })
                }
            </div>
            
        </>
    );
}
