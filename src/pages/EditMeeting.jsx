import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../components/supabase";
import { useParams } from "react-router-dom";
import MeetingDetails from "../components/MeetingDetails";

const EditMeeting = () => {
      
  const { id } = useParams();


  const [meeting, setMeeting] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMeeting = async() => {
      try{
          const { data } = await supabase.from("meetings").select().eq('id', id).single();
          console.log(data);
          setMeeting(data);
      }catch(error){
        console.log('Error', error);
    }finally{
      setLoading(false);
    }     
  }

    fetchMeeting();
  
  }, []);

  return (
     loading ? 'loading..' : <MeetingDetails meeting={meeting} isEdit={true}/>    
  )
}

export default EditMeeting;