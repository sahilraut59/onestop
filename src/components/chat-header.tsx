import { FC } from 'react';
import Typography from './ui/typography';
import { IoMdHeadset } from 'react-icons/io';

type ChatHeaderProp = {
  title: string;
};

const ChatHeader: FC<ChatHeaderProp> = ({ title }) => {
  return (
    <div className="absolute h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography variant="h4" text={`# ${title}` } />
        <IoMdHeadset size={24} className="text-primary" />
      </div>
    </div>
  );
};

export default ChatHeader;
