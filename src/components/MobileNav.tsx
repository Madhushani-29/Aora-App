import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';
import { CircleUserRound, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-blue-900' />
            </SheetTrigger>
            <SheetContent className='space-y-4'>
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-blue-900" />
                            {user?.email}
                        </span>
                    ) : (
                        <span> Welcome to TaskMate!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className='flex flex-col gap-4'>
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            onClick={() => loginWithRedirect()}
                            className="flex-1 font-bold bg-blue-900"
                        >
                            Log In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;