import { FC } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ['#16A34A', '#EF4444']

interface Props {
    income: number
    expense: number
}

interface IData {
    value: number
    name: string
}

export const Chart: FC<Props> = ({ income, expense }) => {
    const data = new Array<IData>(
        { value: income, name: 'Income' },
        { value: expense, name: 'Expense' }
    )

    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />      {/* Названия участков */}
            <Tooltip />     {/* Название участка при наведении на него */}
        </PieChart>
    )
}