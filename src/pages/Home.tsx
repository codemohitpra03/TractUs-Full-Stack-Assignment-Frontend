
import {
    Card,
    CardContent,
    
    CardFooter,
    
} from "@/components/ui/card"
import { ContractTable } from "@/components/AppComponents/Home/ContractTable"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CreateContract } from "@/components/AppComponents/Home/CreateContract"
import { useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"
  


  

  

export const Home = () => {

    const {open,toggleSidebar} = useSidebar();
    if(!open){
        toggleSidebar();
    }

    const {totalPages,page,setPage,limit,setLimit} = useAppContext();

    const [openCreateDialog,setOpenCreateDialog] = useState<boolean>(false);

    const handleNextPage = () => {
        if(page < totalPages) {
            setPage(page + 1);
        }
    }
    const handlePrevPage = () => {
        if(page > 1){
            setPage(page - 1);
        }
        
    }

    return (
        
        <div className=" flex flex-col h-[calc(89vh)]  py-5 px-8 gap-5">
            {/* <Link to={'/contract/pm'}>pm</Link> */}
            <div className="w-full flex items-center justify-between">
                <p className="text-4xl">Your Contracts</p>

                <CreateContract openCreateDialog={openCreateDialog} setOpenCreateDialog={setOpenCreateDialog}/>
            </div>

            
            <Card className="overflow-y-auto pb-0">
                {/* <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader> */}
                <CardContent>
                    <ContractTable/>
                </CardContent>
                <CardFooter className="sticky bottom-0 bg-white dark:bg-black  p-5 border-t flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        Showing Page {page} of {totalPages}
                        

                    </div>

                    <div className="flex items-center gap-2">  

                        <div className="flex items-center gap-3 ">
                            <span>Items Per Page</span>
                            <Select value={limit + ''} onValueChange={(val) => setLimit(parseInt(val))}>
                                <SelectTrigger className="w-[80px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'5'}>5</SelectItem>
                                    <SelectItem value={'10'}>10</SelectItem>
                                    <SelectItem value={'20'}>20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Button onClick={handlePrevPage} disabled={page === 1} className="rounded-full size-8">
                            <ChevronLeft />
                        </Button>
                        <Button onClick={handleNextPage} disabled={page === totalPages} className="rounded-full size-8">
                            <ChevronRight />
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}



