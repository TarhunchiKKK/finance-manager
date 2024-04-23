import { FC, useState } from "react"
import { Form, useLoaderData } from "react-router-dom"
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import CategoryModal from "../components/CategoryModal"
import { API } from "../api/axios.api"
import { ICategory } from "../types/types"

export const categoriesAction = async ({ request }: any) => {
    switch(request.method) {
        case 'POST': {
            const formData = await request.formData()
            const category = {
                title: formData.get('title')
            }
            await API.post('/categories', category)
            return null
        }
        case 'PATCH': {
            const formData = await request.formData()
            const category = {
                id: formData.get('id'),
                title: formData.get('title')
            }
            await API.patch(`/categories/${category.id}`, category)
            return null
        }
        case 'DELETE': {
            const formData  = await request.formData()
            const categoryId = formData.get('id')
            await API.delete(`/categories/${categoryId}`)
            return null
        }
    }
}

export const catgoryLoader = async () => {
    const { data } = await API.get<ICategory[]>('/categories')
    return data
}

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[]

    const [createModal, setCreateModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<number>(0)

    return (
        <>
            <div className="mt-10 p-4 rounded-md bg-slate-800">
                <h1>Your categories</h1>

                {/* Category list */}
                <div className="flex flex-wrap items-center  gap-2 mt-2">
                    
                    
                    { categories.map((category, index) =>(
                        <div key={index} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
                            { category.title }
                            <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                                <button onClick={() => { setEditModal(true); setCategoryId(category.id); }}>
                                    <AiFillEdit />
                                </button>

                                <Form action='/categories' method='delete' className="flex">
                                    <input type="hidden" name="id" value={ category.id } />
                                    <button type='submit'>
                                        <AiFillCloseCircle/>
                                    </button>
                                </Form>
                            </div>
                        </div>
                    ) ) }

                </div>

                {/* Add category */}
                <button onClick={() => setCreateModal(true)} className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white">
                    <FaPlus/>
                    <span>Create a new category</span>
                </button>
            </div>

            {/* Add category modal */}
            { createModal && <CategoryModal type='post' close={()  => setCreateModal(false)} /> }  

            {/* Edit category modal */}
            { editModal && <CategoryModal type='patch' categoryId={categoryId} close={() => setEditModal(false)} /> }
        </>
    )
}

export default Categories