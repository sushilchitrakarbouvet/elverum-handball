import { supabase } from "../components/supabase";
import { useEffect} from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const MeetingParticipants = () => {

  const {id} = useParams(); 

  const [meetingParticipants, setMeetingParticipants] = useState([]);

  useEffect(() => {
    getMeetingParticipants();
  }, []);

  
  async function getMeetingParticipants() {
      const { data, error } = await supabase.rpc("get_meetings", {meeting_id: id});

    if(error){
      console.log("error", error);
      return;
    }

    setMeetingParticipants(data);
  }

  const onChange= () => {

  }
    
  return (
        <div id="detailed-pricing" className="w-full overflow-x-auto">
        <div className="overflow-hidden min-w-max">
            <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">                
                <div>Is Participating</div>
                <div className="flex items-center">Name</div>
                <div>Organization</div>
                <div>Meeting agenda</div>
            </div>
            {meetingParticipants.map((meetingParticipants) => (      
            <div key={meetingParticipants.client_id } className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <div><input type="checkbox" className="text-gray-500 dark:text-gray-400 float-left" checked={meetingParticipants.is_participating} onChange={() => onChange}/></div>
                <div className="text-gray-500 dark:text-gray-400">{meetingParticipants.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{meetingParticipants.company}</div>
                <div className="text-gray-500 dark:text-gray-400">{meetingParticipants.agenda}</div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default MeetingParticipants;