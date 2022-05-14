import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { withSessionSsr } from 'lib/session'

const ProtectedPage: NextPage = () => <h1>Protected Page</h1>

const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    req.session.flash = 'You must be logged in to access this page.'
    await req.session.save()
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: {} }
})

export default ProtectedPage
export { getServerSideProps }
