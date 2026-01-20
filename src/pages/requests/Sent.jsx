import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import RequestRow from '../../components/ui/RequestRow'
import RequestDetail from '../../components/ui/RequestDetail'

// Icons
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
)

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

// Mock data for sent petitions
const mockSentData = [
  {
    id: 1,
    sender: 'Para: Secretaría Académica',
    email: 'secretaria.academica@fesc.edu.co',
    subject: 'Solicitud de constancia de estudios',
    preview: 'Cordialmente solicito una constancia de estudios para tramitar mi visa de estudiante...',
    body: 'Estimados señores de Secretaría Académica,\n\nCordialmente solicito una constancia de estudios para tramitar mi visa de estudiante en la Embajada de España.\n\nMis datos son:\n- Nombre: [Tu nombre completo]\n- Documento: [Tu cédula]\n- Programa: Ingeniería de Sistemas\n- Semestre: 6to semestre\n\nRequiero que el documento incluya:\n- Fecha de inicio del programa\n- Fecha esperada de graduación\n- Estado actual (activo)\n- Intensidad horaria\n\nQuedo atento a cualquier información adicional que requieran.\n\nGracias por su atención.\n\nAtentamente,\n[Tu nombre]',
    date: '11:30',
    fullDate: '20 de enero de 2026, 11:30 AM',
    unread: false,
    starred: false,
  },
  {
    id: 2,
    sender: 'Para: Bienestar Universitario',
    email: 'bienestar@fesc.edu.co',
    subject: 'Solicitud de beca alimentaria',
    preview: 'Por medio de la presente, me dirijo a ustedes para solicitar formalmente la beca alimentaria del programa...',
    body: 'Estimados señores de Bienestar Universitario,\n\nPor medio de la presente, me dirijo a ustedes para solicitar formalmente la beca alimentaria del programa de apoyo estudiantil.\n\nActualmente me encuentro cursando el 4to semestre de Ingeniería de Sistemas y mi situación económica me impide cubrir los gastos de alimentación durante mi jornada académica.\n\nAdjunto los documentos requeridos:\n- Carta de solicitud\n- Fotocopia del documento de identidad\n- Certificado de ingresos\n- Recibo de servicios públicos\n\nAgradezco de antemano su atención y pronta respuesta.\n\nAtentamente,\n[Tu nombre]\nEstudiante de Ingeniería de Sistemas',
    date: 'Ene 19',
    fullDate: '19 de enero de 2026, 2:45 PM',
    unread: false,
    starred: true,
  },
  {
    id: 3,
    sender: 'Para: Coordinación de Sistemas',
    email: 'sistemas@fesc.edu.co',
    subject: 'Reporte de falla en plataforma',
    preview: 'Reporto que la plataforma de notas presenta errores al intentar cargar las calificaciones del tercer corte...',
    body: 'Estimado equipo de Soporte Técnico,\n\nMe permito reportar una falla en la plataforma académica:\n\nDescripción del problema:\n- La plataforma de notas presenta errores al intentar cargar las calificaciones del tercer corte\n- El error aparece: "Error 500 - Internal Server Error"\n- El problema ocurre desde el día 15 de enero\n\nInformación adicional:\n- Navegador: Google Chrome 120\n- Sistema operativo: Windows 11\n- He intentado desde diferentes redes sin éxito\n- He limpiado caché y cookies\n\nQuedo atento a su pronta solución.\n\nGracias,\n[Tu nombre]',
    date: 'Ene 15',
    fullDate: '15 de enero de 2026, 4:20 PM',
    unread: false,
    starred: false,
  },
]

export default function Sent() {
  const [requests, setRequests] = useState(mockSentData)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleSelect = (id, selected) => {
    console.log('Selected:', id, selected)
  }

  const handleStar = (id, starred) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, starred } : r))
  }

  const handleClick = (id) => {
    const request = requests.find(r => r.id === id)
    setSelectedRequest(request)
  }

  const handleBack = () => {
    setSelectedRequest(null)
  }

  return (
    <AppShell>
      {selectedRequest ? (
        <RequestDetail request={selectedRequest} onBack={handleBack} />
      ) : (
        <div className="h-full flex flex-col">
          {/* Toolbar */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b bg-white"
            style={{ borderColor: 'var(--fesc-border)' }}
          >
            <input
              type="checkbox"
              className="w-[18px] h-[18px] cursor-pointer accent-[var(--fesc-primary)]"
            />
            <button className="action-btn" title="Actualizar">
              <RefreshIcon />
            </button>
            <button className="action-btn" title="Más opciones">
              <MoreIcon />
            </button>

            <div className="flex-1" />

            <span className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
              1-{requests.length} de {requests.length}
            </span>
          </div>

          {/* Request List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {requests.map((request) => (
              <RequestRow
                key={request.id}
                {...request}
                onSelect={handleSelect}
                onStar={handleStar}
                onClick={handleClick}
              />
            ))}

            {requests.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-lg font-medium" style={{ color: 'var(--fesc-text)' }}>
                  No hay peticiones enviadas
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--fesc-muted)' }}>
                  Las peticiones que envíe aparecerán aquí
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
