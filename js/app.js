'use strict'

import{openModal , closeModal} from './modal.js'
import {readCustomers , createCustomer, deleteCustomer} from './customers.js'

const createRow = (customer) => {

    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${customer.nome}</td>
    <td>${customer.email}</td>
    <td>${customer.celular}</td>
    <td>${customer.cidade}</td>
    <td>
        <button type="button" class="button green" id = "editar-${customer.id}">editar</button>
        <button type="button" class="button red" id = "excluir-${customer.id}">excluir</button>
    </td>
    `

    return row 
}

const updateTable = async () => {

    const customersContainer = document.getElementById('customers-container')
    //ler a API e armazenar o resultado em uma variavel
    const customers = await readCustomers()
    //preencher a tabela com as informações obtidas pela api

    const rows = customers.map(createRow)
    customersContainer.replaceChildren(...rows)
}

updateTable()

const saveCustomer = async () => {
    // Criar um json com as informações do cliente 

    const customer = {
        "id":"",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular":document.getElementById('celular').value,
        "cidade":document.getElementById('cidade').value
    }
    // Enviar o json para o Servidor API
    await createCustomer(customer)
    // fechar a modal
    closeModal()
    // atualizar os dados da tabela
    updateTable()
}

const actionCustomer = async (event) =>{
    if(event.target.type == 'button'){

        const [action,codigo] = envent.target.id.split('-')

        if(action[0] == 'editar'){
            //função para editar cliente
        }else if(action == 'excluir'){
            //função para deletar cliente
            await deleteCustomer(codigo)
            updateTable()
        }
        
    }
}

updateTable()

//eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveCustomer)
document.getElementById('customers-container').addEventListener('click', actionCustomer)