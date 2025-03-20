import { AppSidebar } from "@/components/AppComponents/Layout/AppSidebar"
import { ModeToggle } from "@/components/AppComponents/Layout/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
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
import { ArrowLeft } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"

export function Layout() {

    const location = useLocation();

    const isHomepage = location.pathname === '/';
    const contractId = !isHomepage ? location.pathname.replace('/contract/',"") : "";
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">

                        {isHomepage ?
                            <>
                                
                                <SidebarTrigger className="-ml-1  md:hidden"  />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                            </>
                            :
                            <Link to="/">
                                <ArrowLeft size={18} />
                            </Link>
                        }
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="block">
                                    {
                                        isHomepage ?

                                        <BreadcrumbPage>
                                            Your Contracts
                                        </BreadcrumbPage>
                                        :
                                        <Link to="/">
                                            Your Contracts
                                        </Link>
                                    }
                                </BreadcrumbItem>
                                
                                {!isHomepage && 
                                    <>
                                    
                                        <BreadcrumbSeparator className="block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                            {
                                                contractId.slice(0,7) + '...'
                                            }
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ModeToggle/>
                </header>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    )
}
