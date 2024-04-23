import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { IResponseTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionForm: FC = () => {
    const { categories } = useLoaderData() as  IResponseTransactionLoader
    const [modal, setModal] =  useState<boolean>(false)

    return (
        <div className="rounded-md bg-slate-800 p-4">
            <Form action="/transactions" method="post" className="grid gap-2">
                <label htmlFor="title">
                    {/* <span>Title</span> */}
                    <input className="input border-slate-900" type="text" required name="title" placeholder="Title..." />
                </label>

                <label htmlFor="amount">
                    {/* <span>Amount</span> */}
                    <input className="input border-slate-900" type="number" required name="amount" placeholder="Amount..." />
                </label>


                {/* List of categories */}
                { categories.length ? 
                    <label htmlFor="category" className="grid">
                        <span>Category</span>
                        <select className="input border-slate-900 bg-slate-700" name="category" required>
                            { categories.map((category, index) => <option value={category.id} key={index}>{category.title}</option>) }
                        </select>
                    </label> : <h1 className="mt-1 text-red-300">To continue crate first category</h1> 
                }


                {/* <button className=""></button> */}
                <button onClick={() => setModal(true)} className="mt-2 max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
                    <FaPlus/>
                    <span>Manage categories</span>
                </button>


                {/* Radio buttons */}
                <div className="flex gap-4 items-center">
                    <label className="cursor-pointer items-center gap-2">
                        <input className="form-radio text-blue-600" type="radio" name="type" value={'income'} />
                        <span className="ml-1">Income</span>
                    </label>

                    <label className="cursor-pointer items-center gap-2">
                        <input className="form-radio text-blue-600" type="radio" name="type" value={'expense'} />
                        <span className="ml-1">Expense</span>
                    </label>
                </div>


                {/* Submit button */}
                <button className="btn btn-green max-w-fit mt-2" type="submit">Submit</button>
            </Form>
            
            { modal && <CategoryModal type="post" close={() => setModal(false)} />  }
        </div>
    )
}

export default TransactionForm