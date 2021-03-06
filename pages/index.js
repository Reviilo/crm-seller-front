import Layout from '../components/Layout'
import Client from '../components/Client'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import Loader from '../components/Loader'
import { GET_CLIENTS_SELLER } from '../schemas'

const Index = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS_SELLER)
  if (loading) return <Loader textShow="Index - Clients" />
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Clients</h1>
      <Link href="/createclient">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
          Create Clients
        </a>
      </Link>
      {data.getClientsSeller !== null && data.getClientsSeller.length > 0 &&
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Company</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Edit</th>
                <th className="w-1/5 py-2">Delite</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.getClientsSeller.map( client => (
                <Client
                  key={client.id}
                  client={client}
                />              
              ))}
            </tbody>
          </table>
        </div>
      }

    </Layout>
  )
}

export default Index