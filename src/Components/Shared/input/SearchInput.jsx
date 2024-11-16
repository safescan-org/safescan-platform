import { Icon } from '@iconify/react'
import React from 'react'

const SearchInput = ({search,setSearch,style,placeholder}) => {
  return (
    <div className=' relative w-full lg:w-[220px]'>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={placeholder ? placeholder : "Search..."} className='text-[13px]  font-normal outline-none w-full  py-[10px] px-3 pl-10 flex items-center text-dark-gray justify-between border-[1px] border-[#E1E9F8] focus:border-primary rounded-[10px]'/>
        <Icon icon="iconamoon:search-bold" className=' text-xl text-[#8E9BBA] absolute top-[10px] left-[9px]' />
    </div>
  )
}

export default SearchInput