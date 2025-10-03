import React, { useState } from 'react'

import { supabase } from '../components/supabase';

const SendInvite = () => {

    const[emailInvite, setEmailInvite] = useState('');

    const sentInvite = async() =>{
        const { data, error } = await supabase.auth.admin.inviteUserByEmail(emailInvite);
        if(data){
            console.log('data',data);       
            console.log('error',error);            
        }
        else if(error){
            console.log('error', error);
        }
    }

    // const submitForm = async(e) => {
    //     e.preventDefault();
    // }
    return (
    <>
        <section className='bg-indigo-50' >
        <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            {/* <form onSubmit={submitForm}> */}
            <h2 className='text-3xl text-center font-semibold mb-6'>Email Invite</h2>
            <div className='mb-4'>
                <label
                htmlFor='namemailInvite'
                className='block text-gray-700 font-bold mb-2'
                >
                Email
                </label>
                <input
                type='text'
                id='emailInvite'
                name='emailInvite'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Jpt jpt'
                required
                value={emailInvite}
                onChange={(e) => setEmailInvite(e.target.value)}
                />
            </div>
            <div>
                <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white
                            font-bold py-2 px-4 rounded-full w-full focus:outline-none 
                            focus:shadow-outline'
                type='submit'
                name= 'register'
                onClick={sentInvite}
                >
                Send Invite
                </button>
            </div>
            {/* </form> */}
        </div>
        </div>
        </section>
    </>
  )
}

export default SendInvite