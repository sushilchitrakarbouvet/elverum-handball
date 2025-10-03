import { useState } from "react";
import { supabase } from "../components/supabase";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MeetingDetails = ({meeting, isEdit = true}) => {
    
  const {id} = useParams();

  const [agenda, setAgenda] = useState(isEdit ? meeting.agenda : '');
  const [description, setDescription] = useState(isEdit ? meeting.description : '');
  const [meetingLocation, setMeetingLocation] = useState(isEdit ? meeting.meeting_location : '');
  const [meetingDate, setMeetingDate] = useState(isEdit ? meeting.meeting_date : '');


  const navigate = useNavigate();


  const submitForm = async(e) => {
      e.preventDefault();
      
    const updatedMeeting = {
      agenda: agenda,
      description: description,
      meeting_location: meetingLocation,
      meeting_date : meetingDate
    };

    try {

        let data , error;
      
        if(e.nativeEvent.submitter.name !== 'update' && isEdit){
            ({ data, error } = await supabase
                                    .from('meetings')
                                    .insert([updatedMeeting])
                                    .single());
        }else{          
            ({ data, error } = await supabase
                                    .from('meetings')
                                    .update([updatedMeeting])
                                    .eq('id', id));
        }

       
        if (data) {
          console.log("Success")
        }
        else if(error){
          console.log('Here is here', error);
        }
    } catch (error) {
      console.log("Error.", error);
    } finally {
      console.log('finally');    
    }
      return navigate('/meetings');
  };

  return (
    <div>
        <section className='bg-indigo-50' >
        <div className='container m-auto max-w-2xl py-24'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitForm}>
                <h2 className='text-3xl text-center font-semibold mb-6'>{isEdit ? 'Update': 'Create'} Meeting</h2>
                <div className='mb-4'>
                <label
                    htmlFor='name'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Meeting Agenda
                </label>
                <input
                    type='text'
                    id='agenda'
                    name='agenda'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Agenda'
                    required
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                />
                </div>
                <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Description
                </label>
                <input
                    type='text'
                    id='description'
                    name='description'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Meeting location
                </label>
                <input
                    type='text'
                    id='meetingLocation'
                    name='meetingLocation'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Meeting location'
                    required
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                />
                </div>
                <div className='mb-4'>
                <label
                    htmlFor='zipCode'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Meeting Date
                </label>
                <input
                    type="datetime-local"
                    id='meetingDate'
                    name='meetingDate'
                    className='border rounded w-full py-2 px-3'
                    rows='4'
                    placeholder='Meeting Date'
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
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
                        to={'/meetings'}
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


export default MeetingDetails;