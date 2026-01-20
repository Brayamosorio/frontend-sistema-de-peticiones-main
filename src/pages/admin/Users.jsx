import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'

export default function Users() {
  const [form, setForm] = useState({
    nombre: '',
    cedula: '',
    email: '',
    rol: '',
    dependencia: '',
    cargo: '',
    sexo: '',
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (Object.values(form).some((v) => v === '')) {
      alert('Por favor complete todos los campos')
      return
    }

    console.log('Usuario creado:', form)
    alert('Usuario creado correctamente')

    setForm({
      nombre: '',
      cedula: '',
      email: '',
      rol: '',
      dependencia: '',
      cargo: '',
      sexo: '',
    })
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
            Gestión de usuarios
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
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Cédula
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
                  Correo electrónico
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
                  placeholder="Ej: Secretaría Académica"
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

              <div>
                <label className="mb-2 block text-sm font-medium" style={labelStyles}>
                  Sexo
                </label>
                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:border-[var(--fesc-primary)]"
                  style={inputStyles}
                >
                  <option value="">Seleccione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setForm({ nombre: '', cedula: '', email: '', rol: '', dependencia: '', cargo: '', sexo: '' })}
                className="rounded-lg px-6 py-3 font-medium transition-colors hover:bg-[var(--fesc-hover)]"
                style={{ color: 'var(--fesc-text)' }}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="rounded-lg px-6 py-3 font-medium text-white transition-colors hover:opacity-90"
                style={{ background: 'var(--fesc-primary)' }}
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  )
}
