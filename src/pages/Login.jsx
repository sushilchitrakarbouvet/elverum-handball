import { useState } from 'react'
import { supabase } from '../components/supabase'

const Login = () => {

    
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMagicLink, setEmailMagicLink] = useState('')


    const sendMagicLink = async (event) => {

        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email: emailMagicLink })
        if (error) {
            console.log(error.error_description || error.message)
        } else {
            console.log('Check your email for the login link!')
        }
        setLoading(false)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(data){
            console.log('data', data);
        }

        if (error) {
            console.log(error.error_description || error.message)
        } else {
            console.log('Check your email for the login link!')
        }
        setLoading(false)
    }

  return (
    <>  
        <section className='bg-indigo-50' >
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <form className="form-widget" onSubmit={sendMagicLink}>
                        <h2 className='text-3xl text-center font-semibold mb-6'>Sign in via magic link with your email below</h2>
                        <div className='mb-4'>
                            <label
                                htmlFor='name'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Email'
                                required
                                value={emailMagicLink}
                                onChange={(e) => setEmailMagicLink(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white
                                font-bold py-2 px-6 rounded-full focus:outline-none 
                                focus:shadow-outline" disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
      
        <section className='bg-indigo-50' >
            <div className='container m-auto max-w-2xl py-1'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                <form className="form-widget" onSubmit={handleLogin}>
                    <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>
                    <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
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
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div>
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white
                            font-bold py-2 px-6 rounded-full focus:outline-none 
                            focus:shadow-outline" disabled={loading}>
                        {loading ? <span>Loading</span> : <span>Login</span>}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </section>
        
    </>
  )
}

export default Login