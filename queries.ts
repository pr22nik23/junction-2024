import { eq, sql, and, isNull } from "drizzle-orm";
import db from "./utils/db";
import { AnswerTS, Poll } from "./utils/supabase.types";
import { answers, poll, poll_answer } from "./utils/supabase/schema";


export async function createPoll(question: string, description: string, answer_arr: AnswerTS[]) {
    try {
        await db.transaction(async (tx) => {
            const inserted_poll = await tx.insert(poll)
                .values({
                    question: question,
                    description: description
                })
                .returning({ poll_id: poll.id })

            answer_arr.map(async (answer) => {
                await tx.insert(answers)
                    .values({
                        poll_id: inserted_poll[0].poll_id,
                        answer: answer.answer,
                        description: answer.description,
                        image: answer.image,
                    })
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export async function pollAnswer(answer: string, userID: string, poll_id: number) {
    try {
        await db.insert(poll_answer).values({
            answer: answer,
            user_id: userID,
            poll_id: poll_id
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getPollUrls(user_id: string): Promise<Poll[]> {
    try {
        const data = await db
            .select({
                poll: poll,
                answer: answers,
            })
            .from(poll)
            .leftJoin(answers, eq(answers.poll_id, poll.id))
            .leftJoin(
                poll_answer,
                and(eq(poll_answer.poll_id, poll.id), eq(poll_answer.user_id, user_id))
            )
            .where(isNull(poll_answer.user_id));
        const pollMap: Record<number, Poll> = {};

        data.forEach((row) => {
            const pollId = row.poll.id;

            if (!pollMap[pollId]) {
                pollMap[pollId] = {
                    ...row.poll,
                    answers: [],
                };
            }

            pollMap[pollId].answers.push(row.answer);
        });

        const result: Poll[] = Object.values(pollMap);

        return result;
    } catch (error) {
        console.error('Error retrieving poll URLs:', error);
        return [];
    }
}

export const getUserVotes = async (user_id: string) => {
    console.log("USERRR",user_id)
    try {
        const data = await db.select({
            poll: poll,
            pollanswer: poll_answer
        })
        .from(poll)
        .leftJoin(poll_answer, eq(poll.id, poll_answer.poll_id))
        .where(eq(poll_answer.user_id, user_id))

        return data
    } catch(error) {
        console.log(error)
    }
}