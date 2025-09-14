"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface WikipediaData {
  extract: string;
  thumbnail?: string;
  fullurl?: string;
}

export default function DestinationPage() {
  const params = useParams();
  const router = useRouter();
  const destination = params.destination as string;
  const [data, setData] = useState<WikipediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (destination) {
      const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get<WikipediaData>(`/api/wikipedia?query=${decodeURIComponent(destination)}`);
          setData(response.data);
        } catch (err) {
          setError('Failed to fetch data from Wikipedia.');
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [destination]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-maroon-light to-navy-dark rounded-2xl shadow-lg p-8 text-white">
          <button onClick={() => router.back()} className="btn secondary mb-4">← Go Back</button>
          <h1 className="text-4xl font-bold mb-4 capitalize text-gold">
            {destination.replace(/%20/g, ' ')}
          </h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {data && (
            <div>
              {data.thumbnail && (
                <img src={data.thumbnail} alt={destination} className="w-full h-auto object-cover rounded-lg mb-4 border-4 border-gold" />
              )}
              <div className="prose prose-invert max-w-none">
                <p>{data.extract}</p>
              </div>
              {data.fullurl && (
                <div className="flex gap-4 mt-4">
                  <a href={data.fullurl} target="_blank" rel="noopener noreferrer">
                    <button className="btn primary">Read more on Wikipedia</button>
                  </a>
                  <button className="btn secondary">Plan your itinerary to this place</button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
