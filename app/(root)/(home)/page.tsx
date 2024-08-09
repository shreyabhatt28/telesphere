"use client"
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";


const Home = () => {

  const { upcomingCalls, isLoading} = useGetCalls();
  const [nextMeetingTime, setNextMeetingTime] = useState<string|null>(null);

  useEffect(()=>{
    if(!isLoading)
    {
      if(upcomingCalls && upcomingCalls.length>0){
      const nextCall = upcomingCalls[0];

      if(nextCall && nextCall.state?.startsAt){

        const meetingTime = new Date (nextCall.state?.startsAt).toLocaleTimeString("india",{
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        
        setNextMeetingTime(meetingTime);
      }else{
        setNextMeetingTime(null);
      }
    }
    else{
      setNextMeetingTime(null);
    }
  }
    
  },[upcomingCalls,isLoading])

    const now =new Date();
    const time = now.toLocaleTimeString('india',{hour:'2-digit',minute:'2-digit'});
    const date = (new Intl.DateTimeFormat('india',{dateStyle:'full'})).format(now);

    return (
        <section className="flex size-full flex-col gap-10 text-white">
          <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
            <div className="flex h-full flex-col justify-between max-md: px-5 max-md:py-8 lg:p-11">
              <h2 className="glassmorphism max-w-270px rounded py-2 text-center text-base font-normal">
                {nextMeetingTime?`Upcoming Meeting at: ${nextMeetingTime}` : "No Upcoming Meetings!"}
              </h2>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
              </div>
            </div>
          </div>
          <MeetingTypeList/>
        </section>
      );
}

export default Home;