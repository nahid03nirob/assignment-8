import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../lib/auth'

const UpdateProfile = () => {
  const navigate = useNavigate()
  const { user, loading, updateUser } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', photo: '', password: '' })

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
      return
    }
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        photo: user.photo || '',
        password: user.password || '',
      })
    }
  }, [loading, user, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser(form)
    toast.success('Profile updated successfully')
    navigate('/my-profile')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="mx-auto max-w-2xl rounded-4xl border border-emerald-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-800">Update Information</h2>
      <p className="mt-2 text-slate-600">Refresh your profile details and photo link.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Name" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Email" />
        <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Photo URL" />
        <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Password" />
        <button className="w-full rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">Save Changes</button>
      </form>
    </div>
  )
}

export default UpdateProfile
