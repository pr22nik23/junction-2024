import Link from 'next/link'
import { cookies } from 'next/headers'
import { NavAuth } from './nav-auth'

export default async function Navbar() {

    const cookieStore = await cookies()
    console.log("cookiue", cookieStore)
    console.log(cookieStore.get("user"))
    const user = cookieStore.get("user")

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">Logo</Link>
                        </div>
                        {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Contact
                            </Link>
                        </div> */}
                    </div>
                    <NavAuth user={user} />
                </div>
            </div>
        </nav>
    )
}