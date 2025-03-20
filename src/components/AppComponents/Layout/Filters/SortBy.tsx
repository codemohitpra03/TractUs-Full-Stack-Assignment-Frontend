import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppContext } from '@/context/AppContext'
import { SortFields, SortOrderFields } from '@/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export const SortBy = () => {

    const {sortBy,setSortBy,setPage,order,setOrder} = useAppContext();
    return (
        <div className='flex flex-col items-start gap-3'>
            <div className='flex items-center justify-between w-full'>
                <span className='text-lg'>Sort By</span>

                <Select value={order} onValueChange={(val)=>setOrder(val)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={SortOrderFields.DESC}>Desc</SelectItem>
                        <SelectItem value={SortOrderFields.ASC}>Asc</SelectItem>
                        
                        
                    </SelectContent>
                </Select>


            </div>
            <RadioGroup onValueChange={(val) => {
                setSortBy(val);
                setPage(1);
            }} defaultValue={sortBy}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SortFields.CREATED_AT} id="sort-1" />
                    <Label htmlFor="sort-1">Created At</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SortFields.CLIENT_NAME} id="sort-2" />
                    <Label htmlFor="sort-2">Client Name</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SortFields.LAST_MODIFIED} id="sort-3" />
                    <Label htmlFor="sort-3">Last Modified</Label>
                </div>
            </RadioGroup>
        </div>
    )
}


{/* <RadioGroup
            value={val}
            onChange={(value) => {console.log(val);
        }}
            defaultValue="1"
            style={
                { "--primary": "238.7 83.5% 66.7%", "--ring": "238.7 83.5% 66.7%" } as React.CSSProperties
        }
        ></RadioGroup> */}