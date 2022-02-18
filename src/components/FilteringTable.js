import React ,{useMemo,useState,useEffect} from "react";
import {useTable,useGlobalFilter,useFilters,usePagination,useSortBy} from 'react-table'
import {COLUMNS} from './columns'
import axios from "axios";
import './table.css'
import { GlobalFilter } from "./GlobalFilter";
import { Link, useNavigate } from "react-router-dom";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { render } from "@testing-library/react";



export const FilteringTable=({users})=>{

    const navigate =useNavigate()
    const [row,setRow]=useState([]);
   
    const columns=useMemo(()=>COLUMNS,[])
    const data=useMemo(()=>users,[users]);

    const tableInstance=useTable({
        columns,
        data 
    },useFilters,useGlobalFilter,useSortBy,usePagination)

    const {getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter,
    }=tableInstance;
    
    const {globalFilter}=state
    const{pageIndex}=state

    function getRow(rowFromTable){
        const path = `/user/${rowFromTable.id.name}`
        navigate(path)
    }
    
    return (

        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '🔽 ' : '🔼)'): ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                        ))}                    
                    </tr>
                ))}
            </thead>
            <tbody  {...getTableBodyProps()}>
                {page.map((row)=>{
                    prepareRow(row)                    
                    return (          
                        <tr onClick={()=>getRow(row.original)}{...row.getRowProps()} >
                            {row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                             })}
                        </tr>
                    )                       
                })}
            </tbody>
        </table>   
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Go to page: {' '}
                <input type='number' defaultValue={pageIndex+1} 
                onChange={e=>{
                    const pageNumber=e.target.value ? Number(e.target.value)-1 : 0
                    gotoPage(pageNumber)
                }}
                    style={{width:'50px'}}
                />
            </span>
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>  
        </div>
        </>
       
    )
};