import ProfileDetail from "../components/ProfileDetail";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { supabase } from "../components/supabase";

const EditProfile = () => {
  
  const { id } = useParams();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async() => {
      try{
          const { data } = await supabase.from("client_profiles").select().eq('id', id).single();
          setProfile(data);
      }catch(error){
        console.log('Error', error);
    }finally{
      setLoading(false);
    }     
  }

    fetchProfile();
  
  }, []);

  return  <>
    {
      loading ? 'loading..' : <ProfileDetail profile= {profile}/>    
    }
  </>
}

export default EditProfile;