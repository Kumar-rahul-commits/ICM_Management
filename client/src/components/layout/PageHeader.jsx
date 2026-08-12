
function PageHeader({title,subtitle}) {
  return (
    <header className="mb-5">
        <h1 className="text-xl font-medium text-text-primary">{title}</h1>
        <p className="text-sm text-text-secondary">{subtitle}</p>
    </header>
  )
}

export default PageHeader
