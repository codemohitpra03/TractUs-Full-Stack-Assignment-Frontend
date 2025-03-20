
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileBox, FileJson, FileText } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from '@monaco-editor/react';
import { FileUpload } from "@/components/ui/file-upload"
import {  useState } from "react"
import { CONTRACT_TYPE, ContractType, CreateContractBody } from "@/types"
import { toast } from "sonner"
import { createContract } from "@/server/services"

import { useAppContext } from "@/context/AppContext"
import { HandleContractButton } from "../Layout/HandleContractButton"
import { useTheme } from "@/context/theme-provider"
  

export const CreateContract = ({
    openCreateDialog,
    setOpenCreateDialog
}:{
    openCreateDialog: boolean,
    setOpenCreateDialog: any
}) => {

    const {theme} = useTheme();

    const {handleReRender} = useAppContext()

    const [clientName,setClientName] = useState<string>("");

    const [contractType,setContractType] = useState<ContractType>(CONTRACT_TYPE.TEXT);

    const [contractData,setContractData] = useState<string>("");
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    console.log(setFileContent,error);

    const [activeTab,setActiveTab] = useState<string>("paste")

    const [creatingContract,setCreatingContract] = useState<boolean>(false);

    
    const handleFileUpload = (files:any) => {
        const file = files[0];
        console.log(file);
        
        if (!file) return;
    
        const fileType = file.name.split(".").pop()?.toLowerCase();
    
        if (fileType !== "txt" && fileType !== "json") {

            toast("Invalid File Type", {
                description: <p className="text-red-500">Only JSON aand Text Files are allowed</p>,
                
            })
            setFileContent(null);
            return;
        }

        if(contractType === CONTRACT_TYPE.TEXT && fileType === "json"){
            toast("Invalid File Type", {
                description: <p className="text-red-500">Please Select Text File</p>,
                
            })
            setFileContent(null);
            return;
        }
        if(contractType === CONTRACT_TYPE.JSON && fileType === "txt"){
            toast("Invalid File Type", {
                description: <p className="text-red-500">Please Select JSON File</p>,
                
            })
            setFileContent(null);
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target?.result) return;
        
            let fileContent = e.target.result as string;
            if (fileType === "json") {
                try {
                    fileContent = JSON.stringify(JSON.parse(fileContent), null, 2); // Pretty-print JSON
                } catch (err) {
                    toast("Invalid JSON", {
                        description: <p className="text-red-500">The File has invalid JSON Format</p>,
                        
                    })
                    setFileContent(null);
                    return;
                }
            }
        
            setFileContent(fileContent);
            setError(null);
        };
    
        reader.readAsText(file);
    };

    const handleCreateContract = async () =>{
        setCreatingContract(true);
        
        if(!clientName){
            toast("Client Name is Required", {
                description: <p className="text-red-500">Please Enter Client Name</p>,
                
            })
            setCreatingContract(false);
            return;
        }

        if(activeTab === "file"){
            if(fileContent === null){
                toast("No File Selected", {
                    description: <p className="text-red-500">Please Upload a file</p>,
                    
                })
                setCreatingContract(false);
                return;
            }
        }

        const contractBody:CreateContractBody = {
            client_name:clientName,
            contract_data: activeTab === "paste" ? contractData : fileContent ?? '',
            type: contractType,
        }

        const contract = await createContract(contractBody);

        if(!contract.success){
            toast("Error Creating Contract", {
                description: <p className="text-red-500">{contract.error}</p>,
                
            })
            setCreatingContract(false);
            return;
        }

        toast("Contract Created Successfully", {
            description: <p className="text-green-500">Contract Created Successfully</p>,
            
        })




        

        setCreatingContract(false);
        setClientName("");
        setContractData("");
        setContractType(CONTRACT_TYPE.TEXT);
        setFileContent(null);
        setError(null);



        handleReRender();
        setOpenCreateDialog(false);
    }

    

    return (    
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
                
                <Button>Create New</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => {
              e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">Create New Contract <FileBox /></DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full space-y-6">

                    <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col items-start gap-2 pl-1">
                            <Label>Client Name</Label>
                            <Input value={clientName} placeholder="Name..." onChange={(e)=>setClientName(e.target.value)} className=""/>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Label>Contract Type</Label>
                            <Select value={contractType} onValueChange={(val) => setContractType(val)}>
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
                    </div>
                    <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="paste">Paste</TabsTrigger>
                            <TabsTrigger value="file">Upload a File</TabsTrigger>
                        </TabsList>
                        <TabsContent value="paste">
                            <div className="border border-primary rounded-md p-2">

                                <Editor height="30vh"  
                                    language={
                                        contractType === CONTRACT_TYPE.TEXT? "plaintext" :"json" 
                                        
                                    } 
                                    theme={theme === 'light' ? "" : 'vs-dark'}
                                    value={contractData}
                                    onChange={(value) => setContractData(value!)}
                                 />
                            </div>
                            <div className="w-full flex items-center justify-end py-2" >
                                <HandleContractButton handleClick={handleCreateContract} isLoading={creatingContract} />
                            </div>

                        </TabsContent>
                        <TabsContent value="file">
                            <div className="space-y-1">

                                <FileUpload contractType={contractType} onChange={handleFileUpload}   />
                                {<div className="w-full flex items-center justify-end py-2" >
                                    <HandleContractButton handleClick={handleCreateContract} isLoading={creatingContract} />
                                </div>}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>



            </DialogContent>
        </Dialog>

    )
}


