'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { AnswerTS } from '@/utils/supabase.types'
import { createPollAction } from '../actions'
import { Textarea } from '@/components/ui/textarea'

export default function PollForm() {
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')
    const [answers, setAnswers] = useState<AnswerTS[]>([
        { answer: '', image: '' },
        { answer: '', image: '' }
    ])

    const addAnswer = () => {
        setAnswers([...answers, { answer: '', image: '' }])
    }

    const removeAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index)
        setAnswers(newAnswers)
    }

    const updateAnswer = (index: number, field: keyof AnswerTS, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index] = { ...newAnswers[index], [field]: value }
        setAnswers(newAnswers)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Poll created:', { question, description, answers })
        try {
            await createPollAction(question, description, answers)
        } catch (error) {
            console.log("error", error)
        }
        setQuestion('')
        setDescription('')
        setAnswers([{ answer: '', image: '' }, { answer: '', image: '' }])
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="answer-2xl font-bold answer-center answer-gray-800">Create a New Poll</CardTitle>
                <CardDescription className="answer-center answer-gray-600">
                    Fill in the details below to create your poll
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="question">Question</Label>
                        <Input
                            id="question"
                            placeholder="Enter your poll question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Provide additional conanswer for your poll"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Answer Options</Label>
                        {answers.map((answer, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder={`Answer option ${index + 1}`}
                                        value={answer.answer}
                                        onChange={(e) => updateAnswer(index, 'answer', e.target.value)}
                                        required
                                    />
                                    <Input
                                        placeholder="Icon (e.g., money)"
                                        value={answer.image}
                                        onChange={(e) => updateAnswer(index, 'image', e.target.value)}
                                        className="w-1/3"
                                    />
                                    {answers.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeAnswer(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAnswer}
                            className="w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Answer Option
                        </Button>
                    </div>
                    <Button type="submit" className="w-full">Create Poll</Button>
                </form>
            </CardContent>
        </Card>
    )
}