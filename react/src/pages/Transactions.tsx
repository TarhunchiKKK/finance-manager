import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { API } from "../api/axios.api";
import { ICategory, IResponseTransactionLoader, ITransaction } from "../types/types";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { TransactionTable } from "../components/TransactionTable";
import { formatToUSD } from "../helpers/CurrencyHelper";
import { Chart } from "../components/Chart";

export const transactionLoader = async () => {
    const categories = await API.get<ICategory[]>('/categories')
    const transactions = await API.get<ITransaction[]>('/transactions')
    const totalIncome = await API.get<number>('/transactions/total/income')
    const totalExpense = await API.get<number>('/transactions/total/expense')

    const data  = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data
    }
    return data
}   

export const transactionAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData()
            const newTransaction = {
                title: formData.get('title'),
                amount: +formData.get('amount'),
                category: formData.get('category'),
                type: formData.get('type'),
            }
            await API.post('/transactions', newTransaction)
            toast.success('Transaction added.')
            return null
        }
        case 'DELETE': {
            const formData = await request.formData()
            const transactionId = formData.get('id')
            await API.delete(`/transactions/${transactionId}`)
            toast.success('Transaction deleted.')
            return null
        }
    }
}

const Transactions: FC = () => {
    const { totalIncome, totalExpense }  = useLoaderData() as IResponseTransactionLoader

    return (    
        <>
            <div className="mt-4 grid grid-cols-3 gap-4 items-start">

                {/* Add transaction form */}
                <div className="col-span-2 grid">
                    <TransactionForm />
                </div>


                {/* Statistic blocks */}
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="uppercase text-md font-bold text-center">Total income:</p>
                            <p className="bg-green-600 p-1 rounded-sm text-center mt-2">{ formatToUSD.format(totalIncome) }</p>
                        </div>

                        <div>
                            <p className="uppercase text-md font-bold text-center">Total expense</p>
                            <p className="bg-red-500 p-1 rounded-sm text-center mt-2">{ formatToUSD.format(totalExpense) }</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Chart income={totalIncome} expense={totalExpense} />
                    </div>
                </div>

            </div>    


            {/* Transactions table */}
            <h1 className="mt-5">
                <TransactionTable limit={5}/>
            </h1>
        </>
    )
}

export default Transactions