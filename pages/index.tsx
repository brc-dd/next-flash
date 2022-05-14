import type { InferGetServerSidePropsType, NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'
import { withSessionSsr } from 'lib/session'
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

const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { flash = null } = req.session
  delete req.session.flash
  await req.session.save()
  return { props: { flash } }
})

export default IndexPage
export { getServerSideProps }
