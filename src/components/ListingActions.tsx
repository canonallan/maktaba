import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteListing } from '../store/slices/listingSlice';
import type { AppDispatch } from '../store';

interface ListingActionsProps {
  listingId: string;
  onEdit: () => void;
}

function ListingActions({ listingId, onEdit }: ListingActionsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await dispatch(deleteListing(listingId)).unwrap();
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        title="Edit listing"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
        title="Delete listing"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ListingActions;