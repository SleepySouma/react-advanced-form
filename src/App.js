import { useState } from 'react'
import { AdvancedForm } from './components/forms/AdvancedForm'
import axios from 'axios';

export default function App() {

  //@mantis
  const mantisApiURL = 'http://localhost:8069/mantisbt/api/rest/issues/';
  const apiKey = 'Aqn6CisQ5YwLRuX2lTH8zLQOEYz-LeAj';
  const agentName = "Agent";


  //States
  const [formValues, setFormValues] = useState([])


  const formSchema = [
    { name: 'name', label: 'Nom - Provisoire', componentType: 'text', required: true },
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
      },
      files: [
        {
            name: "test.txt",
            content: "VGhpcyBpcyBhIFRFU1QuDQpUaGlzIGlzIGEgVEVTVC4NClRoaXMgaXMgYSBURVNULg0KVGhpcyBpcyBhIFRFU1QuDQpUaGlzIGlzIGEgVEVTVC4="
        },
        {
            name: "test2.txt",
            content: "VGhpcyBpcyBhIFRFU1QuDQpUaGlzIGlzIGEgVEVTVC4NClRoaXMgaXMgYSBURVNULg0KVGhpcyBpcyBhIFRFU1QuDQpUaGlzIGlzIGEgVEVTVC4="
        }
      ]

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await postSubmission()
    setSubmitting(false)
  }


  //------------AXIOS PART------------//
  
  const postSubmission = async () => {

    //@Issue Creation payload
    const payloadMantis = {
      ...formIssue,
    }
    //@Adding monitor payload
    const payloadMonitor = {
      ...formMonitoring
    }

    //@Issue Creation
    const resultMantis = await axios.post(mantisApiURL, 
      payloadMantis,
      {
        headers: {
          'Authorization': `${apiKey}`,
          'content-type': 'application/json',
        }
      });
      console.log(resultMantis);


    //@Adding monitor

    //how to get resulted issue's id
    const resultRawData = resultMantis.data;
    console.log(resultRawData.issue.id); //for when the .data is returned as JSON type
    //const resultCropped = resultRawData.split(","); //for when the .data is returned as a string
    //const resultID = resultCropped[0].substring(15);
    const resultID = resultRawData.issue.id;
      
    //@mantisMonitoring URL
    const monitorApiURL = 'http://localhost:8069/mantisbt/api/rest/issues/' + resultID + '/monitors';

    const resultMonitor = await axios.post(monitorApiURL, 
      payloadMonitor,
      {
        headers: {
          'Authorization': `${apiKey}`,
          'content-type': 'application/json',
        }
      });//.catch

      console.log(resultMonitor);
      
  };



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