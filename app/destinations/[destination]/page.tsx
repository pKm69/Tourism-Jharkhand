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
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#800020] text-white">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto shadow-lg p-8 text-white" style={{ background: 'rgba(128, 0, 32, 0.3)', backdropFilter: 'blur(15px)', border: '1px solid #f4d03f', borderRadius: '30px' }}>
          <button onClick={() => router.back()} className="btn secondary mb-4" style={{padding: '16px 32px', fontSize: '16px', borderRadius: '25px', background: 'transparent', border: '2px solid rgba(244, 208, 63, 0.8)', color: '#800020', fontWeight: '600', transition: 'all 0.3s ease'}}>← Go Back</button>
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
                <p style={{color: 'white'}}>{data.extract}</p>
              </div>
              <div className="mt-6">
                <button className="btn primary" style={{padding: '16px 32px', fontSize: '16px', borderRadius: '25px', background: '#f4d03f', color: '#800020', border: '2px solid #f4d03f', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(244, 208, 63, 0.3)'}}>Plan Your Itinerary to This Place</button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
