import { FC } from "react";
import { Form } from "react-router-dom";

interface Props {
    type: 'post' | 'patch'
    categoryId?: number
    close: () => void
}

const CategoryModal: FC<Props> = ({ type, categoryId, close }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center items-center">
            <Form action="/categories" method={type} onSubmit={() => close()} className="grid w-[400px] gap-2 rounded-md bg-slate-900 p-5">
                <label htmlFor="title">
                    <small>Category Title</small>
                    <input className="input w-full" type="text" name="title" placeholder='Title...' />
                    <input type="hidden" name="id" value={categoryId} />
                </label>

                <div className="flex items-center gap-2">
                    <button className="btn btn-green" type='submit'>
                        { type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button onClick={() => close()} className="btn btn-red" >Close</button>
                </div>
            </Form>
        </div>
    )
}

export default CategoryModal