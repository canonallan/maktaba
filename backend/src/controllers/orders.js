import Order from '../models/Order.js';
import Listing from '../models/Listing.js';

export const createOrder = async (req, res) => {
  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    if (listing.status !== 'available') {
      return res.status(400).json({ message: 'Listing is not available' });
    }

    const order = await Order.create({
      buyerId: req.user._id,
      sellerId: listing.sellerId,
      listingId
    });

    await Listing.findByIdAndUpdate(listingId, { status: 'pending' });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { buyerId: req.user._id },
        { sellerId: req.user._id }
      ]
    })
      .populate('listingId')
      .populate('buyerId', 'name email avatar')
      .populate('sellerId', 'name email avatar')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    if (status === 'completed') {
      await Listing.findByIdAndUpdate(order.listingId, { status: 'sold' });
    } else if (status === 'cancelled') {
      await Listing.findByIdAndUpdate(order.listingId, { status: 'available' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};