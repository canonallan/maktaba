import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchListings } from '../store/slices/listingSlice';
import type { AppDispatch, RootState } from '../store';
import type { Listing } from '../types';

const categories = ['books', 'calculators', 'stationery', 'other'];
const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { listings, loading } = useSelector((state: RootState) => state.listings);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    const params: any = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (condition) params.condition = condition;
    dispatch(fetchListings(params));
  }, [dispatch, search, category, condition]);

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Link
      to={`/listings/${listing._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={listing.images[0]}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
        <p className="text-gray-600 mt-1">${listing.price}</p>
        <div className="flex items-center mt-2">
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-800">
            {listing.category}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-800 ml-2">
            {listing.condition}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-4 mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Conditions</option>
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond.charAt(0).toUpperCase() + cond.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;