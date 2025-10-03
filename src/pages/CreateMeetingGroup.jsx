import MeetingGroupDetails from "../components/MeetingGroupDetails"
import { Link, useParams } from "react-router-dom";

const CreateMeetingGroup = () => {

  
  const {meeting_id} = useParams();

  console.log("Hello ID:", meeting_id);

  return (
     <MeetingGroupDetails isEdit={false}/>
  )
}

export default CreateMeetingGroup;