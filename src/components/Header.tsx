import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';

const Header = () => {
    return (
        <div className='border-b-2 border-b-blue-900'>
            <div className='container mx-auto flex justify-between items-center py-6'>
                <Link to="/" className='text-3xl font-bold tracking-tight text-blue-900'>TaskMate.com</Link>
                <div className='md:hidden'>
                    <MobileNav/>
                </div>
                <div className='hidden md:block'>
                    <MainNav/>
                </div>
            </div>
        </div>
    )
}

export default Header;