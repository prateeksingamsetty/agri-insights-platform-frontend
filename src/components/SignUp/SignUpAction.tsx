// /actions/signInAction.js
'use server'

export async function signUpAction(formData: {
  username: string
  email: string
  password: string
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )

    if (!response.ok) {
      const errorResponse = await response.json()
      const errorMessage =
        errorResponse.message || 'Signup failed with an error.'
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    throw error // Rethrow any caught errors for consistent handling
  }
}
