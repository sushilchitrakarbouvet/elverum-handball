import { supabase } from '../components/supabase'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const MeetingGroups = () => {
  const {meeting_id} = useParams(); 

  const [meetingGroups, setMeetingGroups] = useState([]);

  useEffect(() => {
    getMeetingGroups();
  }, []);

  
  async function getMeetingGroups() {
      const { data, error } = await supabase.rpc("get_groups_by_meeting_id", {p_meeting_id: meeting_id});
      //const { data, error } = await supabase.from('meeting_groups').select('meeting_id, group_name, group_details' ).eq("meeting_id", id).eq('group_name', 'Group 1');
   if(error){
      console.log("error", error);
      return;
    }
    setMeetingGroups(data);
  }

  // const deleteMeetingGroup = async(meetingId) => {
  //   const { data, error } = await supabase.from("meetings").delete().eq('id', meetingId);

  //   if(error){
  //     console.log("Error:", error);      
  //   }
  //   else{
  //     console.log('Data', data);
  //   }
  // }

  return (
    <>
    <Link 
        className='bg-indigo-500 hover:bg-indigo-600 text-white
                  font-bold py-2 px-4 rounded-full focus:outline-none 
                  focus:shadow-outline float-right m-3'
        to={`/meetings/${meeting_id}/groups/create-meeting-group`} title='Create meeting'>Create group</Link>
    <div id="detailed-pricing" className="w-full overflow-x-auto">
        <div className="overflow-hidden min-w-max">
            <div className="grid grid-cols-10 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">                
                <div className='col-span-1'></div>
                <div className="flex items-center col-span-1">Group</div>
                <div className="flex items-center col-span-1">Details</div>
                <div className='col-span-1'>Edit</div>
                {/* <div className='col-span-2'>Group</div>
                <div className='col-span-1'>Delete</div> */}
            </div>
            {meetingGroups.map((group) => (      
            <div key={group.id} className="grid grid-cols-10 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <Link
                      to={`/meetings/${group.meeting_id}/participants`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Participants</Link>
                </div>
                <div className="text-gray-500 dark:text-gray-400 col-span-1">{group.group_name}</div>
                <div className="text-gray-500 dark:text-gray-400 col-span-2">{group.details}</div>
               <div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <Link
                      to={`/meetings/${group.meeting_id}/groups/edit-meeting-group/${group.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Edit</Link>
                </div>                    
                {/*<div className="text-gray-500 dark:text-gray-400 col-span-1">
                  <button
                      onClick={() => deleteMeetingGroup(meeting.id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >Delete</button>
                </div>*/}
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default MeetingGroups;