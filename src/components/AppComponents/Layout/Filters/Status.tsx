import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppContext } from '@/context/AppContext'
import { StatusFields } from '@/types'


export const Status = () => {

    const {status,setStatus,setPage} = useAppContext();
    return (
        <div className='flex flex-col items-start gap-3'>
            <span className='text-lg'>Show Status</span>
            <RadioGroup onValueChange={(val) => {
                setStatus(val);
                setPage(1);
            }} defaultValue={status}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={StatusFields.BOTH} id="status-1" />
                    <Label htmlFor="status-1">Both</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={StatusFields.DRAFT} id="status-2" />
                    <Label htmlFor="status-2">Draft</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={StatusFields.FINALIZED} id="status-3" />
                    <Label htmlFor="status-3">Finalized</Label>
                </div>
            </RadioGroup>
        </div>
    )
}
