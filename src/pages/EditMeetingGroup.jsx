import MeetingGroupDetails from "../components/MeetingGroupDetails"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../components/supabase";

const EditMeetingGroup = () => {
  
  const {group_id} = useParams();
  
    const [group, setMeetingGroup] = useState([]);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
      const fetchGroup = async() => {
        try{
            const { data } = await supabase.from("meeting_groups").select().eq('id', group_id).single();
            console.log(data);
            setMeetingGroup(data);
        }catch(error){
          console.log('Error', error);
      }finally{
        setLoading(false);
      }     
    }
  
      fetchGroup();
    
    }, []);

  return (
     loading ? 'loading..' :<MeetingGroupDetails group={group} isEdit={true}/>
  )
}

export default EditMeetingGroup;