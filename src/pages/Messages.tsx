import  { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations, fetchMessages, sendMessage } from '../store/slices/messageSlice';
import ConversationList from '../components/messages/ConversationList';
import MessageList from '../components/messages/MessageList';
import  MessageInput from '../components/messages/MessageInput';
import type { AppDispatch, RootState } from '../store';

function Messages() {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, messages } = useSelector((state: RootState) => state.messages);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !newMessage.trim()) return;

    try {
      await dispatch(sendMessage({
        receiverId: selectedUserId,
        content: newMessage
      })).unwrap();
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      <ConversationList
        conversations={conversations}
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />

      <div className="col-span-2 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        {selectedUserId ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {conversations.find((c) => c.user.id === selectedUserId)?.user.name}
              </h2>
            </div>
            <MessageList
              messages={messages}
              selectedUserId={selectedUserId}
              messagesEndRef={messagesEndRef}
            />
            <MessageInput
              newMessage={newMessage}
              onMessageChange={(e) => setNewMessage(e.target.value)}
              onSubmit={handleSendMessage}
            />
          </>
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