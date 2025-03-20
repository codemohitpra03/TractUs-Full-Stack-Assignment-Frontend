
import { getContract, updateContract } from "@/server/services";
import { CONTRACT_TYPE, ContractItem, ContractType } from "@/types";
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FileJson, FileText } from "lucide-react";
import { HandleContractButton } from "@/components/AppComponents/Layout/HandleContractButton";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "@/context/theme-provider";
import { useSidebar } from "@/components/ui/sidebar";

export const Contract = () => {

    const {open,toggleSidebar} = useSidebar();
    if(open){
        toggleSidebar();
    }
    

    const {theme} = useTheme();
    const {id} = useParams();
    const navigate = useNavigate();
    const {handleReRender,renderHelper} = useAppContext();


    const [oldContractData,setOldContractData] = useState<string | null>("");
    const [oldContractType,setOldContractType] = useState<ContractType | null>();

    const [contract,setContract] = useState<ContractItem | null>(null);

    const [editedContractData,setEditedContractData] = useState<string | null>(null);
    const [editedContractType,setEditedContractType] = useState<ContractType | null>(null);

    const [isContractUpdated,setIsContractUpdated] = useState<boolean>(false);

    const [updatingContract,setUpdatingContract] = useState<boolean>(false);


    const fetchContract = async(contract_id:string) => {
        const contract = await getContract(contract_id);

        if(!contract.success){
            console.error("Error fetching contract", contract.error);
            toast("Error Getting Contract Contract", {
                description: <p className="text-red-500">{contract.error}</p>,
                
            })
            navigate('/');
            return;    
        }

        setContract(contract.contract)
        setOldContractType(contract.contract.type);
        setOldContractData(contract.contract.contract_data);
    }
    
    
    const handleUpdateContract = async() => {
        if(!contract || contract.contract_id === null){
            return;
        }
        setUpdatingContract(true);
        const updateContractBody = {
            contract_id: contract?.contract_id!,
            ...((editedContractData !== oldContractData && editedContractData !== null) && {contract_data: editedContractData}),
            ...((editedContractType !== oldContractType &&  editedContractType !== null) && {type: editedContractType}),

            
        }

        const updatedContract = await updateContract(updateContractBody);

        if(!updatedContract.success){
            console.error("Error updating contract", updatedContract.error);
            toast("Error Updating Contract Contract", {
                description: <p className="text-red-500">{updatedContract.error}</p>,
                
            })
            setUpdatingContract(false);
            return;
        }
        setContract(updatedContract.contract)
        setOldContractData(updatedContract.contract.contract_data);
        setOldContractType(updatedContract.contract.type);
        setEditedContractData(updatedContract.contract.contract_data);
        setEditedContractType(updatedContract.contract.type);
        setIsContractUpdated(false);
        setUpdatingContract(false);
        console.log(editedContractData);
        
        toast("Contract Updated Successfully", {
            description: <p className="text-green-500">Contract Updated Successfully</p>,
            
        })
        handleReRender();

    }
    
    
    useEffect(()=>{
        if(id){
            
            
            fetchContract(id)
        }
    },[id,renderHelper])

    return (
        <div className="flex items-center gap-5 flex-col py-5 px-8 ">
            <div className="w-full flex items-center justify-between">
                <p className="text-2xl font-semibold">
                    {
                        !contract
                        ?
                            "Getting your contract"
                        :
                            "Client Name - " + contract.client_name
                    }
                </p>
                <Select disabled={!oldContractType} value={editedContractType ?? oldContractType ?? CONTRACT_TYPE.TEXT} onValueChange={(val) => {
                    setEditedContractType(val); 
                    if(val === oldContractType){
                        setIsContractUpdated(false);
                    }else{
                        setIsContractUpdated(true);
                    }
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={CONTRACT_TYPE.TEXT}>
                            <span>Text</span>
                            <FileText/>
                        </SelectItem>
                        <SelectItem value={CONTRACT_TYPE.JSON}>
                            <span>JSON</span>
                            <FileJson/>
                        </SelectItem>
                        
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full border border-primary rounded-md p-1">
                <Editor height="30vh"  
                    language={
                        editedContractType === null ? contract?.type : editedContractType === CONTRACT_TYPE.TEXT? "plaintext" :"json" 
                        
                        
                    } 
                    theme={theme === 'light' ? "" : 'vs-dark'}
                    value={editedContractData ?? oldContractData ?? ""}
                    onChange={(value) => {
                        setEditedContractData(value ?? "")
                        if(value === oldContractData){
                            setIsContractUpdated(false);
                        }else{
                            setIsContractUpdated(true);
                        }
                    }}
                />
            </div>
            <div className="w-full flex items-start justify-start">

                <HandleContractButton disabled={!isContractUpdated} handleClick={handleUpdateContract} isLoading={updatingContract} />
            </div>
        </div>
    )
}


