import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'
import { getFlashSession } from '../lib/getFlashSession'
import { useFlash } from '../lib/useFlash'
import 'react-toastify/dist/ReactToastify.min.css'

const IndexPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ flash }) => {
  const { status } = useSession()

  if (flash) toast.error(flash, { toastId: 'access-denied' })

  return (
    <>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{' '}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>

      {status === 'authenticated' ? (
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign out
        </a>
      ) : (
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          Sign In
        </a>
      )}

      <ToastContainer />
    </>
  )
}

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const flashSession = await getFlashSession(req, res)
  const flash = useFlash(flashSession)
  return { props: { flash } }
}

export default IndexPage
