import { AppSidebar } from "@/components/AppComponents/Layout/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router"

export function Layout() {

    const location = useLocation();

    const isHomepage = location.pathname === '/';
    const contractId = !isHomepage ? location.pathname.replace('/contract/',"") : "";
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                {
                                    isHomepage ?

                                    <BreadcrumbPage>
                                        Your Contracts
                                    </BreadcrumbPage>
                                    :
                                    <BreadcrumbLink href="/">
                                        Your Contracts
                                    </BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                            
                            {!isHomepage && 
                                <>
                                
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                        {
                                            contractId
                                        }
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            }
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    )
}
