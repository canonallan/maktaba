// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { MessageSquare, DollarSign } from 'lucide-react';
// import api from '../services/api';
// import { createOrder } from '../store/slices/orderSlice';
// import { sendMessage } from '../store/slices/messageSlice';
// import type { AppDispatch, RootState } from '../store';
// import type { Listing } from '../types';

// function ListingDetails() {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [listing, setListing] = useState<Listing | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const response = await api.get(`/listings/${id}`);
//         setListing(response.data);
//       } catch (err: any) {
//         setError(err.response?.data?.message || 'Failed to fetch listing');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [id]);

//   const handlePurchase = async () => {
//     try {
//       await dispatch(createOrder(id!)).unwrap();
//       navigate('/orders');
//     } catch (err: any) {
//       setError(err.message || 'Failed to create order');
//     }
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!listing || !user) return;

//     try {
//       await dispatch(sendMessage({
//         receiverId: listing.sellerId,
//         content: message,
//         listingId: listing.id
//       })).unwrap();
//       setShowMessageModal(false);
//       setMessage('');
//       navigate('/messages');
//     } catch (err: any) {
//       setError(err.message || 'Failed to send message');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (error || !listing) {
//     return (
//       <div className="bg-red-50 text-red-500 p-4 rounded-md">
//         {error || 'Listing not found'}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
//           <div className="space-y-4">
//             <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src={listing.images[0]}
//                 alt={listing.title}
//                 className="w-full h-full object-center object-cover"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {listing.images.slice(1).map((image, index) => (
//                 <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
//                   <img
//                     src={image}
//                     alt={`${listing.title} ${index + 2}`}
//                     className="w-full h-full object-center object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
//             <p className="mt-4 text-gray-500">{listing.description}</p>

//             <div className="mt-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Price</span>
//                 <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Category</span>
//                 <span className="text-gray-900 capitalize">{listing.category}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Condition</span>
//                 <span className="text-gray-900 capitalize">{listing.condition}</span>
//               </div>
//             </div>

//             {user && user.id !== listing.sellerId && (
//               <div className="mt-8 space-y-4">
//                 <button
//                   onClick={handlePurchase}
//                   className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   <DollarSign className="h-5 w-5 mr-2" />
//                   Purchase
//                 </button>
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   <MessageSquare className="h-5 w-5 mr-2" />
//                   Message Seller
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showMessageModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Message Seller</h3>
//             <form onSubmit={handleSendMessage}>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 rows={4}
//                 placeholder="Write your message..."
//                 required
//               />
//               <div className="mt-4 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowMessageModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListingDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, DollarSign, User } from 'lucide-react';
import api from '../services/api';
import { createOrder, updateOrderStatus } from '../store/slices/orderSlice';
import { sendMessage } from '../store/slices/messageSlice';
import type { AppDispatch, RootState } from '../store';
import type { Listing, Order } from '../types';

function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [listing, setListing] = useState<Listing | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
        
        // Fetch order if exists
        if (user) {
          const orderResponse = await api.get(`/orders?listingId=${id}`);
          if (orderResponse.data.length > 0) {
            setOrder(orderResponse.data[0]);
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, user]);

  const handleCreateOrder = async () => {
    try {
      const result = await dispatch(createOrder(id!)).unwrap();
      setOrder(result);
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
    }
  };

  const handleUpdateOrderStatus = async (status: string) => {
    if (!order) return;
    try {
      const result = await dispatch(updateOrderStatus({ 
        orderId: order.id, 
        status 
      })).unwrap();
      setOrder(result);
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing || !user) return;

    try {
      await dispatch(sendMessage({
        receiverId: listing.sellerId,
        content: message,
        listingId: listing.id
      })).unwrap();
      setShowMessageModal(false);
      setMessage('');
      navigate('/messages');
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    }
  };

  const renderOrderActions = () => {
    if (!order) return null;

    if (user?.id === listing?.sellerId) {
      switch (order.status) {
        case 'pending':
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateOrderStatus('confirmed')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Confirm Order
              </button>
              <button
                onClick={() => handleUpdateOrderStatus('cancelled')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          );
        case 'confirmed':
          return (
            <button
              onClick={() => handleUpdateOrderStatus('completed')}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Mark as Completed
            </button>
          );
        default:
          return (
            <div className="text-center py-2 text-gray-600">
              Order is {order.status}
            </div>
          );
      }
    }

    return (
      <div className="text-center py-2 text-gray-600">
        Order Status: {order.status}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md">
        {error || 'Listing not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${listing.title} ${index + 2}`}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
              <span className="text-2xl font-bold text-indigo-600">${listing.price}</span>
            </div>

            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{listing.sellerName}</span>
            </div>

            <p className="mt-4 text-gray-500">{listing.description}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Category</span>
                <span className="text-gray-900 capitalize">{listing.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="text-gray-900 capitalize">{listing.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-gray-900 capitalize">{listing.status}</span>
              </div>
            </div>

            {user && user.id !== listing.sellerId && (
              <div className="mt-8 space-y-4">
                {!order && listing.status === 'available' && (
                  <button
                    onClick={handleCreateOrder}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Place Order
                  </button>
                )}
                {order && renderOrderActions()}
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message Seller
                </button>
              </div>
            )}

            {user && user.id === listing.sellerId && order && (
              <div className="mt-8">
                {renderOrderActions()}
              </div>
            )}
          </div>
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Message Seller</h3>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Write your message..."
                required
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetails;