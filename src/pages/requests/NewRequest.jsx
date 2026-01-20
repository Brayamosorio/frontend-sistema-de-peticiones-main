import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import ComposeModal from '../../components/ui/ComposeModal'

export default function NewRequest() {
  const [showModal, setShowModal] = useState(true)

  const handleSend = (data) => {
    console.log('Sending petition:', data)
    alert('¡Petición enviada correctamente!')
  }

  return (
    <AppShell>
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--fesc-primary-light)' }}
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="var(--fesc-primary)">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2" style={{ color: 'var(--fesc-text)' }}>
            Nueva Petición
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--fesc-muted)' }}>
            Redacte su petición utilizando el formulario que aparece en la esquina inferior derecha
          </p>

          {!showModal && (
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ background: 'var(--fesc-primary)' }}
            >
              Abrir formulario
            </button>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSend={handleSend}
      />
    </AppShell>
  )
}
