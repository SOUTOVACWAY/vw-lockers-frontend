import React from 'react'

export function renderInputField(props) {
  const {input, name, label, type, meta: { touched, error }} = props

  return (
    <div className="form-group">
      { label && <label htmlFor={name}>{label}</label> }
      <input className={`form-control ${touched && error && 'is-invalid'}`}
             {...input}
             type={type}/>
      { touched && error && <div className="invalid-feedback">{error}</div> }
    </div>
  )
}

export function renderTextAreaField(props) {
  const {input, name, label, meta: { touched, error }} = props

  return (
    <div className="form-group">
      { label && <label htmlFor={name}>{label}</label> }
      <textarea className={`form-control ${touched && error && 'is-invalid'}`}
             {...input} />
      { touched && error && <div className="invalid-feedback">{error}</div> }
    </div>
  )
}

export function renderSelectField(props) {
  const {input, name, label, meta: { touched, error }, children} = props

  return (
    <div className="form-group">
      { label && <label htmlFor={name}>{label}</label> }
      <select className={`form-control ${touched && error && 'is-invalid'}`}
             {...input}>
        {children}
      </select>
      { touched && error && <div className="invalid-feedback">{error}</div> }
    </div>
  )
}
