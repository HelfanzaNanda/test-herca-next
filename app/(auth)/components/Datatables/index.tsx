"use client"

import React, { useMemo } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Input, Tooltip } from "@nextui-org/react";
import { getValueByKey } from '@/lib/helpers';
import SearchIcon from '../Icons/SearchIcon';

interface Datatable {
    data : any;
    page : number;
    setPage : (page : number) => void;
    rowsPerPage : number;
    setRowsPerPage : (rows : number) => void;
    search : string;
    setSearch : (text : string) => void;
    isLoading: boolean;
    headers: {
        label : string;
        key: string;
        format: (value : any) => void;
    }[];
    children? : React.ReactNode;
    handleToDetail? : (id : number) => void;
}

const Datatables: React.FC<Datatable> = (props) => {
    const { data, headers, page, setPage, rowsPerPage, setRowsPerPage, isLoading, search, setSearch, children, handleToDetail } = props;
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["10"]));

    const setSelectedRowKey = (value : Set<string>) => {
        // console.log('value : ', value.currentKey);
        setSelectedKeys(value);
        setRowsPerPage(value.currentKey);
    }

    // const rowsPerPage = data?.per_page || 10;
    const pages = useMemo(() => {
        
        return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
    }, [data?.total, rowsPerPage]);
    
    const loadingState = isLoading ? "loading" : "idle";

    const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
        const header = headers.find(header => columnKey == header.key)
        console.log('render : ', header);
        
        switch (columnKey) {
            case "actions":
            if (header?.render) {
                const logic = header?.render(item);
                if (logic) {
                    return (
                        <div className="relative flex items-center gap-2">
                            <Tooltip content={header?.text || 'Detail'} >
                                <Button size='sm' color="primary" onClick={() => handleToDetail(item.id)} className="outline-none border-none text-xs cursor-pointer active:opacity-50">
                                    {header?.text || 'Detail'} 
                                </Button>
                            </Tooltip>
                        </div>
                    );    
                }else{
                    return null;
                }
            }
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content={header?.text || 'Detail'} >
                        <Button size='sm' color="primary" onClick={() => handleToDetail(item.id)} className="outline-none border-none text-xs cursor-pointer active:opacity-50">
                            {header?.text || 'Detail'} 
                        </Button>
                    </Tooltip>
                </div>
            );
          default:
            // const header = headers.find(header => columnKey == header.key)
            return header?.format ? header.format(getValueByKey(item, columnKey)) : getValueByKey(item, columnKey);
        }
    }, []);


    return (


        <>
            <div className=' mb-3 flex justify-between'>
                <div className='flex space-x-2 items-center'>
                    <div>Show</div>
                    <Dropdown size='sm'>
                        <DropdownTrigger>
                            <Button variant="bordered" className="capitalize" >
                                {rowsPerPage}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedRowKey}
                        >
                            <DropdownItem key="10">10</DropdownItem>
                            <DropdownItem key="25">25</DropdownItem>
                            <DropdownItem key="50">50</DropdownItem>
                            <DropdownItem key="100">100</DropdownItem>
                            <DropdownItem key="All">All</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div>entries</div>
                </div>
                <Input
                    onInput={(e) => setSearch(e.target.value)}
                    isClearable
                    radius="lg"
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "h-12",
                            "w-auto",
                            "border-1",
                            "bg-white",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-slate-50/10",
                            "group-data-[focused=true]:w-auto",
                            "!cursor-text",
                        ],
                        base: "w-auto"
                    }}
                    placeholder="Type to search..."
                    startContent={
                        <SearchIcon className=" text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </div>
            <Table isStriped
                    aria-label="Example table with client async pagination"
                    bottomContent={
                        pages > 0 ? (
                            <div className="flex w-full justify-between items-center">
                                <div className='text-sm'>Showing {data?.from} to {data?.to} of {data?.total} entries</div>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        {
                            headers.map(header => (
                                <TableColumn key={header.key}>{header.label}</TableColumn>
                            ))
                        }
                    </TableHeader>
                    <TableBody
                        items={data?.data ?? []}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                        emptyContent="Data Empty"
                    >
                        {
                            (item) => (
                                <TableRow key={item?.id}>
                                    {(columnKey) => (
                                        <TableCell>{ renderCell(item, columnKey) }</TableCell>   
                                    )}
                                </TableRow>
                            )
                        }
                    </TableBody>
            </Table>
        </>
    )
}

export default Datatables;
