// Icons
const BackIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
)

const ArchiveIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
    </svg>
)

const DeleteIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
)

const ReplyIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
    </svg>
)

const ForwardIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" />
    </svg>
)

const PrintIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
    </svg>
)

const StarIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

export default function RequestDetail({ request, onBack }) {
    if (!request) return null

    const initials = request.sender
        ? request.sender.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
        : 'U'

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div
                className="flex items-center gap-2 px-4 py-2 border-b"
                style={{ borderColor: 'var(--fesc-border)' }}
            >
                <button
                    onClick={onBack}
                    className="action-btn"
                    title="Volver"
                >
                    <BackIcon />
                </button>
                <button className="action-btn" title="Archivar">
                    <ArchiveIcon />
                </button>
                <button className="action-btn" title="Eliminar">
                    <DeleteIcon />
                </button>

                <div className="flex-1" />

                <button className="action-btn" title="Imprimir">
                    <PrintIcon />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* Subject */}
                <div className="flex items-start gap-4 mb-6">
                    <h1 className="text-xl font-normal flex-1" style={{ color: 'var(--fesc-text)' }}>
                        {request.subject}
                    </h1>
                    <button className="p-1" style={{ color: request.starred ? 'var(--fesc-accent)' : 'var(--fesc-muted)' }}>
                        <StarIcon filled={request.starred} />
                    </button>
                </div>

                {/* Sender Info */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--fesc-border-light)' }}>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
                        style={{ background: 'var(--fesc-primary)' }}
                    >
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium" style={{ color: 'var(--fesc-text)' }}>
                                {request.sender}
                            </span>
                            <span className="text-sm" style={{ color: 'var(--fesc-muted)' }}>
                                &lt;{request.email || 'usuario@fesc.edu.co'}&gt;
                            </span>
                        </div>
                        <div className="text-sm mt-1" style={{ color: 'var(--fesc-muted)' }}>
                            para mí
                        </div>
                    </div>
                    <div className="text-sm flex-shrink-0" style={{ color: 'var(--fesc-muted)' }}>
                        {request.fullDate || request.date}
                    </div>
                </div>

                {/* Body */}
                <div
                    className="prose max-w-none text-base leading-relaxed"
                    style={{ color: 'var(--fesc-text)' }}
                >
                    <p>{request.body || request.preview}</p>

                    {request.fullBody && (
                        <div className="mt-4 whitespace-pre-wrap">
                            {request.fullBody}
                        </div>
                    )}
                </div>
            </div>

            {/* Reply Actions */}
            <div
                className="flex items-center gap-3 px-6 py-4 border-t"
                style={{ borderColor: 'var(--fesc-border)' }}
            >
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:bg-[var(--fesc-hover)]"
                    style={{ borderColor: 'var(--fesc-border)' }}
                >
                    <ReplyIcon />
                    <span>Responder</span>
                </button>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:bg-[var(--fesc-hover)]"
                    style={{ borderColor: 'var(--fesc-border)' }}
                >
                    <ForwardIcon />
                    <span>Reenviar</span>
                </button>
            </div>
        </div>
    )
}
