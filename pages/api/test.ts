import { withSessionRoute } from 'lib/session'

const handler = withSessionRoute(async (req, res) => {
  req.session.flash = 'Test'
  await req.session.save()
  res.redirect(307, '/')
})

export default handler
