import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoginButton } from './Auth0/Login'
import { LogoutButton } from './Auth0/Logout'
import { Profile } from './Auth0/Profile'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();


  return (
    <nav className='pt-5 font-Monserrat text-white relative grid grid-cols-3 gap-4 z-100 w-full'>
      <span className='ml-10 text-xl font-semibold'>INMOBILIARIA</span>
      <div className='m-auto space-x-6'>



        
        <NavLink className={({ isActive }) =>
          (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
        } to='/state/create'>About us</NavLink>
        <NavLink className={({ isActive }) =>
          (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
        } end to='/state'>Properties</NavLink>
        <NavLink className={({ isActive }) =>
          (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
        } to='/contacto'>Contact</NavLink>
      </div>
      <div className='text-right'>
        {isAuthenticated ? <>
          <Profile />
          <LogoutButton />
        </>
          : <LoginButton />
        }
      </div>
    </nav>
  )
}

export default Nav