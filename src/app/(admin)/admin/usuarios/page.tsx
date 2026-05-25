'use client'

import { useEffect, useState } from 'react'
import styles from './usuarios.module.css'

type Role = 'user' | 'seller' | 'admin'

interface User {
  id: string
  clerkId: string
  email: string
  name: string | null
  imageUrl: string | null
  role: Role
  createdAt: string
}

const ROLE_LABELS: Record<Role, string> = {
  user: 'Usuario',
  seller: 'Vendedor',
  admin: 'Admin',
}

const ROLE_COLORS: Record<Role, string> = {
  user: 'rgba(42,31,24,0.12)',
  seller: 'rgba(235,198,131,0.3)',
  admin: 'rgba(200,85,61,0.15)',
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((j) => setUsers(j.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  async function handleRoleChange(clerkId: string, role: Role) {
    setUpdating(clerkId)
    const res = await fetch(`/api/users/${clerkId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.clerkId === clerkId ? { ...u, role } : u)))
    }
    setUpdating(null)
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Usuarios</h1>

      {loading ? (
        <div className={styles.skeleton} />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Miembro desde</th>
                <th>Cambiar rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className={styles.userCell}>
                      {u.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={u.imageUrl} alt="" className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarFallback}>{(u.name ?? u.email)[0].toUpperCase()}</div>
                      )}
                      <span>{u.name ?? '—'}</span>
                    </div>
                  </td>
                  <td className={styles.muted}>{u.email}</td>
                  <td>
                    <span
                      className={styles.roleBadge}
                      style={{ background: ROLE_COLORS[u.role] }}
                    >
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className={styles.muted}>
                    {new Date(u.createdAt).toLocaleDateString('es-CU', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td>
                    <select
                      className={styles.roleSelect}
                      value={u.role}
                      disabled={updating === u.clerkId}
                      onChange={(e) => handleRoleChange(u.clerkId, e.target.value as Role)}
                    >
                      <option value="user">Usuario</option>
                      <option value="seller">Vendedor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyRow}>No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
