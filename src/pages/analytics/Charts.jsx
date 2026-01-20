import AppShell from '../../components/layout/AppShell'

export default function Charts() {
  return (
    <AppShell>
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--fesc-primary-light)' }}
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="var(--fesc-primary)">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2" style={{ color: 'var(--fesc-text)' }}>
            Gráficas
          </h2>
          <p className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
            Próximamente: estadísticas y análisis de peticiones
          </p>
        </div>
      </div>
    </AppShell>
  )
}
