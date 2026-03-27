import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Button } from "@/components/ui/button";

function AccountOptions() {
    return (
        <SidebarWrapper title="Account Options">
            <div className="flex flex-col gap-4 p-8 login-card-enter">
                <Button variant="default" className="w-1/4">Request your Data</Button>
                <Button variant="default" className="w-1/4">Delete Account</Button>
            </div>
        </SidebarWrapper>
    )
}
export default AccountOptions