import { Link } from "react-router"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Check, Copy, Ellipsis, FileBox, FileJson, FileText } from "lucide-react"
import { copyToClipboard } from "@/lib/utils"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CONTRACT_STATUS, CONTRACT_TYPE, ContractStatus, ContractType } from "@/types"
  
const contracts = [
    {
        contract_id:'c1',
        client_name:'PM',
        type: 'text',
        status:'draft',
        created_at:'2017-01-01',
        updated_at:'2017-01-01'
    },
    {
        contract_id:'c2',
        client_name:'MP',
        type: 'json',
        status:'finalized',
        created_at:'2017-01-01',
        updated_at:'2017-01-01'
    },
]
  

export const Home = () => {
    return (
        
        <div className=" flex flex-col h-[calc(89vh)]  py-5 px-8 gap-5">
            {/* <Link to={'/contract/pm'}>pm</Link> */}
            <p className="text-4xl">Your Contracts</p>

            
            <Card className="overflow-y-auto">
                {/* <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader> */}
                <CardContent>
                    <TableDemo/>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>

        </div>
    )
}



  
export function TableDemo() {

    const [isCopied,setIsCopied] = useState<boolean>(false);

    const handleCopyContractAddress = (text:string) =>{
        copyToClipboard(text);
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },1000)

    }
    
    const getStatusBadge = (status:ContractStatus) =>{
        if(status === CONTRACT_STATUS.FINALIZED){

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

    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Created At</TableHead>

                <TableHead className="">Contract Id</TableHead>
                <TableHead className="text-right"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            
            <TableRow className="hover:bg-none" key={contract.contract_id}>
                <TableCell className="font-medium">
                    <FileBox size={20} />
                </TableCell>
                <TableCell className="underline">
                    <Link to={'/contract/' + contract.contract_id}>
                        {contract.client_name}
                    </Link>
                </TableCell>
                <TableCell>
                    {getStatusBadge(contract.status)}
                </TableCell>
                <TableCell >
                    {getContractType(contract.type)}
                    

                </TableCell>
                <TableCell >
                    {contract.updated_at}
                </TableCell>
                <TableCell >
                    {contract.updated_at}
                </TableCell>
                
                <TableCell >
                    <button className="flex items-center gap-3" onClick={() => handleCopyContractAddress(contract.contract_id)}>
                        <span>{contract.contract_id.slice(0,7)}</span>
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
                        <DropdownMenuTrigger className="hover:bg-gray-200 hover:rounded-md p-1 focus:outline-0">
                            <Ellipsis size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={7}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
        </TableFooter>
      </Table>
    )
  }
  