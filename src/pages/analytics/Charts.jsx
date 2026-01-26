import { useCallback, useEffect, useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import { requestApi } from '../../api/requestApi'
import { normalizeRequestList } from '../../utils/requestMapper'

export default function Charts() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadStats = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [inboxData, sentData, historyData] = await Promise.all([
        requestApi.listInbox(),
        requestApi.listSent(),
        requestApi.listHistory(),
      ])

      const inboxList = normalizeRequestList(inboxData)
      const sentList = normalizeRequestList(sentData)
      const historyList = normalizeRequestList(historyData)
      const pendingCount = historyList.filter((item) => item.state === 'CREADA').length
      const answeredCount = historyList.filter((item) => item.state && item.state !== 'CREADA').length

      setStats({
        received: inboxList.length,
        pending: pendingCount,
        answered: answeredCount,
        sent: sentList.length,
      })
    } catch (err) {
      console.error('Error loading stats:', err)
      setError('No se pudieron cargar las estadisticas.')
      setStats(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  return (
    <AppShell>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--fesc-text)' }}>
            Graficas
          </h1>
          <p style={{ color: 'var(--fesc-muted)' }}>
            Resumen de actividad de peticiones
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg px-4 py-3 text-sm bg-yellow-50 text-yellow-800">
            {error}
          </div>
        )}

        {loading && !stats && (
          <div className="flex items-center justify-center h-40 text-sm" style={{ color: 'var(--fesc-muted)' }}>
            Cargando...
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-card">
              <p className="label">Recibidas</p>
              <p className="value">{stats.received}</p>
              <p className="description">Total en bandeja</p>
            </div>
            <div className="stat-card">
              <p className="label">Pendientes</p>
              <p className="value">{stats.pending}</p>
              <p className="description">Sin respuesta</p>
            </div>
            <div className="stat-card">
              <p className="label">Respondidas</p>
              <p className="value">{stats.answered}</p>
              <p className="description">Finalizadas</p>
            </div>
            <div className="stat-card">
              <p className="label">Enviadas</p>
              <p className="value">{stats.sent}</p>
              <p className="description">Creadas por ti</p>
            </div>
          </div>
        )}

        {!loading && !stats && !error && (
          <div className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
            No hay datos disponibles.
          </div>
        )}
      </div>
    </AppShell>
  )
}
