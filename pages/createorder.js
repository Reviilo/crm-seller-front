import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import AssignClient from '../components/orders/AssignClient'
import AssignProducts from '../components/orders/AssignProducts'
import OrderSummary from '../components/orders/OrderSummary'
import Total from '../components/orders/Total'
import OrderContext from '../context/orders/OrderContext'
import { useMutation } from '@apollo/client'
import { NEW_ORDER, GET_ORDER_SELLER } from '../schemas'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const CreateOrder = () => {
  const [ message, setMessage ] = useState(null)
  const router = useRouter()
  const orderContext = useContext(OrderContext)
  const { client, products, total } = orderContext

  const [ createOrder ] = useMutation(NEW_ORDER, {
    update(cache, { data: { createOrder } }) {
      const { getOrdersSeller } = cache.readQuery({
        query: GET_ORDER_SELLER
      })

      // Reescribir el cache
      cache.writeQuery({
        query: GET_ORDER_SELLER,
        data: {
          getOrdersSeller: [...getOrdersSeller, createOrder]
        }
      })
    }
  })

  const validateOrders = () => {
    return !products.every( prod => prod.quantity > 0) || total === 0 || client.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
  }

  const createCreateProduct = async () => {
    // Clean order
    const order = products.map( ({ __typename, existence, created, ...prod}) => prod )

    try {
      const { data } = await createOrder({
        variables: {
          input: {
            client: client.id,
            total,
            order
          }
        }
      })

      // Redireccionar
      router.push('/orders')
      // Mostrar alertar
      Swal.fire(
        'Success',
        'Order has been registered successfully',
        'success'
      )


    } catch (error) {
      setMessage(error.message.replace('GraphQL error: ', ''))
      setTimeout( () => { setMessage(null) }, 5000)
    }
  }
  
  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Orders</h1>
      { message && showMessage() }

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProducts />
          <OrderSummary />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 ${validateOrders()}`}
            onClick={ () => createCreateProduct() }
          >
            REGISTER ORDER
          </button>
        </div>
      </div>


    </Layout>
  )
}

export default CreateOrder;