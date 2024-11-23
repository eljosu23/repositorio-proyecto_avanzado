import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Destination } from '../types';

interface Props {
  destination: Destination;
  onUpdate: (id: string, updates: Partial<Destination>) => void;
  onDelete: (id: string) => void;
}

export const DestinationCard = ({ destination, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(destination.title);
  const [description, setDescription] = useState(destination.description);
  const [imageUrl, setImageUrl] = useState(destination.imageUrl);

  const handleSave = () => {
    onUpdate(destination.id, { title, description, imageUrl });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(destination.title);
    setDescription(destination.description);
    setImageUrl(destination.imageUrl);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Título"
            />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="URL de la imagen"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={3}
              placeholder="Descripción"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">
                {destination.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(destination.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{destination.description}</p>
          </>
        )}
      </div>
    </div>
  );
};