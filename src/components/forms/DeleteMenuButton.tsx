'use client'

import { useState } from 'react'
import { deleteMenuItemAction } from '@/actions/menu'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export function DeleteMenuButton({ id }: { id: string }) {
  const [isPending, setIsPending] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Точно удалить позицию?')) return
    setIsPending(true)
    const result = await deleteMenuItemAction(id)
    if (result.success) toast.success(result.message)
    else toast.error(result.message)
    setIsPending(false)
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
      <Trash2 className="w-5 h-5" />
    </button>
  )
}