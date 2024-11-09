'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Poll } from '@/utils/supabase.types'
import { Answer } from '@/utils/supabase.types'

import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import {
    CircleDollarSign,
    Ban,
    Globe,
    Users,
    Briefcase,
    Gavel,
    Award,
    Flag,
    Shield,
    Vote,
    Handshake,
    Scale,
    Newspaper,
    Meh,
} from "lucide-react";
import { addAnswer } from '../actions'
import { useRouter } from 'next/navigation'

interface SequentialPollProps {
    polls: Poll[];
    user_id: string;
}

export default function UserPolls({ polls, user_id }: SequentialPollProps) {
    const [currentPollIndex, setCurrentPollIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    if (!polls) {
        return (
            <Card className="w-full max-w-md mx-auto border-red-200">
                <CardHeader className="flex flex-col items-center space-y-2">
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <CardTitle className="text-2xl font-bold text-center text-red-700">Oops! An Error Occurred</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg mb-4 text-gray-700">
                        {"We couldn't load the polls at this time."}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later or contact support if the problem persists.
                    </p>
                </CardContent>
            </Card>
        )
    }
    if (polls.length <= 0) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="flex flex-col items-center space-y-2">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <CardTitle className="text-2xl font-bold text-center">All Votes Cast!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg mb-4">
                        {"You've voted on all available polls. Great job participating!"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Your voice matters. Check back later for new polls and keep making a difference!
                    </p>
                </CardContent>
            </Card>
        )
    }
    const currentPoll = polls[currentPollIndex]
    const progress = ((currentPollIndex + 1) / polls.length) * 100

    const handleAnswer = async (answer: Answer) => {
        setIsLoading(true)
        try {
            await addAnswer(answer.answer, user_id, answer.poll_id)
        } catch (error) {
            console.log("error", error)

        }
        if (currentPollIndex < polls.length - 1) {
            setCurrentPollIndex(currentPollIndex + 1)
        } else {
            setIsCompleted(true)
        }
        setIsLoading(false)
    }


    const getIconComponent = (image: string) => {
        switch (image) {
            case "money":
                return <><CircleDollarSign /></>
            case "ban":
                return <><Ban /></>
            case "globe":
                return <><Globe /></>
            case "group":
                return <><Users /></>
            case "briefcase":
                return <><Briefcase /></>
            case "gavel":
                return <><Gavel /></>
            case "award":
                return <><Award /></>
            case "flag":
                return <><Flag /></>
            case "shield":
                return <><Shield /></>
            case "vote":
                return <><Vote /></>
            case "handshake":
                return <><Handshake /></>
            case "scale":
                return <><Scale /></>
            case "newspaper":
                return <><Newspaper /></>
            case "balance":
                return <><Meh /></>
            default:
                return <><Ban /></>
        }
    };

    if (isCompleted) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex justify-center">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-center text-gray-800">All Polls Completed</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Wait until some more polls are added
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <Button onClick={() => {
                            // setCurrentPollIndex(0)
                            setIsCompleted(false)
                            router.refresh()
                        }}>
                            Update
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }


    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-800">{currentPoll.question}</CardTitle>
                {currentPoll.description && (
                    <CardDescription className="text-center text-gray-600">
                        {currentPoll.description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {currentPoll.answers.map((answer: Answer, index: number) => (
                        <Button
                            key={index}
                            onClick={() => handleAnswer(answer)}
                            className="w-full justify-start text-left h-auto py-4 px-6"
                            variant="outline"
                            disabled={isLoading}
                        >
                            {getIconComponent(answer.image)}
                            {answer.answer}
                        </Button>
                    ))}
                </div>

            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Progress value={progress} className="w-full mb-2" />
                {isLoading && (
                    <div className="flex items-center pt-2 justify-center flex-col">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    </div>
                )
                }
            </CardFooter>
        </Card>
    )
}