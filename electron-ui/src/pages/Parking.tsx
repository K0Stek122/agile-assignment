import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Parking() {
    return (
        <SidebarWrapper title="Parking">
            <div className="p-8 login-card-enter flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Parked for: </p>
                <div className="flex w-full max-w-xl items-center gap-3">
                    <Input className="w-1/3" placeholder="License plate number" aria-label="License plate number" />
                    <Button>Park</Button>
                </div>
            </div>
        </SidebarWrapper>
    );
}

export default Parking