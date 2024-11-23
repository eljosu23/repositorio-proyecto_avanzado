import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DestinationCard } from '../components/DestinationCard';
import { Destination } from '../types';
import { LogOut, Plus, Search } from 'lucide-react';

export const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDestination, setNewDestination] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    const stored = localStorage.getItem('destinations');
    if (stored) {
      setDestinations(JSON.parse(stored));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const saveDestinations = (newDestinations: Destination[]) => {
    localStorage.setItem('destinations', JSON.stringify(newDestinations));
    setDestinations(newDestinations);
  };

  const handleAddDestination = () => {
    if (!user) return;

    const newDest: Destination = {
      ...newDestination,
      id: Date.now().toString(),
      userId: user.email,
      createdAt: Date.now(),
    };

    saveDestinations([...destinations, newDest]);
    setShowAddModal(false);
    setNewDestination({ title: '', description: '', imageUrl: '' });
  };

  const handleUpdateDestination = (id: string, updates: Partial<Destination>) => {
    const updated = destinations.map((dest) =>
      dest.id === id ? { ...dest, ...updates } : dest
    );
    saveDestinations(updated);
  };

  const handleDeleteDestination = (id: string) => {
    const filtered = destinations.filter((dest) => dest.id !== id);
    saveDestinations(filtered);
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.userId === user?.email &&
      (dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Mis Destinos</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar destinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Destino
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onUpdate={handleUpdateDestination}
              onDelete={handleDeleteDestination}
            />
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Nuevo Destino</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  value={newDestination.title}
                  onChange={(e) =>
                    setNewDestination({ ...newDestination, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="URL de la imagen"
                  value={newDestination.imageUrl}
                  onChange={(e) =>
                    setNewDestination({
                      ...newDestination,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  placeholder="Descripción"
                  value={newDestination.description}
                  onChange={(e) =>
                    setNewDestination({
                      ...newDestination,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddDestination}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};