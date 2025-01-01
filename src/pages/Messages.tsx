
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, fetchMessages } from '../store/slices/messageSlice';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../store';
import type { Message } from '../types';

function Messages() {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, messages } = useSelector((state: RootState) => state.messages);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      {/* Conversations List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conv) => (
            <button
              key={conv.user.id}
              onClick={() => setSelectedUserId(conv.user.id)}
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

      {/* Messages */}
      <div className="col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
        {selectedUserId ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {conversations.find((c) => c.user.id === selectedUserId)?.user.name}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message: Message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === selectedUserId ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === selectedUserId
                        ? 'bg-gray-100'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;