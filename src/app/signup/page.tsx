import SignUp from '@components/SignUp/SignUp'

// export default async function SignUpPage() {
const SignUpPage = () => {
  //   const handleSubmit = async (formData: {
  //     username: string
  //     email: string
  //     password: string
  //   }) => {
  //     'use server'

  //     try {
  //       const response = await fetch('http://localhost:3000/auth/signup', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formData)
  //       })

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok')
  //       }

  //       const data = await response.json()
  //       console.log('Response from server:', data)
  //     } catch (error) {
  //       console.error('Error while submitting form:', error)
  //     }
  //   }

  return (
    // <SignUp onSubmit={handleSubmit} />
    <SignUp />
  )
}

export default SignUpPage
