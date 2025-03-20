import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "./SearchForm"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SortBy } from "./Filters/SortBy"
import { Status } from "./Filters/Status"

// This is sample data.
const data = {
  
  navMain: [
    {
      title: "Filters",
      url: "#",
      items: [
        {
          title: "Sort By",
          component: <SortBy/>
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="w-full flex items-center justify-center gap-3 ">

          {/* <img src="/contract.png" className="w-6" alt="" /> */}
          <span className="text-2xl font-medium">Contract Manager</span>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={'Filters'}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  Filters
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-5 mt-2">
                    <SidebarMenuItem className=" px-5">
                      {/* <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton> */}

                      <SortBy/>
                    </SidebarMenuItem>
                    <SidebarMenuItem className=" px-5">
                      

                      <Status/>
                    </SidebarMenuItem>
                    
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
