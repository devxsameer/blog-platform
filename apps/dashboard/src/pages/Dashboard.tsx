import { LiaCommentsSolid, LiaTagsSolid } from 'react-icons/lia';
import { TbWriting } from 'react-icons/tb';

function Dashboard() {
  return (
    <div>
      <div className="flex flex-wrap gap-6 max-md:gap-4">
        <div className="card bg-base-100 card-sm min-w-55 shadow-sm">
          <div className="card-body flex-row gap-6 p-6">
            <div className="avatar avatar-placeholder">
              <div className="bg-accent/15 text-accent w-12 rounded-full text-xl">
                <TbWriting />
              </div>
            </div>
            <div>
              <span className="block text-xl font-bold">64</span>
              <span className="text-base-content/70 text-sm">Total Posts</span>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 card-sm min-w-55 shadow-sm">
          <div className="card-body flex-row gap-6 p-6">
            <div className="avatar avatar-placeholder">
              <div className="bg-primary/15 text-primary w-12 rounded-full text-xl">
                <LiaCommentsSolid />
              </div>
            </div>
            <div>
              <span className="block text-xl font-bold">3256</span>
              <span className="text-base-content/70 text-sm">
                Total Comments
              </span>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 card-sm min-w-55 shadow-sm">
          <div className="card-body flex-row gap-6 p-6">
            <div className="avatar avatar-placeholder">
              <div className="bg-secondary/15 text-secondary w-12 rounded-full text-xl">
                <LiaTagsSolid />
              </div>
            </div>
            <div>
              <span className="block text-xl font-bold">200</span>
              <span className="text-base-content/70 text-sm">Total Tags</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
