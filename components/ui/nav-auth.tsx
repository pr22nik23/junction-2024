"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Button } from './button'
import Link from 'next/link'
import { Menu, User } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { deleteCookie } from '@/app/actions'
import { useRouter } from 'next/navigation'


interface NavAuthProps {
    user: RequestCookie | undefined
}


export const NavAuth: React.FC<NavAuthProps> = ({ user }) => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await deleteCookie()
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex items-center'>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                            <Link href={"/my-votes"}>
                                <DropdownMenuItem>My votes</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href={"/login"}>
                        <Button >Authenticate</Button>
                    </Link>
                )}
            </div>
            <div className="flex items-center sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        {user ? (
                            <>

                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <Link href={"/my-votes"}>
                                    <DropdownMenuItem>My votes</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={handleLogout}>Login</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
