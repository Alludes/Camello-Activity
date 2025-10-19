export const vehicleObserver = (() => {
  const observers = [];

  function subscribe(fn) {
    observers.push(fn);
  }

  function notify(data) {
    observers.forEach(fn => fn(data));
  }

  return { subscribe, notify };
})();

