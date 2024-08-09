// /actions/signInAction.js
'use server'

export async function signInAction(formData: {
  email: string
  password: string
}) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log('Error response text:', errorText)
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log('Response from server:', data)
    return data
  } catch (error) {
    console.error('Error while submitting form:', error)
    throw error
  }
}
