'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

export default function Login() {
    const [personalCode, setPersonalCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            document.cookie = `user=${personalCode}; path=/; max-age=3600; SameSite=Strict`

            await new Promise(resolve => setTimeout(resolve, 1000))

            router.push('/')
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your personal code
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="personalCode">Personal Code</Label>
                            <Input
                                id="personalCode"
                                placeholder="Enter your personal code"
                                value={personalCode}
                                onChange={(e) => setPersonalCode(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                    {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
                    {isLoading && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">Retrieving user information...</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}