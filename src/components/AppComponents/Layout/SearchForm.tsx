import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
import { useAppContext } from "@/context/AppContext"
import { useHotkeys } from 'react-hotkeys-hook'
import { useRef } from "react"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const {searchQuery,setSearchQuery} = useAppContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  useHotkeys('Ctrl + M', () => {
    setSearchQuery(null)
    searchInputRef.current?.select();
  })
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <SidebarInput
              id="search"
              placeholder="Search contracts..."
              className="pl-8"
              value={searchQuery!}
              ref={searchInputRef}
              onChange={(e) => {
                if(e.target.value.trim() === ''){
                  setSearchQuery(null)
                }else{
                  setSearchQuery(e.target.value.trim())
                }
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
              <kbd className="hidden lg:inline-flex h-5 max-h-full items-center rounded border border-border px-2 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                Ctrl + M
              </kbd>
            </div>
          </div>
          
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
