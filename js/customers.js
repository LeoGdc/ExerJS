'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

const readCustomers = async () => {

    const response = await fetch(url)
    return  await response.json()
}

const createCustomer = async(customer) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
            'content-type':'application/json'
        }
    }
    const response = await fetch(url, options)
    console.log(response.ok)
}

const deleteCustomer = async (codigo) => {
    const options = {
        'method':'DELETE'
    }
    const response = await fetch(`${url}/${codigo}`, options)
    console.log (response.ok)
}
export{
    readCustomers,
    createCustomer,
    deleteCustomer
}