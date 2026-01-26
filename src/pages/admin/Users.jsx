import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import { authApi } from '../../api/authApi'

const initialForm = {
  nombre: '',
  cedula: '',
  email: '',
  usuario: '',
  contrasena: '',
  rol: '',
  dependencia: '',
  cargo: '',
}

export default function Users() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (Object.values(form).some((v) => v === '')) {
      setMensaje('Por favor complete todos los campos')
      return
    }

    setLoading(true)
    setMensaje('')

    try {
      const datosUsuario = {
        firstName: form.nombre.split(' ')[0],
        lastName: form.nombre.split(' ').slice(1).join(' ') || form.nombre,
        institutionalEmail: form.email,
        identifier: parseInt(form.cedula, 10),
        phone: 1234567890,
        username: form.usuario,
        password: form.contrasena,
        area: form.dependencia,
        roleRequest: {
          roleList: [form.rol === 'admin' ? 'ADMIN' : 'FUNC'],
        },
      }

      const response = await authApi.register(datosUsuario)

      if (response) {
        setMensaje('Usuario creado correctamente')
        setTimeout(() => {
          setForm(initialForm)
          setMensaje('')
        }, 2000)
      }
    } catch (error) {
      setMensaje(error.response?.data?.message || 'Error al crear el usuario')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const inputStyles = {
    borderColor: 'var(--fesc-border)',
    background: 'var(--fesc-surface)',
  }

  const labelStyles = {
    color: 'var(--fesc-text)',
  }

  return (
    <AppShell>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--fesc-text)' }}>
            Gestion de usuarios
          </h1>
          <p style={{ color: 'var(--fesc-muted)' }}>
            Cree y administre los usuarios del sistema
          </p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-xl border p-6"
          style={{ borderColor: 'var(--fesc-border-light)' }}
        >
          <h2 className="text-lg font-medium mb-6" style={{ color: 'var(--fesc-text)' }}>
            Crear nuevo usuario
          </h2>

          {mensaje && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                mensaje.includes('correctamente')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Nombre completo
                </label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ej: Juan Perez"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Cedula
                </label>
                <input
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ej: 1090123456"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Correo electronico
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="correo@fesc.edu.co"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Usuario
                </label>
                <input
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ej: juanperez"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Contrasena
                </label>
                <input
                  type="password"
                  name="contrasena"
                  value={form.contrasena}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ingrese contrasena"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Rol
                </label>
                <select
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                >
                  <option value="">Seleccione</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Dependencia
                </label>
                <input
                  name="dependencia"
                  value={form.dependencia}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ej: Secretaria Academica"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Cargo
                </label>
                <input
                  name="cargo"
                  value={form.cargo}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                  placeholder="Ej: Coordinador"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setForm(initialForm)}
                className="rounded-lg px-6 py-3 font-medium transition-colors hover:bg-[var(--fesc-hover)]"
                style={{ color: 'var(--fesc-text)' }}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="rounded-lg px-6 py-3 font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
                style={{ background: 'var(--fesc-primary)' }}
                disabled={loading}
              >
                {loading ? 'Creando usuario...' : 'Crear usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  )
}
