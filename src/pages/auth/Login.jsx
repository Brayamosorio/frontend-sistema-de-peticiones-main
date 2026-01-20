import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { setAuth } from '../../store/authStore'
import { AuroraBackground } from '../../components/ui/aurora-background'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')

    // TEMPORAL (mock). Luego se conecta al backend.
    const isAdmin = email === 'admin@fesc.edu.co' && pass === '1234'
    const isUser = email === 'user@fesc.edu.co' && pass === '1234'

    if (!isAdmin && !isUser) {
      setErr('Credenciales incorrectas.')
      return
    }

    setAuth({
      token: 'mock-token',
      role: isAdmin ? 'admin' : 'user',
      name: isAdmin ? 'Administrador' : 'Usuario',
      email,
    })

    nav('/dashboard', { replace: true })
  }

  return (
    <AuroraBackground>
      <div className="flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-2xl border bg-white/90 p-6 shadow-xl backdrop-blur"
            style={{ borderColor: 'var(--fesc-border)' }}
          >
            <h1 className="mb-1 text-2xl font-bold">Iniciar sesión</h1>
            <p className="mb-6 text-sm" style={{ color: 'var(--fesc-muted)' }}>
              Sistema de Peticiones • FESC
            </p>

            {err && (
              <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Correo</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none"
                  style={{ borderColor: 'var(--fesc-border)' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@fesc.edu.co"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none"
                  style={{ borderColor: 'var(--fesc-border)' }}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button
                className="w-full rounded-lg py-2 font-medium text-white"
                style={{ background: 'var(--fesc-primary)' }}
              >
                Entrar
              </button>
            </form>

            <div className="mt-4 text-xs" style={{ color: 'var(--fesc-muted)' }}>
              Demo: admin@fesc.edu.co / 1234 — user@fesc.edu.co / 1234
            </div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
