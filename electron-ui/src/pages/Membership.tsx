import { SidebarWrapper } from '@/components/sidebar-wrapper';
import { Button } from '@/components/ui/button';

export default function Membership() {
    return (
        <SidebarWrapper title="Membership">
            <div className="p-8 flex flex-col gap-4">
                <h1 className="text-3xl font-bold mb-4">Change or Cancel Membership</h1>
                <p>Current Membership Status: </p>
                <Button className="w-3/5" variant="default">Change to Standard</Button>
                <Button className="w-3/5" variant="default">Change to Pro</Button>
                <Button className="w-3/5" variant="default">Change to Pro+</Button>
                <Button className="w-3/5" variant="default">Cancel Membership</Button>
            </div>
        </SidebarWrapper>
    );
}