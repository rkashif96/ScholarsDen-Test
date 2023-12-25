import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface Post {
  _id: string;
  country: string;
  amount: string;
  exchangedAmount: string;
}

interface MyTableProps {
  posts: Post[];
  onDelete: (postId: string) => void;
}

const MyTable: React.FC<MyTableProps> = ({ posts, onDelete }) => {

  return (
    <div className="container mx-auto mt-10 w-3/4">
      <h2 className="text-3xl font-semibold mb-6 text-center">MY EXCHANGES</h2>
      <table className="min-w-full table-auto border border-black py-2">
        <thead>
          <tr>
            <th className="py-2">Country</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Exchanged Amount</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        {posts.length >= 1 ? (
          <tbody className="text-center">
            {posts.map(post => (
              <tr key={post._id}>
                <td className="border border-black py-2">{post.country}</td>
                <td className="border border-black py-2">{post.amount}</td>
                <td className="border border-black py-2">{post.exchangedAmount}</td>
                <td className="border border-black py-2">
                  <button
                    className="cursor-pointer focus:outline-none"
                    onClick={() => onDelete(post._id)}
                  >
                    <FaTrash color="red" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4}>
                <div className="card text-center bg-gray-200">
                  <div className="card-body">
                    <h5 className="card-title text-lg font-semibold text-gray-700">No Posts</h5>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default MyTable;
