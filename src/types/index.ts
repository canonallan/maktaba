export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: 'books' | 'calculators' | 'stationery' | 'other';
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  sellerId: string;
  status: 'available' | 'pending' | 'sold';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  listingId?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}