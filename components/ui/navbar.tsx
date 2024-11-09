import Link from 'next/link'
import { cookies } from 'next/headers'
import { NavAuth } from './nav-auth'
import Image from 'next/image'

export default async function Navbar() {

    const cookieStore = await cookies()
    const user = cookieStore.get("user")

    return (
        <nav className="bg-white shadow-md fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-300">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">

                            <Link href="/" className="text-xl font-bold text-gray-800 ">
                                <Image width={80} height={0} src="/swiftvote1.png" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <NavAuth user={user} />
                </div>
            </div>
        </nav>
    )
}