import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { getFlashSession } from '../lib/getFlashSession'

const ProtectedPage: NextPage = () => <h1>Protected Page</h1>

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    const flashSession = await getFlashSession(req, res)
    flashSession.flash = 'You must be logged in to access this page.'
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: {} }
}

export default ProtectedPage
export { getServerSideProps }
