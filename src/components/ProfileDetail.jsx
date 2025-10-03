import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "./supabase";

const ProfileDetail = ({profile, isEdit = true}) => {

  const {id} = useParams();
  const {emailInvite} = useParams();

  const [name, setName] = useState(isEdit ? profile.name : '');
  const [email, setEmail] = useState(isEdit ? profile.email : emailInvite);
  const [address, setAddress] = useState(isEdit ? profile.address : '');
  const [zipCode, setZipCode] = useState(isEdit ? profile.zip_code : '');
  const [company, setCompany] = useState(isEdit ? profile.company : '');

  const navigate = useNavigate();

  const submitForm = async(e) => {
      e.preventDefault();
      
    const updatedProfile = {
      name: name,
      zip_code: zipCode,
      email: email,
      company : company,
      address: address
    };

    try {

        let data , error;
      
        if(e.nativeEvent.submitter.name !== 'update' && isEdit){
            ({ data, error } = await supabase
                                    .from('client_profiles')
                                    .insert([updatedProfile])
                                    .single());
        }else{          
            ({ data, error } = await supabase
                                    .from('client_profiles')
                                    .update([updatedProfile])
                                    .eq('id', id));
        }
       
        if (data) {
          console.log("Success")
        }
        else if(error){
          console.log('Here is here', error);
        }
    } catch (error) {
      console.log("Error coming from Supabase.", error);
    } finally {
      console.log('finally');    
    }
      return navigate('/profiles');
  };


  return (
     <section className='bg-indigo-50' >
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>{isEdit ? 'Update': 'Add'} Profile</h2>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 font-bold mb-2'
              >
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Jpt jpt'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. sushil.chitrakar@jpt.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder=''
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='zipCode'
                className='block text-gray-700 font-bold mb-2'
              >
                Postal code
              </label>
              <input
                type="text"
                id='zipCode'
                name='zipCode'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Postal code'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              ></input>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='zipCode'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Name
              </label>
              <input
                type="text"
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Company name'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              ></input>
            </div>
            <div>
              {
                  isEdit ? 
                  
                  <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white
                              font-bold py-2 px-4 rounded-full focus:outline-none 
                              focus:shadow-outline'
                    type='submit'
                    name= 'update'
                  >
                    Update
                  </button>
                  :
                  <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white
                              font-bold py-2 px-4 rounded-full focus:outline-none 
                              focus:shadow-outline'
                    type='submit'
                    name= 'register'
                  >
                    Register
                  </button>
              }                 
              <Link
                className='bg-indigo-500 hover:bg-indigo-600 text-white
                          font-bold py-2 px-4 rounded-full focus:outline-none 
                          focus:shadow-outline float-right'
                to={'/profiles'}
              >Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default ProfileDetail;