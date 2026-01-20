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

// Mock data for received petitions
const mockInboxData = [
  {
    id: 1,
    sender: 'Secretaría Académica',
    email: 'secretaria.academica@fesc.edu.co',
    subject: 'Solicitud de certificado de notas',
    preview: 'Por medio de la presente, solicito amablemente el certificado de notas del semestre actual para trámites laborales...',
    body: 'Estimado(a) estudiante,\n\nPor medio de la presente, le informamos que su solicitud de certificado de notas ha sido recibida satisfactoriamente.\n\nPara continuar con el proceso, le solicitamos que se acerque a las oficinas de Secretaría Académica con los siguientes documentos:\n\n1. Copia de su documento de identidad\n2. Recibo de pago del certificado\n3. Formato de solicitud diligenciado\n\nEl horario de atención es de lunes a viernes de 8:00 AM a 12:00 PM y de 2:00 PM a 6:00 PM.\n\nCordialmente,\nSecretaría Académica\nFESC - Fundación de Estudios Superiores Comfanorte',
    date: '10:42',
    fullDate: '20 de enero de 2026, 10:42 AM',
    unread: true,
    starred: false,
  },
  {
    id: 2,
    sender: 'Bienestar Universitario',
    email: 'bienestar@fesc.edu.co',
    subject: 'Aprobación de solicitud de beca',
    preview: 'Nos complace informarle que su solicitud de beca ha sido aprobada. Por favor acérquese a nuestras oficinas...',
    body: 'Estimado(a) estudiante,\n\nNos complace informarle que su solicitud de beca ha sido APROBADA para el periodo académico 2026-1.\n\nEl beneficio consiste en:\n- Descuento del 50% en matrícula\n- Bono alimentario mensual\n- Acceso preferencial a servicios de bienestar\n\nPara hacer efectivo el beneficio, debe acercarse a las oficinas de Bienestar Universitario antes del 30 de enero con:\n- Documento de identidad original\n- Recibo de servicios públicos\n- Carta de compromiso firmada\n\n¡Felicitaciones por este logro!\n\nAtentamente,\nBienestar Universitario\nFESC',
    date: '9:15',
    fullDate: '20 de enero de 2026, 9:15 AM',
    unread: true,
    starred: true,
  },
  {
    id: 3,
    sender: 'Coordinación de Sistemas',
    email: 'sistemas@fesc.edu.co',
    subject: 'Actualización de credenciales',
    preview: 'Le informamos que sus credenciales de acceso al sistema han sido actualizadas correctamente...',
    body: 'Estimado usuario,\n\nLe informamos que sus credenciales de acceso al sistema académico han sido actualizadas correctamente.\n\nSus nuevos datos de acceso son:\n- Usuario: su correo institucional\n- Contraseña: la que usted definió en el proceso de recuperación\n\nRecuerde:\n- No comparta su contraseña con terceros\n- Cambie su contraseña cada 90 días\n- Use contraseñas seguras con mayúsculas, minúsculas, números y caracteres especiales\n\nSi tiene alguna dificultad, contáctenos.\n\nSoporte Técnico\nCoordinación de Sistemas',
    date: 'Ayer',
    fullDate: '19 de enero de 2026, 3:30 PM',
    unread: false,
    starred: false,
  },
  {
    id: 4,
    sender: 'Recursos Humanos',
    email: 'rrhh@fesc.edu.co',
    subject: 'Recordatorio de capacitación',
    preview: 'Este es un recordatorio de la capacitación programada para el próximo lunes a las 8:00 AM en el auditorio principal...',
    body: 'Estimado colaborador,\n\nLe recordamos que tiene programada una capacitación obligatoria:\n\nTema: Seguridad y Salud en el Trabajo\nFecha: Lunes 27 de enero de 2026\nHora: 8:00 AM - 12:00 PM\nLugar: Auditorio Principal, Edificio A\n\nPor favor confirme su asistencia respondiendo este correo.\n\nAtentamente,\nRecursos Humanos',
    date: 'Ene 18',
    fullDate: '18 de enero de 2026, 2:00 PM',
    unread: false,
    starred: false,
  },
  {
    id: 5,
    sender: 'Decanatura de Ingeniería',
    email: 'ingenieria@fesc.edu.co',
    subject: 'Invitación a evento académico',
    preview: 'Cordialmente lo invitamos al evento de innovación tecnológica que se llevará a cabo el próximo viernes...',
    body: 'Estimado estudiante,\n\nLa Decanatura de Ingeniería tiene el gusto de invitarlo al:\n\nEVENTO DE INNOVACIÓN TECNOLÓGICA 2026\n\nFecha: Viernes 31 de enero de 2026\nHora: 9:00 AM - 5:00 PM\nLugar: Centro de Convenciones FESC\n\nActividades:\n- Conferencias magistrales\n- Talleres prácticos\n- Feria de proyectos\n- Networking con empresas del sector\n\nLa entrada es libre previa inscripción.\n\n¡Los esperamos!\n\nDecanatura de Ingeniería',
    date: 'Ene 17',
    fullDate: '17 de enero de 2026, 10:00 AM',
    unread: false,
    starred: true,
  },
]

export default function Inbox() {
  const [requests, setRequests] = useState(mockInboxData)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleSelect = (id, selected) => {
    console.log('Selected:', id, selected)
  }

  const handleStar = (id, starred) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, starred } : r))
  }

  const handleClick = (id) => {
    // Mark as read when clicked
    setRequests(prev => prev.map(r => r.id === id ? { ...r, unread: false } : r))
    // Find and show the selected request
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
                  No hay peticiones recibidas
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--fesc-muted)' }}>
                  Las peticiones que reciba aparecerán aquí
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
