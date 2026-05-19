import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useUser } from '@/context/user-context';

function AccountOptions() {
    const { userId } = useUser()
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDeleteConfirm = async () => {
        setError(null)
        try {
            const res = await fetch(`/api/db-api/delete-user/${userId}`, { method: 'DELETE' })
            if (!res.ok) {
                setError('Failed to delete account. Please try again.')
                return
            }
            navigate('/')
        } catch {
            setError('Could not reach the server. Please try again.')
        }
    }

    return (
        <SidebarWrapper title="Account Options">
            <div className="flex flex-col gap-4 p-8 login-card-enter">
                <Button variant="default" className="w-1/4">Request your Data</Button>
                <Button variant="destructive" className="w-1/4" onClick={() => setIsDialogOpen(true)}>
                    Delete Account
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                            <DialogDescription>
                                This will permanently delete your account and all associated data. This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Delete my account
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </SidebarWrapper>
    )
}

export default AccountOptions
