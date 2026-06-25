import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import animals from '../data/animals'

const Animals = () => {
  const [sortBy, setSortBy] = useState('default')

  const visibleAnimals = useMemo(() => {
    const list = [...animals]
    if (sortBy === 'low') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'high') list.sort((a, b) => b.price - a.price)
    return list
  }, [sortBy])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-amber-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">All Animals</p>
          <h2 className="text-2xl font-bold text-slate-800">Find the right livestock for your booking</h2>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-slate-700">
          <option value="default">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleAnimals.map((animal) => (
          <div key={animal.id} className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
            <img src={animal.image} alt={animal.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-800">{animal.name}</h3>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{animal.type}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{animal.breed} • {animal.location}</p>
              <p className="mt-3 text-sm text-slate-600">{animal.description.slice(0, 90)}...</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-amber-700">৳{animal.price.toLocaleString()}</span>
                <Link to={`/details/${animal.id}`} className="rounded-full bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Animals
