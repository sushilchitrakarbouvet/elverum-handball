import { useState } from "react";
import { supabase } from "../components/supabase";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MeetingGroupDetails = ({group, isEdit = true}) => {
    
  const {group_id} = useParams();

  const{meeting_id} = useParams();

  const [name, setName] = useState(isEdit ? group.group_name : '');
  const [details, setDetails] = useState(isEdit ? group.group_details : '');

  const navigate = useNavigate();

  const submitForm = async(e) => {
      e.preventDefault();
      
    const updatedGroup = {
        meeting_id: meeting_id,
        group_name: name,
        group_details: details
    };

    try {

        let data , error;

        console.log('update', e.nativeEvent.submitter.name, isEdit)
      
        if(e.nativeEvent.submitter.name !== 'update' && !isEdit){
            ({ data, error } = await supabase
                                    .from('meeting_groups')
                                    .insert([updatedGroup])
                                    .single());
        }else{          
            ({ data, error } = await supabase
                                    .from('meeting_groups')
                                    .update([updatedGroup])
                                    .eq('id', group_id));
        }

       
        if (data) {
          console.log("Success")
        }
        else if(error){
          console.log('Error', error);
        }
    } catch (error) {
      console.log("Error coming from Supabase.", error);
    } finally {
      console.log('finally');    
    }
      return navigate(`/meetings/${meeting_id}/groups`);
  };

  return (
    <div>
        <section className='bg-indigo-50' >
        <div className='container m-auto max-w-2xl py-24'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitForm}>
                <h2 className='text-3xl text-center font-semibold mb-6'>{isEdit ? 'Update': 'Create'} group</h2>
                <div className='mb-4'>
                <label
                    htmlFor='name'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Group Name
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Group Details
                </label>
                <input
                    type='text'
                    id='details'
                    name='details'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Details'
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
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
                        to={`/meetings/${meeting_id}/groups`}
                    >
                        Cancel
                    </Link>
                </div>
            </form>
            </div>
        </div>
        </section>

    </div>
  )
}


export default MeetingGroupDetails;