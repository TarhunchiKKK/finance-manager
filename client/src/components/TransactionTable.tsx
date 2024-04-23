import { FC, useEffect, useState } from "react"
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from "react-router-dom"
import { IResponseTransactionLoader, ITransaction } from "../types/types"
import { formatDate } from "../helpers/DateHelper"
import { formatToUSD } from "../helpers/CurrencyHelper"
import { API } from "../api/axios.api"
import ReactPaginate from "react-paginate"

interface Props {
    limit: number
}

export const TransactionTable: FC<Props> = ({limit = 3}) => {
    const { transactions } = useLoaderData() as IResponseTransactionLoader

    const [data, setData] = useState<ITransaction[]>([]) 
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchTransactions = async (page: number) => {
        const response = await API.get(`/transactions/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        setTotalPages(Math.ceil(transactions.length/limit))
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
       fetchTransactions(currentPage) 
    }, [currentPage, transactions])

    console.log(transactions)
    return (
        <>
            <ReactPaginate 
                className="flex gap-3 justify-end items-cener mt-4" 
                activeClassName="bg-blue-600 rounded-md"
                pageLinkClassName="text-white text-xs py-1 px-2 rounded-md"
                previousClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
                nextClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
                disabledClassName="text-white/50 cursor-not-allowed"
                disabledLinkClassName="text-slate-600 cursor-not-allowed"
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />
            <div className="bg-slate-800 px-3 py-3 mt-4 rounded-md">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="font-bold">№</td>
                            <td className="font-bold">Title</td>
                            <td className="font-bold">Amount</td>
                            <td className="font-bold">Category</td>
                            <td className="font-bold">Date</td>
                            <td className="text-right">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        { transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{ index + 1 }</td>
                                <td>{ transaction.title }</td>
                                <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                                    { transaction.type === 'income' 
                                        ? `+ ${formatToUSD.format(transaction.amount)}` 
                                        : `- ${formatToUSD.format(transaction.amount)}` 
                                    }
                                </td>
                                <td>{ transaction.category?.title || 'Other'}</td>
                                <td>{ formatDate(transaction.createdAt) }</td>
                                <td>
                                    <Form method="delete" action="/transactions">
                                        <input type="hidden" name="id" value={transaction.id} />
                                        <button className="btn hover:btn-red ml-auto">
                                            <FaTrash />
                                        </button>
                                    </Form>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}

function useLoaderdata(): { transactions: any } {
    throw new Error("Function not implemented.")
}
