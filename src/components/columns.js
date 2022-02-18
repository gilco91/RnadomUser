import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS=[
    {
        Header:'Picture',
        accessor:'picture.large',
        Cell:({value})=> <img  src={value} className="w-50 rounded-circle" />,
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header:'Name',
        accessor:'name',
        Filter: ColumnFilter,
        Cell:({value})=> <h4>{value.first[0]+'. '+value.last}</h4>
    },
    {
        Header:'Email',
        accessor:'email',
        Filter: ColumnFilter,
        Cell:({value})=> <a href="mailto:{value}" >{value}</a>
    },
    {
        Header:'Gender',
        accessor:'gender',
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header:'Age',
        accessor:'dob.age',
        Filter: ColumnFilter
    }

]