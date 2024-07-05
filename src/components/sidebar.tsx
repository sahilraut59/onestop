'use client';
import { User, Workspace } from '@/types/app';
import { FC } from 'react';
import SidebarNav from '@/components/sidebar-nav';
import { FiPlus } from 'react-icons/fi';
import { GiNightSleep } from 'react-icons/gi';
import { GoDot, GoDotFill } from 'react-icons/go';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-prefrences';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/typography';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoDiamondOutline } from 'react-icons/io5';
import PreferencesDialog from './preferences-dialog';

type SidebarProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userWorkspacesData,
  currentWorkspaceData,
  userData,
}) => {
  const { color } = useColorPrefrences();

  let backgroundColor = 'bg-primary-dark';
  if (color === 'green') {
    backgroundColor = 'bg-green-700';
  } else if (color === 'blue') {
    backgroundColor = 'bg-blue-700';
  }

  return (
    <aside
      className={`
  fixed
  top-0
  left-0
  pt-[68px]
  pb-8
  z-30
  flex
  flex-col
  justify-between
  items-center
  h-screen
  w-20

  `}
    >
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspacesData={userWorkspacesData}
      />

      <div className="flex flex-col space-y-3">
        <div
          className={`
          bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300
          hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10
          `}
        >
          <FiPlus size={28} />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={userData.avatar_url}
                          alt={userData.name || 'user'}
                          width={300}
                          height={300}
                        />
                        <div
                          className={cn(
                            'absolute z-10 rounded-full -right-[20%] -bottom-1',
                            backgroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill className="text-green-600" size={17} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3 ">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Typography
                            text={userData.name || userData.email}
                            variant="p"
                            className="font-bold"
                          />
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size={12} />
                            ) : (
                              <GoDotFill className="text-green-600" size={17} />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? 'Away' : 'Active'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencil className="hidden group-hover:block" />
                        <Typography
                          text={'In a meeting'}
                          variant="p"
                          className="text-xs text-gray-600"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          variant="p"
                          text={
                            userData.is_away
                              ? 'Set yourself as active'
                              : 'Set yourself as Away'
                          }
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <Typography
                          variant="p"
                          text="Clear Status"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <hr className="bg-gray-400" />
                        <Typography
                          variant="p"
                          text="Profile"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />

                        <PreferencesDialog />

                        <hr className="bg-gray-400" />
                        <div className="flex gap-2 items-center hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer">
                          <IoDiamondOutline className="text-orange-400" />
                          <Typography
                            variant="p"
                            text={`Upgrade ${currentWorkspaceData.name}`}
                            className="text-xs"
                          />
                        </div>
                        <Typography
                          variant="p"
                          text={`Sign out of ${currentWorkspaceData.name}`}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="text-white bg-black border-black"
              side="right"
            >
              <Typography text={userData.name || userData.email} variant="p" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
