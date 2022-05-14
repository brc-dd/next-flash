import type { IronSessionOptions } from 'iron-session'
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'sid',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
}

declare module 'iron-session' {
  interface IronSessionData {
    flash?: string | undefined
  }
}

export const withSessionRoute = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, sessionOptions)

export const withSessionSsr = <P extends Record<string, unknown> = Record<string, unknown>>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => withIronSessionSsr(handler, sessionOptions)
