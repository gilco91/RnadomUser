import React ,{useMemo,useState,useEffect} from "react";
import {useTable} from 'react-table'
import {COLUMNS} from './columns'
import axios from "axios";
import './table.css'
export const BasicTable=()=>{

    const[users,setUsers]=useState([]);
    // const [loading,setLoading]=useState(false);
    // const[currentPage,setCurrentPage]=useState(1);
    // const [usersPerPage]=useState(10);
  
    useEffect(()=>{
        const fetchUsers=async()=>{
            const res=await axios.get("https://randomuser.me/api/?results=100")
            setUsers(res.data.results)
        }
        fetchUsers();
    },[]);
 
    const columns=useMemo(()=>COLUMNS,[])
    const data=useMemo(()=>users,[]);

    const tableInstance=useTable({
        columns,
        data 
    })

    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}=tableInstance;

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}                    
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row)=>{
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                             })}
                        </tr>
                    )                       
                })}
            </tbody>
        </table>   
    )
};