import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import animals from '../data/animals'
import bgImage from '../assets/images/bg.jpg'
import 'animate.css'

const featured = animals.slice(0, 4)

const Home = () => {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-600 via-orange-500 to-amber-800 p-8 text-white shadow-2xl sm:p-10 lg:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate__animated animate__fadeInLeft">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              <Sparkles size={16} /> Modern livestock marketplace
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Book premium animals for your Qurbani with confidence.</h1>
            <p className="mt-4 max-w-xl text-lg text-amber-50/90">Explore healthy cows and goats, compare quality and price, and reserve your preferred animal in minutes.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/animals" className="rounded-full bg-white px-5 py-3 font-semibold text-amber-700 transition hover:scale-105">Browse Animals <ArrowRight className="ml-2 inline" size={16} /></Link>
              <Link to="/register" className="rounded-full border border-white/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Create Account</Link>
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight rounded-[1.5rem] bg-white/10 p-5 backdrop-blur">
            <img src={bgImage} alt="Livestock" className="h-[320px] w-full rounded-[1.2rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{title:'Verified Listings',text:'Each animal is reviewed for health and quality.',icon:ShieldCheck},{title:'Best Prices',text:'Competitive rates across local breeders.',icon:TrendingUp},{title:'Easy Booking',text:'Reserve your selection with a simple form.',icon:BadgeCheck}].map((item)=> (
          <div key={item.title} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <item.icon className="mb-3 text-amber-600" size={24} />
            <h3 className="font-semibold text-slate-800">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Featured Animals</p>
            <h2 className="text-2xl font-bold text-slate-800">Popular choices this week</h2>
          </div>
          <Link to="/animals" className="text-sm font-semibold text-amber-700">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((animal) => (
            <div key={animal.id} className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
              <img src={animal.image} alt={animal.name} className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-800">{animal.name}</h3>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{animal.type}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{animal.breed}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-700">৳{animal.price.toLocaleString()}</span>
                  <Link to={`/details/${animal.id}`} className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Qurbani Tips</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">What makes a good sacrificial animal?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Choose a healthy animal with a calm temperament and clear eyes.</li>
            <li>• Check weight, age, and body condition before booking.</li>
            <li>• Confirm the animal’s origin and vaccination history.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-[#fff5e5] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Top Breeds</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Most requested picks</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {['Deshi Shahi Cow','Sahiwal','Black Bengal Goat','Jamnapari'].map((breed)=>(<span key={breed} className="rounded-full border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">{breed}</span>))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
