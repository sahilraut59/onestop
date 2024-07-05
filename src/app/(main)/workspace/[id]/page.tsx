import { redirect } from 'next/navigation';
import { getUserData } from '@/actions/get-user-data';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import Sidebar from '@/components/sidebar';
import { Workspace as UserWorkspace } from '@/types/app';
import InfoSection from '@/components/info-section';
import Typography from '@/components/ui/typography';

const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
    userData.workspaces!
  );

  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id);

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection />
        <Typography text='Harder Daddy' variant='h1' />
        <Typography text='Deeper' variant='h2' />
        <Typography text='Just like that' variant='h3' />
        <Typography text='Oh I like it so muchhh !!!!' variant='h4' />
      </div>
      <div className="md:hidden block min-h-screen"> Mobile</div>
    </>
  );
};

export default Workspace;
