import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { GET_CLIENTS_SELLER } from '../../schemas'
import OrderContext from '../../context/orders/OrderContext'
import Loader from '../Loader'

const AssignClient = () => {
  // state local client
  const [ client, setClient ] = useState([])
  const orderContext = useContext(OrderContext)
  const { addClient } = orderContext
  const { data, loading, error } =  useQuery(GET_CLIENTS_SELLER)
  useEffect( () => addClient(client) , [client])
  const selectClient = clients => setClient(clients)
  if (loading) return <Loader textShow="AssignClient" inline />
  const { getClientsSeller } = data
  return (
    <>
      <p 
        className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      >1. Assign Client </p>
      <Select
        className="mt-3"
        options={getClientsSeller}
        onChange={ option => selectClient(option) }
        getOptionValue={ client => client.id }
        getOptionLabel={ client => `${client.name} ${client.company}` }
        placeholder="Search client"
        noOptionsMessage={ () => 'Theres are not results'}
      />
    </>
  )
}
 
export default AssignClient