import { useState } from 'react'
import { supabase } from '../components/supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    
    const { error } = await supabase.auth.signInWithOtp({ email })
    
    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField border rounded w-full py-2 px-3 mb-2"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white
                  font-bold py-2 px-6 rounded-full focus:outline-none 
                  focus:shadow-outline float-left" disabled={loading}>
              {loading ? <span>Loading</span> : <span>Setup Password</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}