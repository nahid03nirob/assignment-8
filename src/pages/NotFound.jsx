import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-4xl border border-amber-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">404</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-800">Page not found</h2>
      <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 rounded-full bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">Return Home</Link>
    </div>
  )
}

export default NotFound
