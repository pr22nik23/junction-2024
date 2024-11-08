import { Infer } from "next/dist/compiled/superstruct";
import { answers, poll } from "./supabase/schema";

export type Answer = Infer<typeof answers>
export type AnswerTS = Omit<Answer, "id">;
export type Poll = Infer<typeof poll> & { answers: Answer[] }