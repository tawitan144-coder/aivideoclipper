import React, { useState } from 'react';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [duration, setDuration] = useState('15');
  const [email, setEmail] = useState('');

  const handleProcess = (e) => {
    e.preventDefault();
    alert(`Memproses video ${youtubeUrl} dengan durasi ${duration} detik...`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="max-w-4xl mx-auto text-center py-10">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4">AI Video Clipper & Generator</h1>
        <p className="text-gray-300">Ubah 1 Video Panjang YouTube Menjadi Ratusan Klip Siap Viral Otomatis!</p>
      </header>

      <main className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <form onSubmit={handleProcess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Anda (Login Google)</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="nama@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link YouTube Video</label>
            <input 
              type="text" 
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pilih Durasi Klip</label>
            <select 
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 Detik</option>
              <option value="25">25 Detik</option>
              <option value="35">35 Detik</option>
              <option value="60">60 Detik (1 Menit)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 font-bold p-3 rounded transition duration-200"
          >
            Mulai Generate AI Clipper
          </button>
        </form>

        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400 text-center">
          <p>Pembayaran Transfer Resmi BCA:</p>
          <p className="font-bold text-white text-lg">753-609-2721 (a.n THANTHAWI)</p>
          <p className="text-red-400 text-xs mt-1">*Dana yang sudah ditransfer/top-up kredit bersifat Non-Refund.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
