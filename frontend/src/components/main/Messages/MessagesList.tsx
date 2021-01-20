import Avatar from '~/components/shared/Avatar';
import Badge from '~/components/shared/Badge';
import { displayTime } from '~/helpers/utils';
import { IMessage, IUser } from "~/types/types";

interface IProps {
    messages: IMessage[];
    userID: string;
    handleReadMessage: (sender: IUser) => void;
}

const MessagesList: React.FC<IProps> = ({ messages, userID, handleReadMessage }) => {
    return (
        <div>
            {messages.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-gray-400 italic">No Messages.</p>
                </div>
            ) : (
                    <div className="max-h-70vh overflow-y-scroll divide-y divide-gray-100">
                        {messages.map(message => {
                            return (
                                <div
                                    className={`flex justify-start cursor-pointer hover:bg-gray-100 px-2 py-3 relative ${(!message.seen && !message.isOwnMessage) && 'bg-indigo-100 hover:bg-indigo-200'}`}
                                    key={message.id}
                                    onClick={() => handleReadMessage(message.isOwnMessage ? message.to : message.from)}
                                >
                                    {/* --- IMAGE--- */}
                                    <Avatar
                                        url={!message.isOwnMessage ? message.from.profilePicture : message.to.profilePicture}
                                        size="lg"
                                        className="mr-4"
                                    />
                                    <div className="relative flex-grow">
                                        {/* --- USERNAME --- */}
                                        <h5 className={`${(!message.seen && !message.isOwnMessage) && 'font-bold text-gray-800'} text-gray-500`}>
                                            {!message.isOwnMessage ? message.from.username : message.to.username}
                                        </h5>
                                        {/* -- MESSAGE--- */}
                                        <span className={`block max-w-sm whitespace-nowrap overflow-hidden overflow-ellipsis ${(message.seen || message.isOwnMessage) ? 'text-gray-400' : 'text-indigo-600 font-medium'} text-sm`}>
                                            {message.isOwnMessage && 'You:'} {message.text}
                                        </span>
                                        {/* --- DATE --- */}
                                        <span className="absolute right-4 top-1 text-xs text-gray-400">
                                            {displayTime(message.createdAt)}
                                        </span>
                                        {/* --- BADGE ---- */}
                                        {!message.isOwnMessage && (
                                            <div className="absolute  bottom-2 right-4 w-2 h-2">
                                                <Badge count={message.unseenCount || 0} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
        </div>
    );
};

export default MessagesList;
