import { useState, useEffect } from 'react'
import { supabase } from '../components/supabase'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('client_profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username
    }

    const { error } = await supabase.from('client_profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      //setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className="inputField border rounded w-full py-2 px-3 mb-2"
        />
      </div>
      <div>
         <button
        
         className="bg-indigo-500 hover:bg-indigo-600 text-white
                  font-bold py-2 px-6 rounded-full focus:outline-none 
                  focus:shadow-outline float-left"
        type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white
                  font-bold py-2 px-6 rounded-full focus:outline-none 
                  focus:shadow-outline float-left"
        type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}