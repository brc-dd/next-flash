import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const auth = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        if (credentials?.username === 'jsmith' && credentials.password === 'foobar') return user
        else return null
      },
    }),
  ],
})

export default auth
