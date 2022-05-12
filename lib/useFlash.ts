import type { FlashSession } from './getFlashSession'

export const useFlash = (session: FlashSession) => {
  const { flash = null } = session
  delete session.flash
  return flash
}
