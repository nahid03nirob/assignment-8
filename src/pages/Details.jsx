import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import animals from '../data/animals'

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

  const animal = useMemo(() => animals.find((entry) => entry.id === Number(id)), [id])

  if (!animal) {
    return <div className="rounded-3xl border border-amber-200 bg-white p-10 text-center text-slate-700">Animal not found.</div>
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem('qurbani-user') || 'null')
    if (!user) {
      toast.error('Please login before booking this animal')
      navigate('/login')
      return
    }
    toast.success(`Booking request sent for ${animal.name}`)
    setForm({ name: '', email: '', phone: '', address: '' })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
        <img src={animal.image} alt={animal.name} className="h-80 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-3xl font-bold text-slate-800">{animal.name}</h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{animal.type}</span>
          </div>
          <p className="mt-2 text-slate-600">{animal.breed} • {animal.location}</p>
          <p className="mt-4 text-slate-700">{animal.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-amber-50 p-3"><p className="text-sm text-slate-500">Price</p><p className="text-lg font-semibold text-amber-700">৳{animal.price.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-amber-50 p-3"><p className="text-sm text-slate-500">Weight</p><p className="text-lg font-semibold text-slate-800">{animal.weight} kg</p></div>
            <div className="rounded-2xl bg-amber-50 p-3"><p className="text-sm text-slate-500">Age</p><p className="text-lg font-semibold text-slate-800">{animal.age} years</p></div>
            <div className="rounded-2xl bg-amber-50 p-3"><p className="text-sm text-slate-500">Category</p><p className="text-lg font-semibold text-slate-800">{animal.category}</p></div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Booking Form</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-800">Reserve this animal</h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none" placeholder="Your Name" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none" placeholder="Email" />
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none" placeholder="Phone Number" />
          <textarea required rows="4" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none" placeholder="Delivery Address" />
          <button className="w-full rounded-full bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700">Book Now</button>
        </form>
      </div>
    </div>
  )
}

export default Details
