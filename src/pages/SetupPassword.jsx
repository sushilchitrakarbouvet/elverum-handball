import { useState } from 'react'
import { supabase } from '../components/supabase'

export default function SetupPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')


  const handleSetupPassword = async (event) => {
    event.preventDefault()

    setLoading(true)
   const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      console.log(error.error_description || error.message)
    } else {
      console.log('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <section className='bg-indigo-50' >
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSetupPassword}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Setup password or change password</h2>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 font-bold mb-2'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='new password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white
                            font-bold py-2 px-4 rounded-full w-full focus:outline-none 
                            focus:shadow-outline'
                  type='submit'
                  disabled={loading}
                >
                  {loading ? <span>Loading</span> : <span>Change Password</span>}
                </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}