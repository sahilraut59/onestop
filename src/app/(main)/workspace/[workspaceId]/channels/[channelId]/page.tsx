import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import ChatHeader from '@/components/chat-header';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import TextEditor from '@/components/text-editor';
import Typography from '@/components/ui/typography';

import { Workspace as UserWorkspace } from '@/types/app';
import { redirect } from 'next/navigation';

const ChannelId = async ({
  params: { channelId, workspaceId },
}: {
  params: {
    workspaceId: string;
    channelId: string;
  };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorskspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorskspaceChannels.find(
    (channel) => channel.id === channelId
  );

  if (!currentChannelData) return redirect('/');

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection
          userData={userData}
          currentWorkspaceData={currentWorkspaceData}
          userWorskspaceChannels={userWorskspaceChannels}
          currentChannelId={channelId}
        />
        <div className="p-4 relative w-full overflow-hidden">
          {/* <Typography text="Channel id text" variant="h4" /> */}
          <ChatHeader title={currentChannelData.name} />
          <div className="mt-10">
            <Typography text="Chat content" variant="h4" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl="/api/web-socket/messages"
          type="channel"
          channel={currentChannelData}
          workspaceData={currentWorkspaceData}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default ChannelId;
