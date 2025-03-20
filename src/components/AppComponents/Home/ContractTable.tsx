import  { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    
    TableCell,
    
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



import { ContractItemRow } from "@/components/AppComponents/Home/ContractItem"
import { getAllContracts } from '@/server/services'
import { ContractItem } from '@/types'
import { useAppContext } from '@/context/AppContext'
import { Copy, Ellipsis, FileBox } from 'lucide-react'
import { toast } from 'sonner'
import { socket } from '@/server/socket'
export const ContractTable = () => {
    


    const {page,limit,renderHelper,order,sortBy,status,setTotalPages,searchQuery} = useAppContext();
    const [updatingContracts, setUpdatingContracts] = useState<Record<string, boolean>>({});
    
    const changeUpdatingInfo = (contract_id:string,info:boolean) => {
        setUpdatingContracts((prev) => ({ ...prev, [contract_id]: info }));
    }
    
    useEffect(() => {
        socket.on("contractUpdated", (new_contract: ContractItem) => {
            console.log("📢 Contract Updated Event:", new_contract);
            
            setContracts((prevContracts) => {
                return (prevContracts ?? []).map((contract) =>
                    contract.contract_id === new_contract.contract_id ? new_contract : contract
                );
            });
            changeUpdatingInfo(new_contract.contract_id,false)
        });
    
        return () => {
            socket.off("contractUpdated");
        };
    }, []);

    // @ts-ignore
    const [error,setError] = useState<string | null>(null);

    const [contracts,setContracts] = useState<ContractItem[] | null>(null);

    const handleFetchAllContracts = async() =>{
        const fetchedContracts = await getAllContracts({
            page,
            limit,
            sortBy,
            order,
            status,
            ...(searchQuery !== null && {searchQuery})
        });
        if(!fetchedContracts.success){
            setError(fetchedContracts.error!);
            toast("Error fetching Contracts", {
                description: <p className="text-red-500">There was an error getting contracts</p>,
                
            })
            setContracts(null);
        }
        setContracts(fetchedContracts.contracts);
        setTotalPages(fetchedContracts.totalPages)
    }

    useEffect(()=>{
        handleFetchAllContracts();
        
    },[page,sortBy,status,order,limit,renderHelper])

    useEffect(()=>{
        const searchDebounce = setTimeout(()=>{
            handleFetchAllContracts();
        },2000)
        return ()=>{
            clearTimeout(searchDebounce);
        }
    },[searchQuery])

    return (
        <div className='relative overflow-auto '>

            <Table>
            
            <TableHeader className='sticky top-0 '>
                <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Created At</TableHead>
    
                    <TableHead className="">Contract Id</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {
                    contracts === null
                    ?
                        <>
                            <ShimmerRow/>
                            <ShimmerRow/>
                            <ShimmerRow/>
                        </>
                    :
                        contracts.length === 0
                        ?
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">No Contracts Found</TableCell>
                            </TableRow>
                        :
                            contracts?.map((contract) => (
                            
                                <ContractItemRow key={contract.contract_id} contract={contract} updatingInfo={updatingContracts[contract.contract_id] || false} changeUpdatingInfo={changeUpdatingInfo} />
                            ))
                }
            </TableBody>
            
            </Table>
        </div>
    )
}


const ShimmerRow = () =>{
    return (
        
        <TableRow className="hover:bg-none animate-pulse" >
            <TableCell className="font-medium">
                <FileBox className='text-gray-500 ' size={20} />
            </TableCell>
            <TableCell className="underline">
                <div className='h-2 rounded-full  w-14 bg-gray-400'></div>
            </TableCell>
            <TableCell>
                <div className='h-2 rounded-full  w-14 bg-gray-400'></div>
            </TableCell>
            <TableCell >
                <div className='h-2 rounded-full  w-14 bg-gray-400'></div>
                

            </TableCell>
            <TableCell >
                <div className='h-2 rounded-full  w-14 bg-gray-400'></div>
            </TableCell>
            <TableCell >
                <div className='h-2 rounded-full  w-14 bg-gray-400'></div>
            </TableCell>
            
            <TableCell >
                <button className="flex items-center gap-3" >
                    <span>...</span>
                    <Copy className="mt-1" size={15} />
                    
                </button>
            </TableCell>
            <TableCell className="text-right">
                <Ellipsis size={20} />
                


            </TableCell>
        </TableRow>
        
    )
}