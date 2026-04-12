import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface IProps {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    subtitle: string,
    submitButton: React.ReactNode,
}

export const ConfirmationModal: React.FC<IProps> = ({open, onOpenChange, title, subtitle, submitButton}) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{subtitle}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {submitButton}
                    </DialogFooter>  
            </DialogContent>
        </Dialog>
    )
}