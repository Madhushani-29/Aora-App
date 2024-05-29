import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <span>
            {isAuthenticated ? (
                <>
                    <UsernameMenu />
                </>
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold hover:text-blue-900 hover:bg-white"
                    onClick={async () => await loginWithRedirect()}>
                    Log In
                </Button>
            )}
        </span>
    )
}

export default MainNav;