'use client'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, User } from 'lucide-react'

interface Candidate {
  id: string;
  name: string;
  party: string;
}

interface PollProps {
  question: string;
  candidates: Candidate[];
}

export default function Component({ question,  candidates }: PollProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selectedCandidate) {
      setIsSubmitted(true)
      // Here you would typically send the vote to a server
      console.log(`Vote submitted for candidate: ${selectedCandidate}`)
    }
  }

  const getPartyColor = (party: string) => {
    const colors: { [key: string]: string } = {
      "Progressive Party": "bg-blue-100 border-blue-500 text-blue-700",
      "Conservative Party": "bg-red-100 border-red-500 text-red-700",
      "Centrist Alliance": "bg-purple-100 border-purple-500 text-purple-700",
      "Green Future": "bg-green-100 border-green-500 text-green-700",
    }
    return colors[party] || "bg-gray-100 border-gray-500 text-gray-700"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">Official Voting Ballot</CardTitle>
        <CardDescription className="text-xl text-center text-gray-600 mt-2">
          {question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {candidates.map((candidate) => (
            <Button
              key={candidate.id}
              onClick={() => !isSubmitted && setSelectedCandidate(candidate.id)}
              className={`h-auto text-left justify-start items-start p-4 ${
                getPartyColor(candidate.party)
              } ${
                selectedCandidate === candidate.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              } ${
                isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
              }`}
              disabled={isSubmitted}
            >
              <div className="flex items-center space-x-4">
               <User />                 
                <div>
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-sm">{candidate.party}</p>
                </div>
              </div>
              {selectedCandidate === candidate.id && (
                <Check className="absolute top-2 right-2 w-6 h-6" />
              )}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-6">
        <Button
          onClick={handleSubmit}
          disabled={!selectedCandidate || isSubmitted}
          className="w-full max-w-xs text-lg py-6"
        >
          {isSubmitted ? 'Vote Submitted' : 'Submit Vote'}
        </Button>
      </CardFooter>
      {isSubmitted && (
        <p className="text-center text-green-600 font-semibold mt-4">
          Thank you for voting! Your vote has been recorded.
        </p>
      )}
    </Card>
  )
}