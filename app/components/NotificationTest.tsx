'use client';

import { useEffect, useState } from 'react';

export default function NotificationTest() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if the browser supports Service Workers and Notifications
    if ('serviceWorker' in navigator && 'Notification' in window) {
      setIsSupported(true);
      // Register the service worker so we can show notifications
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('Service Worker registered!', reg);
      });
    }
  }, []);

  const handleShowNotification = async () => {
    if (!isSupported) return;

    // Ask the user for permission to send notifications
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // If allowed, get the active service worker registration
      const registration = await navigator.serviceWorker.ready;
      
      // Show the notification
      registration.showNotification('Hello from rentat hub!', {
        body: 'Hi, this is a notification.',
        icon: '/next.svg',
        tag: 'vibration-sample', // Give it a tag so we don't get duplicates
      });
    } else {
      alert('Permission denied for notifications');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Notification API Test</h2>
      <p className="text-slate-400 mb-6 text-center">
        Click the button below to test the <code>showNotification</code> API.
      </p>
      <button
        onClick={handleShowNotification}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20"
      >
        Trigger Notification
      </button>
      {!isSupported && (
        <p className="mt-4 text-red-400 text-sm">Your browser does not support Notifications.</p>
      )}
    </div>
  );
}
