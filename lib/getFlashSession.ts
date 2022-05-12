import type { Session } from 'next-session/lib/types'
import nextSession from 'next-session'

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn

export type FlashSession = Session & { flash?: string | null }

type GetFlashSession = ReplaceReturnType<ReturnType<typeof nextSession>, Promise<FlashSession>>

export const getFlashSession: GetFlashSession = nextSession()
