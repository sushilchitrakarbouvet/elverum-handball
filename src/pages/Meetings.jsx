import { supabase } from '../components/supabase'
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";

const Meetings = () => {    
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getMeetings();
  }, []);

  
  async function getMeetings() {
    const { data } = await supabase.from("meetings").select();
    setMeetings(data);
  }

  const deleteMeeting = async(meetingId) => {    
    const { data, error } = await supabase.from("meetings").delete().eq('id', meetingId);

    if(error){
      console.log("Error:", error);      
    }
    else{
      console.log('Data', data);
    }
  }

  return (
    <>
    <Link 
        className='bg-indigo-500 hover:bg-indigo-600 text-white
                  font-bold py-2 px-4 rounded-full focus:outline-none 
                  focus:shadow-outline float-right m-3'
        to={'/meetings/create-meeting'} title='Create meeting'>Create meeting</Link>
    <div id="detailed-pricing" className="w-full overflow-x-auto">
        <div className="overflow-hidden min-w-max">
            <div className="grid grid-cols-11 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">                
                <div className='col-span-1'></div>       
                <div className='col-span-1'></div>
                <div className="flex items-center col-span-1">Date</div>
                <div className='col-span-2'>Agenda</div>
                <div className='col-span-2'>Description</div>
                <div className='col-span-2'>Meeting location</div>
                <div className='col-span-1'>Edit</div>
                <div className='col-span-1'>Delete</div>
            </div>
            {meetings.map((meeting) => (      
            <div key={meeting.id} className="grid grid-cols-11 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <Link
                      to={`/meetings/${meeting.id}/participants`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Participants</Link>
                </div>
                <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <Link
                      to={`/meetings/${meeting.id}/groups`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Groups</Link>
                </div>
                <div className="text-gray-500 dark:text-gray-400 col-span-1">{meeting.meeting_date}</div>
                <div className="text-gray-500 dark:text-gray-400 col-span-2">{meeting.agenda}</div>
                <div className="text-gray-500 dark:text-gray-400 col-span-2">{meeting.description}</div>
                <div className="text-gray-500 dark:text-gray-400 col-span-2">{meeting.meeting_location}</div>
                <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <Link
                      to={`/meetings/edit-meeting/${meeting.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Edit</Link>
                </div>                    
                <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <button
                      onClick={() => deleteMeeting(meeting.id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Delete</button>
                </div>                                                    
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default Meetings;