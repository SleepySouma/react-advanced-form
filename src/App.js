import { useState } from 'react'
import { AdvancedForm } from './components/forms/AdvancedForm'

export default function App() {
  const [formValues, setFormValues] = useState([])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
  }

  const formSchema = [
    { name: 'name', label: 'Name', componentType: 'text', required: true },
    {
      name: 'category',
      label: 'Category',
      componentType: 'select',
      options: [
        { label: 'Abonnement et facture', value: 'Abonnement et facture'},
        { label: 'API de paiement', value: 'API de paiement' },
        { label: 'Litiges', value: 'Litiges' },
        { label: 'Problème technique', value: 'Problème technique' },
        { label: 'Rapports financiers', value: 'Rapports financiers' },
        { label: 'Refus de paiement', value: 'Refus de paiement' },
        { label: 'Fraude', value: 'Fraude' },
        { label: 'Vérification', value: 'Vérification' },
        { label: 'Souscription', value: 'Souscription' },
      ],
    },
    { name: 'summary', label: 'Summary', componentType: 'text', required: true},
    { name: 'description', label: 'Description', componentType: 'textarea', required: true},
  ]

  return (
    <>
      <h1>Advanced Form</h1>

      <div className="flex">
        <div className="form section">
          <AdvancedForm schema={formSchema} onSubmit={handleSubmit} />
        </div>
        <div className="results section">
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      </div>
    </>
  )
}
