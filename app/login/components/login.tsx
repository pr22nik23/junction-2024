'use client'

import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const steps = [
    { message: "Getting user from database...", duration: 1000 },
    { message: "Validating user...", duration: 2000 },
    { message: "User authenticated", duration: 1000 },
    { message: "Redirecting...", duration: 1000 }
]

export default function GovernmentLogin() {
    const [personalCode, setPersonalCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingMessage, setLoadingMessage] = useState('')
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    const simulateWorkflow = async () => {
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i]
            setLoadingMessage(step.message)
            await new Promise(resolve => setTimeout(resolve, step.duration))
            if (step.duration == 2000) {
                setCurrentStep(i + 2)
            } else {
                setCurrentStep(i + 1)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (personalCode !== "admin" && personalCode.length < 8) {
            setError("Invalid Personal ID. Please enter a valid ID.")
            return
        }

        setIsLoading(true)
        setCurrentStep(0)
        try {
            document.cookie = `user=${personalCode}; path=/; max-age=3600; SameSite=Strict`
            await simulateWorkflow()
            router.push('/')
            router.refresh()
        } catch (err) {
            console.log(err)
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4 max-h-screen">
            <Card className="w-full max-w-md flex flex-col items-center">
                <Image src="/swiftvote1.png" width={140} height={0} alt="logo" className='mt-6' />
                <CardHeader className="space-y-1">
                    {/* <CardTitle className="text-2xl font-bold text-center">Swiftvote login</CardTitle> */}
                    <CardDescription className="text-center">
                        Enter your Personal Identification Number (PIN)
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="personalCode"
                                placeholder="Enter your PIN"
                                value={personalCode}
                                onChange={(e) => setPersonalCode(e.target.value)}
                                required
                                className="w-full"
                                maxLength={20}
                            />
                        </div>
                        <Button type="submit" className="w-full hover:bg-slate-700" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                    {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
                    {isLoading && (
                        <div className="mt-4 space-y-2">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black transition-all duration-500 ease-out"
                                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 text-center">{loadingMessage}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}