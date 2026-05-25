'use client'

import { useRef, useState } from 'react'
import styles from './image-uploader.module.css'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  disabled?: boolean
}

export default function ImageUploader({ onUpload, disabled = false }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Error al subir imagen')
      }
      const json = await res.json()
      onUpload(json.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className={styles.wrap}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className={styles.fileInput}
        onChange={handleChange}
        disabled={disabled || uploading}
      />
      <button
        type="button"
        className={styles.btn}
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'Subiendo…' : '↑ Subir imagen'}
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
