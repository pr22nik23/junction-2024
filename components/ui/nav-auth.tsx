"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Button } from './button'
import Link from 'next/link'
import { Menu, User } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { deleteCookie } from '@/app/actions'

interface NavAuthProps {
    user: RequestCookie | undefined
}

const handleLogout = async () => {
    try {
        await deleteCookie()
    } catch (error) {
        console.log(error)
    }
}

export const NavAuth: React.FC<NavAuthProps> = ({ user }) => {
    return (
        <div className='flex items-center'>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                {user.name}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { }}>Logout</DropdownMenuItem>
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
                        <DropdownMenuItem asChild>
                            <Link href="/">Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/about">About</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/contact">Contact</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user ? (
                            <>
                                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { }}>Logout</DropdownMenuItem>
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
