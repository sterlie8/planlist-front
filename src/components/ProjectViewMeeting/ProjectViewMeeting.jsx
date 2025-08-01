import MeetingInfoCard from "./MeetingInfoCard"
import MeetingList from "./MeetingList";
import MemoCard from "../ProjectView/MemoCard"
import "../ProjectView/ProjectViewDiv.css"

import ProfilePic from "../../assets/ProfilePic.png"


const sampleProject = {
  
    id: 1,
    title: 'Team Branding Workshop',
    description: "Weekly catch-up and planning meeting.",
    category: 'meeting',
    status: 'Finished',
    repeat:'tuesday',
    startDate: '2025-07-01',
    endDate: '2025-07-07',
    users: [
      { name: 'A', avatar: ProfilePic },
      { name: 'B', avatar: ProfilePic },
      { name: 'C', avatar: ProfilePic },{ name: 'A', avatar: ProfilePic },
      { name: 'B', avatar: ProfilePic },
      { name: 'C', avatar: ProfilePic },{ name: 'A', avatar: ProfilePic },
      { name: 'B', avatar: ProfilePic },
      { name: 'C', avatar: ProfilePic },{ name: 'A', avatar: ProfilePic },
      { name: 'B', avatar: ProfilePic },
      { name: 'C', avatar: ProfilePic },
      
    ],
    sessions: ["meeting1", "meeting2", "meeting3", "meeting4", "meeting5"],
  
};

const exampleMemos = [
  {
    id: "1",
    type: "personal",
    project: "example project 1",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  },
  {
    id: "2",
    type: "group",
    project: "example project 2",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  },
  {
    id: "3",
    type: "personal",
    project: "example project 3",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  },
  {
    id: "4",
    type: "group",
    project: "example project 4",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  },
  {
    id: "5",
    type: "personal",
    project: "example project 5",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  },
  {
    id: "6",
    type: "group",
    project: "example project 6",
    content: "example project description. showing the first few sentences of the memo.",
    category: "meeting"
  }
];

const ProjectViewMeeting = () => {
  

  return (
    <div className="screen">
      <div className="project-view-div">
      <div className="layout ProjectView">
        <MeetingInfoCard project={sampleProject}/>
        <MeetingList project={sampleProject}/>
      </div>
      
      <MemoCard initialMemos={exampleMemos}/>
    </div>

    </div>
    
    
  );
};

export default ProjectViewMeeting;