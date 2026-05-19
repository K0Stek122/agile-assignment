import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Parking() {
    return (
        <SidebarWrapper title="Parking">
            <div className="p-8 login-card-enter flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Parking information: </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Parking started: 2026-05-19 00:00:00</li>
                    <li>Parked for: 00:00:00</li>
                </ul>
                <div className="flex w-full max-w-xl items-center gap-3">
                    <Input className="w-1/3" placeholder="License plate number" aria-label="License plate number" />
                    <Button>Park</Button>
                </div>
            </div>
        </SidebarWrapper>
    );
}

export default Parking
