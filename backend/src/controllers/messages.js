import Message from '../models/Message.js';
import User from '../models/User.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, listingId } = req.body;
    const message = await Message.create({
      senderId: req.user._id,
      receiverId,
      content,
      listingId
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id },
        { receiverId: req.user._id }
      ]
    }).sort('-createdAt');

    const userIds = [...new Set([
      ...messages.map(m => m.senderId.toString()),
      ...messages.map(m => m.receiverId.toString())
    ])].filter(id => id !== req.user._id.toString());

    const users = await User.find({ _id: { $in: userIds } });

    const conversations = users.map(user => ({
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar
      },
      lastMessage: messages.find(m => 
        m.senderId.toString() === user._id.toString() ||
        m.receiverId.toString() === user._id.toString()
      )
    }));

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user._id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};