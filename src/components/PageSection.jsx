const PageSection = ({ title, subtitle, children, className = '' }) => (
  <section className={`rounded-[28px] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(1,40,30,0.08)] backdrop-blur-xl ${className}`}>
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">{title}</p>
      {subtitle ? <h3 className="mt-2 text-2xl font-bold text-slate-800">{subtitle}</h3> : null}
    </div>
    {children}
  </section>
)

export default PageSection
