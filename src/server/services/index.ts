import axios from 'axios';
import { API_ROUTES } from '../apiRoutes';
import { CreateContractBody, GetAllContractsQuery, UpdateContractBody } from '@/types';

const API_KEY_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_APP_API_KEY
}

export const createContract = async(createContractBody:CreateContractBody) => {
    try {
        const contract = await axios.post(API_ROUTES.createContract, createContractBody, {headers:API_KEY_HEADERS});
        
        
        return {
            success:true,
            contract
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            error:'Error Creating Your Contracts'
        }
    }
}


export const getContract = async(contract_id:string) => {
    try {
        const query = '?contract_id=' + contract_id;
        const contract = await axios.get(API_ROUTES.getContract + query);

        return {
            success:true,
            contract:contract.data.data
        }
    } catch (error) {
        return {
            success:false,
            error:'Error Fetching Your Contract'
        }
    }
}

export const updateContract = async(updateContractBody:UpdateContractBody) => {
    try {
        
        const contract = await axios.patch(API_ROUTES.updateContract,updateContractBody, {headers:API_KEY_HEADERS});
        return {
            success:true,
            contract:contract.data.data,
            
        }
    } catch (error) {
        return{
            success:false,
            error:'Error Updating Your Contract'
        }
    }
}


export const getAllContracts = async(query:GetAllContractsQuery) =>{
    try {
        let queryParams = `page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}&order=${query.order}&status=${query.status}`
        if(query.searchQuery)queryParams += '&searchQuery=' + query.searchQuery
        const allContracts = await axios.get(API_ROUTES.getAllContracts + '?' + queryParams);
        console.log(allContracts.data);
        
        return {
            success:true,
            contracts:allContracts.data.data.contracts,
            totalPages:allContracts.data.data.totalPages
        }

    } catch (error) {
        console.log(error);
        return{
            success:false,
            error:'Error Fetching Your Contracts'
        }
    }
}

export const deleteContract = async(contract_id:string) =>{
    try {
        const contract = await axios.delete(API_ROUTES.deleteContract + '?contract_id=' + contract_id, {headers:API_KEY_HEADERS});
        return {
            success:true,
            contract,
            message:'Contract deleted successfully'
        }
    } catch (error) {
        return {
            success:false,
            error:'Error Deleting Contract'

        }
    }
}