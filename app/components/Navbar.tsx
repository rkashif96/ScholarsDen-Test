"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-gray-800 p-4">
      <div className='flex justify-start'>
        <div className=" space-x-8 container mx-auto flex justify-start ms-6 items-center">
          <Link href={'/'} className="text-white font-bold text-xl ">ScholarDen Test</Link>
          <div className="space-x-8">
            {pathName !== '/' && (
              <Link className="text-white" href="/">
                Home
              </Link>
            )}

            {(pathName !== '/signup' && localStorage.getItem('isLoggedIn') != 'success') && (
              <Link className="text-white" href="/signup">
                Signup
              </Link>
            )}

            {(pathName !== '/login' && localStorage.getItem('isLoggedIn') != 'success') && (
              <Link className="text-white" href="/login">
                Login
              </Link>
            )}
          </div>
        </div>
        <div >
          {(pathName !== '/logout' && localStorage.getItem('isLoggedIn') == 'success') && (
            <Link className="text-white" href="/logout">
              Logout
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
