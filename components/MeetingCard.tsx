import { cn } from '@/lib/utils';
import Image from 'next/image'
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import {avatarImages} from "@/constants";
import { format,parseISO } from 'date-fns';

interface MeetingCardProps {
title:string;
date:string;
icon:string;
isPreviousMeeting:boolean;
buttonIcon1?:string;
handleClick:()=>void;
link:string;
buttonText?:string;
}

const MeetingCard = ({icon,title,date,isPreviousMeeting,buttonIcon1,handleClick,link,buttonText}:MeetingCardProps) => {
    const parsedDate = parseISO(date);

    const formattedDate = format(parsedDate, 'MMMM do, yyyy');
    const formattedTime = format(parsedDate, 'h:mm aa');

    return ( 
        <section className="flex flex-col min-h-[250px] w-full justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col justify-between">
                <Image src={icon} alt="upcoming" width={28} height={28}/>
                <div className="flex justify-between mt-[8px]">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{formattedDate} at {formattedTime}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative",{})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img,index)=>(
                        <Image
                        key={index}
                        src={img}
                        alt="attendees"
                        width={40}
                        height={40}
                        className={cn("rounded-full",{absolute:index>0})}
                        style={{top:0,left:index*28}}
                        />
                    ))}
                    <div className="flex-center font-normal absolute left-[136px] size-10 rounded-full border-[5px] border-dark-2 bg-dark-2">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick}
                        className="rounded bg-blue-1 px-6 ">
                            {buttonIcon1 && (
                                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                            )} &nbsp;
                            {buttonText}
                        </Button>
                        <Button 
                            onClick={()=>{
                            navigator.clipboard.writeText(link);
                            toast({
                                title:"Link Copied",
                            });
                        }} className="bg-dark-2 px-6"
                        >
                            <Image src='/icons/copy.svg' height={16} width={16} alt="copy link" className="mr-[6px]"/>
                            Copy Link
                        </Button>
                    </div>
                )}

            </article>
        </section>
    );
}

export default MeetingCard;