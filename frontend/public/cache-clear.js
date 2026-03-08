// Clear all caches on load
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
    }
  });
}

// Unregister service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

console.log('%c P07 v2.0.0 - TRUE GOLD THEME LOADED ', 'background: #FFD700; color: #000; font-size: 16px; font-weight: bold; padding: 10px;');
