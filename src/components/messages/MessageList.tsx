
import type { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  selectedUserId: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

function MessageList({ messages, selectedUserId, messagesEndRef }: MessageListProps) {
  return (
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
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;