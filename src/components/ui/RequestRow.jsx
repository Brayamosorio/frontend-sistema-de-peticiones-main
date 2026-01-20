import { useState } from 'react'

// Icons
const StarIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

const MarkReadIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
)

export default function RequestRow({
    id,
    sender,
    subject,
    preview,
    date,
    unread = false,
    starred = false,
    selected = false,
    onSelect,
    onStar,
    onClick
}) {
    const [isStarred, setIsStarred] = useState(starred)
    const [isSelected, setIsSelected] = useState(selected)

    const handleStar = (e) => {
        e.stopPropagation()
        setIsStarred(!isStarred)
        onStar?.(id, !isStarred)
    }

    const handleSelect = (e) => {
        e.stopPropagation()
        setIsSelected(!isSelected)
        onSelect?.(id, !isSelected)
    }

    return (
        <div
            className={`request-row ${unread ? 'unread' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick?.(id)}
        >
            {/* Checkbox */}
            <div className="px-2">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelect}
                    className="checkbox w-[18px] h-[18px] cursor-pointer accent-[var(--fesc-primary)]"
                />
            </div>

            {/* Star */}
            <button
                onClick={handleStar}
                className={`star p-1 ${isStarred ? 'active' : ''}`}
                style={{ color: isStarred ? 'var(--fesc-accent)' : 'var(--fesc-muted)' }}
            >
                <StarIcon filled={isStarred} />
            </button>

            {/* Sender */}
            <div className="sender px-2" style={{ fontWeight: unread ? 600 : 400 }}>
                {sender}
            </div>

            {/* Content */}
            <div className="content">
                <span className="subject" style={{ fontWeight: unread ? 600 : 400 }}>
                    {subject}
                </span>
                <span className="mx-1">-</span>
                <span className="preview">{preview}</span>
            </div>

            {/* Date */}
            <span className="date px-4" style={{ fontWeight: unread ? 600 : 400 }}>
                {date}
            </span>

            {/* Hover Actions */}
            <div className="actions">
                <button className="action-btn" title="Archivar">
                    <ArchiveIcon />
                </button>
                <button className="action-btn" title="Eliminar">
                    <DeleteIcon />
                </button>
                <button className="action-btn" title="Marcar como leído">
                    <MarkReadIcon />
                </button>
            </div>
        </div>
    )
}
