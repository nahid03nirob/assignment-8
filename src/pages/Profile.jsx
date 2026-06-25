import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../lib/auth'

const Profile = () => {
  const navigate = useNavigate()
  const { user, loading, updateUser } = useAuth()
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      updateUser({ photo: preview })
      toast.success('Profile image updated')
    }
  }

  if (loading) return <LoadingSpinner />
  if (!user) return null

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div onDragOver={(event) => { event.preventDefault(); setDragActive(true) }} onDragLeave={() => setDragActive(false)} onDrop={handleDrop} className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 ${dragActive ? 'border-emerald-500' : 'border-emerald-200'} bg-emerald-50 text-center text-sm font-semibold text-emerald-700`}>
            {user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : 'Upload'}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">My Profile</p>
            <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
            <p className="mt-2 text-slate-600">{user.email}</p>
          </div>
        </div>
        <Link to="/update-profile" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Update Information</Link>
      </div>
      <div className="mt-8 rounded-3xl bg-emerald-50 p-6 text-sm text-slate-600">
        <p>Tip: Drag and drop a new profile image into the circle above to change it instantly.</p>
      </div>
    </div>
  )
}

export default Profile
