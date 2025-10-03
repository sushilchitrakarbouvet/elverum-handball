import { supabase } from '../components/supabase'
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";

const UserList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => { getClients(); }, []);
  
  async function getClients() {
    const { data } = await supabase.from("client_profiles").select();
    setClients(data);
  }

  const deleteProfile = async(id) => {
    await supabase.from('client_profiles').delete().eq("id", id);
    getClients();
  }

  return (
    <div id="detailed-pricing" className="w-full overflow-x-auto">
        <div className="overflow-hidden min-w-max">
            <div className="grid grid-cols-6 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <div className="flex items-center">User Name</div>
                <div>Email</div>
                <div>Company</div>
                <div>Address</div>                
                <div>Edit</div>              
                <div>Delete</div>
            </div>
            {clients.map((client) => (      
            <div key={client.id} className="grid grid-cols-6 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <div className="text-gray-500 dark:text-gray-400">{client.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{client.email}</div>
                <div className="text-gray-500 dark:text-gray-400">{client.company}</div>
                <div className="text-gray-500 dark:text-gray-400">{client.address}</div>
                <div className="text-gray-500 dark:text-gray-400"><Link to={`/profiles/edit-profile/${client.id}`}>Edit</Link></div>
                <div className="text-gray-500 dark:text-gray-400"><Link onClick={() => deleteProfile(client.id)}>Delete</Link></div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default UserList;