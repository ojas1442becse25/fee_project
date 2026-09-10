function Placeholder({ title, description }) {
  return (
    <div className="placeholder-container">
      <div className="placeholder-card">
        <h1>{title}</h1>
        <p>{description || 'This page is under construction.'}</p>
      </div>
    </div>
  )
}

export default Placeholder
