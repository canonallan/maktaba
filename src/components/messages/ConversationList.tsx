
import type { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

function ConversationList({ conversations, selectedUserId, onSelectUser }: ConversationListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <div className="overflow-y-auto h-full">
        {conversations.map((conv) => (
          <button
            key={conv.user.id}
            onClick={() => onSelectUser(conv.user.id)}
            className={`w-full p-4 text-left hover:bg-gray-50 ${
              selectedUserId === conv.user.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {conv.user.avatar ? (
                  <img
                    src={conv.user.avatar}
                    alt={conv.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {conv.user.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{conv.user.name}</p>
                {conv.lastMessage && (
                  <p className="text-sm text-gray-500 truncate">
                    {conv.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ConversationList;