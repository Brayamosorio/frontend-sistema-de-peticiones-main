import { useCallback, useEffect, useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import { sendInformApi } from '../../api/sendInformApi'

export default function Approvals() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [processingId, setProcessingId] = useState(null)

  const loadPending = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await sendInformApi.listPending()
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error loading approvals:', err)
      setError('No se pudo cargar las aprobaciones pendientes.')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPending()
  }, [loadPending])

  const handleApprove = async (id) => {
    setProcessingId(id)
    try {
      await sendInformApi.approvePending(id)
      await loadPending()
    } catch (err) {
      console.error('Error approving:', err)
      setError('No se pudo aprobar la peticion.')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id) => {
    const reason = prompt('Motivo del rechazo (opcional):') || ''
    setProcessingId(id)
    try {
      await sendInformApi.rejectPending(id, reason)
      await loadPending()
    } catch (err) {
      console.error('Error rejecting:', err)
      setError('No se pudo rechazar la peticion.')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <AppShell>
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--fesc-border)' }}>
          <div>
            <h2 className="text-lg font-semibold">Aprobaciones pendientes</h2>
            <p className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
              Valida o rechaza los mensajes enviados por tu area
            </p>
          </div>
          <button className="action-btn" onClick={loadPending} disabled={loading}>
            Actualizar
          </button>
        </div>

        {error && (
          <div className="px-6 py-2 text-sm bg-yellow-50 text-yellow-800 border-b" style={{ borderColor: 'var(--fesc-border)' }}>
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {loading && items.length === 0 && (
            <div className="flex items-center justify-center h-40 text-sm" style={{ color: 'var(--fesc-muted)' }}>
              Cargando...
            </div>
          )}

          {items.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-lg font-medium" style={{ color: 'var(--fesc-text)' }}>
                No hay solicitudes pendientes
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--fesc-muted)' }}>
                Cuando un usuario de tu area envie un mensaje, aparecera aqui para validacion
              </p>
            </div>
          )}

          <div className="divide-y" style={{ borderColor: 'var(--fesc-border)' }}>
            {items.map((item) => (
              <div key={item.destinationId} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
                    De: {item.senderName} &lt;{item.senderEmail}&gt;
                  </div>
                  <div className="font-medium">{item.title || 'Sin asunto'}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--fesc-muted)' }}>
                    Destino: {item.requestedType === 'user' ? 'Usuario' : 'Area'} {item.requestedName}
                  </div>
                  {item.description && (
                    <div className="text-sm mt-2">{item.description}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg px-3 py-2 text-sm text-white"
                    style={{ background: 'var(--fesc-primary)' }}
                    onClick={() => handleApprove(item.destinationId)}
                    disabled={processingId === item.destinationId}
                  >
                    Aprobar
                  </button>
                  <button
                    className="rounded-lg px-3 py-2 text-sm border"
                    style={{ borderColor: 'var(--fesc-border)' }}
                    onClick={() => handleReject(item.destinationId)}
                    disabled={processingId === item.destinationId}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
