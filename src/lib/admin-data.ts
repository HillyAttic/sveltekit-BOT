import { auth } from './auth.svelte'

function headers() {
  return { Authorization: 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json' }
}

export async function listData<T = any>(collection: string): Promise<T[]> {
  const res = await fetch('/api/admin/data/' + collection, { headers: headers() })
  if (!res.ok) throw new Error('Failed to load ' + collection)
  return res.json()
}

export async function createData(collection: string, data: Record<string, any>): Promise<any> {
  const res = await fetch('/api/admin/data/' + collection, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to save')
  return res.json()
}

export async function updateData(collection: string, id: string, data: object): Promise<any> {
  const res = await fetch('/api/admin/data/' + collection + '/' + id, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

export async function deleteData(collection: string, id: string): Promise<void> {
  const res = await fetch('/api/admin/data/' + collection + '/' + id, {
    method: 'DELETE',
    headers: headers(),
  })
  if (!res.ok) throw new Error('Failed to delete')
}
