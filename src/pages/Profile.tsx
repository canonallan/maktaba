
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500 font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-gray-900 capitalize">{user.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Member Since
              </label>
              <p className="mt-1 text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;