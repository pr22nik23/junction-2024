"use server"

import { createPoll } from "@/queries"
import { getPollUrls } from "@/queries"
import { AnswerTS } from "@/utils/supabase.types"
import { Poll } from "@/utils/supabase.types"
import { pollAnswer } from "@/queries"

export const createPollAction = async (question: string, description: string, answers: AnswerTS[]) => {
  await createPoll(question, description, answers)
}

export const getPolls = async (userID: string): Promise<Poll[]> => {
  return await getPollUrls(userID)
}

export const addAnswer = async (answer: string, user_id: string, poll_id: number) => {
  await pollAnswer(answer, user_id, poll_id)
}