
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
export const ContractItem = ({contract}:ContractItem) => {
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
  )
}
