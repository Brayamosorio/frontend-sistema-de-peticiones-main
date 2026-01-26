const shortDateFormatter = new Intl.DateTimeFormat('es-CO', {
  month: 'short',
  day: '2-digit',
})

const timeFormatter = new Intl.DateTimeFormat('es-CO', {
  hour: '2-digit',
  minute: '2-digit',
})

const longDateFormatter = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'long',
  timeStyle: 'short',
})

function toDate(value) {
  if (!value) return null
  if (value instanceof Date) return value
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function pickFirst(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key]
    if (value !== undefined && value !== null && value !== '') return value
  }
  return undefined
}

function resolveSender(raw) {
  if (raw?.userEmisor) {
    const name = [raw.userEmisor.firstName, raw.userEmisor.lastName]
      .filter(Boolean)
      .join(' ')
      .trim()
    return name || raw.userEmisor.username || 'Usuario'
  }
  if (raw?.areaEmisor?.name) return raw.areaEmisor.name
  return pickFirst(raw, ['sender', 'remitente', 'fromName', 'usuario', 'area', 'dependencia']) || 'Usuario'
}

function resolveEmail(raw) {
  if (raw?.userEmisor?.institutionalEmail) return raw.userEmisor.institutionalEmail
  return pickFirst(raw, ['email', 'correo', 'fromEmail', 'remitenteEmail'])
}

export function normalizeRequest(raw, index = 0) {
  const subject = pickFirst(raw, ['subject', 'asunto', 'title', 'titulo']) || '(Sin asunto)'
  const body = pickFirst(raw, ['body', 'mensaje', 'content', 'descripcion', 'description']) || ''
  const sender = resolveSender(raw)
  const email = resolveEmail(raw)
  const createdAt = pickFirst(raw, ['date', 'fecha', 'createdAt', 'fechaCreacion', 'created_on', 'creationDate'])
  const starred = pickFirst(raw, ['starred', 'favorito']) ?? false
  const unread = pickFirst(raw, ['unread', 'noLeido']) ?? raw?.leido === false ?? false
  const state = pickFirst(raw, ['state', 'estado'])
  const id = pickFirst(raw, ['id', 'requestId', 'idSolicitud', 'codigo', 'informId']) ?? index + 1
  const dateObj = toDate(createdAt)
  const now = new Date()
  const isToday = dateObj
    ? dateObj.getDate() === now.getDate()
      && dateObj.getMonth() === now.getMonth()
      && dateObj.getFullYear() === now.getFullYear()
    : false

  return {
    id,
    sender,
    email,
    subject,
    body,
    preview: pickFirst(raw, ['preview', 'resumen']) || body.slice(0, 120),
    date: dateObj ? (isToday ? timeFormatter.format(dateObj) : shortDateFormatter.format(dateObj)) : '',
    fullDate: dateObj ? longDateFormatter.format(dateObj) : '',
    starred: Boolean(starred),
    unread: Boolean(unread),
    state,
  }
}

export function normalizeRequestList(data) {
  if (!data) return []
  const list = Array.isArray(data)
    ? data
    : data.content || data.results || data.items || data.data || data.requests || []
  return Array.isArray(list) ? list.map(normalizeRequest) : []
}
