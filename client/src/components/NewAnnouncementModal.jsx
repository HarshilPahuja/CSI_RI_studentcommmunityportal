import React, { useState } from 'react';
import { X } from 'lucide-react';

function NewAnnouncementModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validTill, setValidTill] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setValidTill('');
    setError('');
    onClose();
  };

  const handlePublish = async () => {
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description.');
      return;
    }

    const clubName = localStorage.getItem('club_name');
    if (!clubName) {
      setError('No club found. Please log in again.');
      return;
    }

    setPublishing(true);

    try {
      const response = await fetch('http://localhost:3000/notifications/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          club_name: clubName,
          title: title.trim(),
          description: description.trim(),
          valid_till: validTill ? new Date(validTill).toISOString() : null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to publish announcement.');
      }

      handleClose();
    } catch (err) {
      console.error('Publish error:', err);
      setError(err.message || 'Failed to publish announcement.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">New Announcement</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Winter Hackathon Registration Open"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share the details about this announcement..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
            />
          </div>

          {/* Publishing Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Publishing Options</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid Till:
              </label>
              <input
                type="datetime-local"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {publishing ? 'Publishing...' : 'Publish Announcement'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewAnnouncementModal;
