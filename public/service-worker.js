let numBadges = 0;

self.addEventListener('push', async (e) => {
  const data = e.data.json();
  const { title, message, interaction } = data;

  const options = {
    body: message,
    icon: '/icon-512x512.png',
    vibrate: [100, 50, 100],
    actions: [
      { action: 'confirm', title: 'OK' },
      { action: 'close', title: 'Close notification' },
    ],
    requireInteraction: interaction
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
      .catch(err => console.error(err))
  );
});
