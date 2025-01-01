import Listing from '../models/Listing.js';

export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      sellerId: req.user._id
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListings = async (req, res) => {
  try {
    const { category, condition, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const listings = await Listing.find(query)
      .populate('sellerId', 'name email avatar')
      .sort('-createdAt');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('sellerId', 'name email avatar');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};