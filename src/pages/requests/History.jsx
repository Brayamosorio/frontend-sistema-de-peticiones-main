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

// Mock data for all petitions (history)
const mockHistoryData = [
  {
    id: 1,
    sender: 'Secretaría Académica',
    email: 'secretaria.academica@fesc.edu.co',
    subject: 'Solicitud de certificado de notas',
    preview: 'Por medio de la presente, solicito amablemente el certificado de notas...',
    body: 'Estimado(a) estudiante,\n\nPor medio de la presente, le informamos que su solicitud de certificado de notas ha sido recibida satisfactoriamente.\n\nPara continuar con el proceso, le solicitamos que se acerque a las oficinas de Secretaría Académica.\n\nCordialmente,\nSecretaría Académica',
    date: '10:42',
    fullDate: '20 de enero de 2026, 10:42 AM',
    unread: true,
    starred: false,
  },
  {
    id: 2,
    sender: 'Yo → Secretaría Académica',
    email: 'secretaria.academica@fesc.edu.co',
    subject: 'Solicitud de constancia de estudios',
    preview: 'Cordialmente solicito una constancia de estudios para tramitar mi visa...',
    body: 'Estimados señores de Secretaría Académica,\n\nCordialmente solicito una constancia de estudios para tramitar mi visa de estudiante en la Embajada de España.\n\nQuedo atento a cualquier información adicional que requieran.\n\nAtentamente,\n[Tu nombre]',
    date: '11:30',
    fullDate: '20 de enero de 2026, 11:30 AM',
    unread: false,
    starred: false,
  },
  {
    id: 3,
    sender: 'Bienestar Universitario',
    email: 'bienestar@fesc.edu.co',
    subject: 'Aprobación de solicitud de beca',
    preview: 'Nos complace informarle que su solicitud de beca ha sido aprobada...',
    body: 'Estimado(a) estudiante,\n\nNos complace informarle que su solicitud de beca ha sido APROBADA para el periodo académico 2026-1.\n\n¡Felicitaciones por este logro!\n\nAtentamente,\nBienestar Universitario',
    date: '9:15',
    fullDate: '20 de enero de 2026, 9:15 AM',
    unread: false,
    starred: true,
  },
  {
    id: 4,
    sender: 'Yo → Bienestar Universitario',
    email: 'bienestar@fesc.edu.co',
    subject: 'Solicitud de beca alimentaria',
    preview: 'Por medio de la presente, me dirijo a ustedes para solicitar formalmente...',
    body: 'Estimados señores de Bienestar Universitario,\n\nPor medio de la presente, me dirijo a ustedes para solicitar formalmente la beca alimentaria del programa de apoyo estudiantil.\n\nAgradezco de antemano su atención.\n\nAtentamente,\n[Tu nombre]',
    date: 'Ene 19',
    fullDate: '19 de enero de 2026, 2:45 PM',
    unread: false,
    starred: true,
  },
  {
    id: 5,
    sender: 'Coordinación de Sistemas',
    email: 'sistemas@fesc.edu.co',
    subject: 'Actualización de credenciales',
    preview: 'Le informamos que sus credenciales de acceso al sistema han sido actualizadas...',
    body: 'Estimado usuario,\n\nLe informamos que sus credenciales de acceso al sistema académico han sido actualizadas correctamente.\n\nSoporte Técnico\nCoordinación de Sistemas',
    date: 'Ayer',
    fullDate: '19 de enero de 2026, 3:30 PM',
    unread: false,
    starred: false,
  },
  {
    id: 6,
    sender: 'Yo → Coordinación de Sistemas',
    email: 'sistemas@fesc.edu.co',
    subject: 'Reporte de falla en plataforma',
    preview: 'Reporto que la plataforma de notas presenta errores al intentar cargar...',
    body: 'Estimado equipo de Soporte Técnico,\n\nMe permito reportar una falla en la plataforma académica:\n\nEl error aparece: "Error 500 - Internal Server Error"\n\nQuedo atento a su pronta solución.\n\nGracias,\n[Tu nombre]',
    date: 'Ene 15',
    fullDate: '15 de enero de 2026, 4:20 PM',
    unread: false,
    starred: false,
  },
  {
    id: 7,
    sender: 'Recursos Humanos',
    email: 'rrhh@fesc.edu.co',
    subject: 'Recordatorio de capacitación',
    preview: 'Este es un recordatorio de la capacitación programada para el próximo lunes...',
    body: 'Estimado colaborador,\n\nLe recordamos que tiene programada una capacitación obligatoria:\n\nTema: Seguridad y Salud en el Trabajo\nFecha: Lunes 27 de enero de 2026\n\nAtentamente,\nRecursos Humanos',
    date: 'Ene 18',
    fullDate: '18 de enero de 2026, 2:00 PM',
    unread: false,
    starred: false,
  },
  {
    id: 8,
    sender: 'Decanatura de Ingeniería',
    email: 'ingenieria@fesc.edu.co',
    subject: 'Invitación a evento académico',
    preview: 'Cordialmente lo invitamos al evento de innovación tecnológica que se llevará...',
    body: 'Estimado estudiante,\n\nLa Decanatura de Ingeniería tiene el gusto de invitarlo al:\n\nEVENTO DE INNOVACIÓN TECNOLÓGICA 2026\n\nFecha: Viernes 31 de enero de 2026\n\n¡Los esperamos!\n\nDecanatura de Ingeniería',
    date: 'Ene 17',
    fullDate: '17 de enero de 2026, 10:00 AM',
    unread: false,
    starred: true,
  },
]

export default function History() {
  const [requests, setRequests] = useState(mockHistoryData)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleSelect = (id, selected) => {
    console.log('Selected:', id, selected)
  }

  const handleStar = (id, starred) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, starred } : r))
  }

  const handleClick = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, unread: false } : r))
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
                  No hay peticiones en el historial
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--fesc-muted)' }}>
                  Todas sus peticiones aparecerán aquí
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
