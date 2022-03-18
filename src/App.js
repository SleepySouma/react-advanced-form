import { useState } from 'react'
import { AdvancedForm } from './components/forms/AdvancedForm'

export default function App() {
  const [formValues, setFormValues] = useState([])
  const agentName = "Agent";

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
  }

  const formSchema = [
    { name: 'name', label: 'Nom', componentType: 'text', required: true },
    {
      name: 'category',
      label: 'Catégorie',
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
    { name: 'summary', label: 'Résumé', componentType: 'text', required: true},
    { name: 'description', label: 'Description', componentType: 'textarea', required: true},
  ]

  const formIssue = {
      summary : formValues.summary,
      description : formValues.description,
      project : {
          id : 2
      },
      category: {
          name: formValues.category
      }
  }

  const formMonitoring = {
      users: [
        {
          name: formValues.name
        },
        {
          name: agentName
        }
      ]
  }

  return ( //comment outside jsx elmt
    <>
      <h1>Formulaire de Réclamation</h1>

      <div className="flex">  {/* comment inside a jsx elmt */}
        <div className="form section">
          <AdvancedForm schema={formSchema} onSubmit={handleSubmit} />
        </div> 
        {/* comment inside a jsx elmt */}
        <div className="results section">
          <h2>JSON result</h2>
          <h4>Sent to create an issue:</h4>
          <pre>{JSON.stringify(formIssue, null, 2)}</pre>
          <h4>Sent to monitor an issue:</h4>
          <pre>{JSON.stringify(formMonitoring, null, 2)}</pre>
        </div>
      </div>
    </>
  )
}