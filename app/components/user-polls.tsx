'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Poll } from '@/utils/supabase.types'
import { Answer } from '@/utils/supabase.types'
import { CircleDollarSign, Ban } from 'lucide-react'
import { addAnswer } from '../actions'

interface SequentialPollProps {
    polls: Poll[];
    user_id: string;
}

export default function UserPolls({ polls, user_id }: SequentialPollProps) {
    const [currentPollIndex, setCurrentPollIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    if (!polls) {
        return (
            <div>
                Errpr
            </div>
        )
    }
    if (polls.length <= 0) {
        return (
            <div>
                Teine error
            </div>
        )
    }
    const currentPoll = polls[currentPollIndex]
    const progress = ((currentPollIndex + 1) / polls.length) * 100

    const handleAnswer = async (answer: Answer) => {
        console.log("answer", answer)
        try {
            await addAnswer(answer.answer, user_id, answer.poll_id)
        } catch (error: any) {
            console.log("error", error)

        }
        if (currentPollIndex < polls.length - 1) {
            setCurrentPollIndex(currentPollIndex + 1)
        } else {
            setIsCompleted(true)
        }
    }

    const getIconComponent = (image: string) => {
        switch (image) {
            case "money":
                return <><CircleDollarSign /></>
            default:
                return <><Ban /></>
        }
    }

    if (isCompleted) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">Thank You!</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Wait until some more polls are added
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <p className="mb-4">You have completed all the questions</p>
                        <Button onClick={() => {
                            setCurrentPollIndex(0)
                            setIsCompleted(false)
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
                        >
                            {getIconComponent(answer.image)}
                            {answer.answer}
                        </Button>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-sm text-gray-500">
                    Question {currentPollIndex + 1} of {polls.length}
                </p>
            </CardFooter>
        </Card>
    )
}