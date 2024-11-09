import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getUserVotes } from '@/queries'
import { Badge } from 'lucide-react'
import { cookies } from 'next/headers'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'


const MyVotes = async () => {
    const user = (await cookies()).get("user")
    if (!user?.value) {
        return <div>xd</div>
    }
    const votes = await getUserVotes(user?.value)
    console.log("VOTESSS", votes)

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-2xl font-bold mb-4 mx-auto text-center">Your Past Votes</h1>
            <ScrollArea className="h-full w-full rounded-md border p-4 max-w-[1000px] mx-auto">
                {votes && votes.map((vote) => (
                    <Card key={vote?.pollanswer!.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{vote.poll.question}</CardTitle>
                            <CardDescription>
                                Poll created {formatDistanceToNow(new Date(vote.poll.created_at), { addSuffix: true })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">{vote.poll.description}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className='flex gap-2'>
                                    <Badge className='text-black'></Badge>
                                    <p>Your answer: <span className='font-bold'>{vote?.pollanswer!.answer}</span></p>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Voted {formatDistanceToNow(new Date(vote?.pollanswer!.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>
    )
}

export default MyVotes