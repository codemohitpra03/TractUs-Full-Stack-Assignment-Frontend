// @ts-nocheck
import {
    TableCell,
    
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import { Check, CircleCheck, Copy, Ellipsis, FileBox, FileJson, FileMinus, FileText, PackageX } from "lucide-react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { CONTRACT_STATUS, CONTRACT_TYPE, ContractItem, ContractStatus, ContractType } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { copyToClipboard } from "@/lib/utils"
import { deleteContract } from "@/server/services"
import { toast } from "sonner"
import { useAppContext } from "@/context/AppContext"

import { socket } from "@/server/socket"

const getStatusBadge = (status:ContractStatus) =>{
    if(status === CONTRACT_STATUS.DRAFT){

        return <Badge className="bg-yellow-500 w-16">
            Draft
        </Badge>
    }

    return <Badge className="bg-green-500 w-16">
        Finalized
    </Badge>

}

const getContractType = (type:ContractType) =>{
    if(type === CONTRACT_TYPE.JSON){

        return <span className="flex items-center gap-1">
                <span>
                    JSON
                </span>
                <FileJson className="mt-0.5" size={16} />
            </span>
    }
    return <span className="flex items-center gap-1">
            <span>
                Text
            </span>
            <FileText className="mt-0.5" size={16} />
        </span>
    
    
}
export const ContractItemRow = ({contract,changeUpdatingInfo,updatingInfo}:{contract:ContractItem,changeUpdatingInfo:any,updatingInfo:boolean}) => {
    console.log(contract);
    
    const {handleReRender} = useAppContext();
    
    const [updatedContract, setUpdatedContract] = useState<ContractItem | null>(null);
    const [errMsg,setErrMsg] = useState<{message:string,contract_id:string}|null>(null);
    const [isUpdatingContractStatus,setIsUpdatingContractStatus] = useState<boolean>(false);

    
    
    const updateContractStatus = useCallback(( status:'draft' | 'finalized') => {
        socket.emit("updateContract", { contract_id:contract.contract_id, status });
        changeUpdatingInfo(contract.contract_id,false)
    },[contract.contract_id]);

    
    const [isCopied,setIsCopied] = useState<boolean>(false);
    const [newStatus,setNewStatus] = useState<string | null>(null)
    const handleCopyContractAddress = (text:string) =>{
        copyToClipboard(text);
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },1000)

        toast("Copied To Clipboard", {
            description: <p className="text-black">{text.slice(0,7) + '...'}</p>,
            action: {
              label: "Done",
              onClick: () => console.log(text),
            },
        })
  

    }
    
    

    const handleDeleteContract = async(contract_id:string) =>{
        const deletedContract = await deleteContract(contract_id);
        if(!deletedContract.success){
            //toast
            toast("❌ Error deleting contract", {
                description: <p className="text-black">{contract_id.slice(0,7) + '...'}</p>,
                action: {
                  label: "Done",
                  onClick: () => console.log(contract_id),
                },
            })
            return;
        }
        toast("🔴 Deleted Successfully", {
            description: <p className="text-black">{contract_id.slice(0,7) + '...'}</p>,
            action: {
              label: "Done",
              onClick: () => console.log(contract_id),
            },
        })
        handleReRender();
        //success toast
        //render helper
    }

    useEffect(() =>{
        if(errMsg !== null && contract.contract_id === errMsg.contract_id){
            toast("Error", {
                description: <p className="text-red-500">{errMsg.message}</p>,
                
            })
            
        }

        if(updatedContract && contract.contract_id === updatedContract.contract_id){
            setNewStatus(updatedContract.status)
        }
        
        
    },[errMsg,updatedContract])
    

    return (
        <TableRow className="hover:bg-none" key={contract.contract_id}>
            <TableCell className="font-medium">
                <FileBox size={20} />
            </TableCell>
            <TableCell className="underline">
                <Link to={'/contract/' + contract.contract_id}>
                    {contract.client_name}
                </Link>
            </TableCell>
            <TableCell className="pr-10">
                
                {getStatusBadge(newStatus ?? contract.status)}
            </TableCell>
            <TableCell >
                {getContractType(contract.type)}
                

            </TableCell>
            <TableCell >
                <Timestamp timestamp={contract.created_at}/>
                
            </TableCell>
            <TableCell >
                <Timestamp timestamp={contract.updated_at}/>
                
            </TableCell>
            
            <TableCell >
                <button className="flex items-center gap-3" onClick={() => handleCopyContractAddress(contract.contract_id)}>
                    <span>{contract.contract_id.slice(0,7)}...</span>
                    {
                        isCopied
                        ?
                            <Check className="mt-1" size={15} />
                        :
                            <Copy className="mt-1" size={15} />
                    }
                </button>
            </TableCell>
            <TableCell className="text-right">
                
                

                <DropdownMenu>
                    <DropdownMenuTrigger className="dark:hover:bg-gray-700 hover:bg-gray-200 hover:rounded-md p-1 focus:outline-0">
                        <Ellipsis size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        
                        
                        {((updatedContract?.status ?? contract.status) !== CONTRACT_STATUS.DRAFT) && <DropdownMenuItem disabled={updatingInfo} onClick={() => updateContractStatus('draft')} >
                            <FileMinus className="text-yellow-500" size={10} /> Make Draft
                        </DropdownMenuItem>}
                        {(updatedContract?.status ?? contract.status) !== CONTRACT_STATUS.FINALIZED && <DropdownMenuItem disabled={updatingInfo} onClick={() => updateContractStatus('finalized')} >
                            <CircleCheck className="text-green-500" size={10} /> Finalize
                        </DropdownMenuItem>}


                        <DropdownMenuItem onClick={() => handleDeleteContract(contract.contract_id)}>
                            <PackageX className="text-red-500" size={10} /> Delete
                        </DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>

            </TableCell>
        </TableRow>
    )
}


const Timestamp = ({ timestamp }: { timestamp: string }) => {
    const [hover, setHover] = useState(false);
  
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().split("T")[0]; // "2025-03-14"
    const formattedTime = date.toISOString().split("T")[1].split(".")[0]; // "15:06:18"
  
    return (
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={formattedTime} // Shows full timestamp on hover as tooltip
        className="cursor-pointer"
      >
        {hover ? formattedTime : formattedDate}
      </span>
    );
  };
  