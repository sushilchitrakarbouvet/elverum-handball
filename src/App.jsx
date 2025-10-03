import { 
        Route,
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider
      } from 'react-router-dom';



import HomePage from './pages/Home';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import JobPage from './pages/JobPage';
import NotFoundPage from './pages/NotFoundPage';

import UserList from './pages/UserList';
import Meetings from './pages/Meetings';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';
import SendInvite from './pages/SendInvite';
import { supabase } from './components/supabase';
import { useState, useEffect } from 'react';
//import {Auth} from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


import Auth from './pages/Auth'
import Account from './pages/Account';
import Login from './pages/Login';
import SetupPassword from './pages/SetupPassword';
import MeetingParticipants from './pages/MeetingParticipants';
import CreateMeeting from './pages/CreateMeeting';
import EditMeeting from './pages/EditMeeting';
import MeetingGroups from './pages/MeetingGroups';
import CreateMeetingGroup from './pages/CreateMeetingGroup';
import EditMeetingGroup from './pages/EditMeetingGroup';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/jobs/:id' element={<JobPage />} />
      <Route path='/profiles/add-profile/:emailInvite' element={<AddProfile />} />
      <Route path='/profiles/edit-profile/:id' element={<EditProfile />} />
      <Route path='/profiles' element={<UserList />} />
      <Route path='/meetings' element={<Meetings />} />
      <Route path='/sendInvite' element={<SendInvite />} />
      <Route path='/setupPassword' element={<SetupPassword/>} />
      <Route path='/meetings/:id/participants' element={<MeetingParticipants/>} />
      <Route path='/meetings/:meeting_id/groups' element={<MeetingGroups/>} />
      {/* <Route path='/meetings/:id/groups/create-meeting-group' element={<CreateMeetingGroup/>} /> */}
      <Route path='/meetings/:meeting_id/groups/create-meeting-group' element={<CreateMeetingGroup/>} />
      <Route path='/meetings/:meeting_id/groups/edit-meeting-group/:group_id' element={<EditMeetingGroup/>} />
      <Route path='/meetings/create-meeting' element={<CreateMeeting/>} />
      <Route path='/meetings/edit-meeting/:id' element={<EditMeeting/>} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
   const [session, setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      return () => subscription.unsubscribe()
    }, [])
    if (!session) {
      return (<Login supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else { return ( <RouterProvider router={router} />) }
};

export default App;