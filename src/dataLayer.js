// This ensures dataLayer exists
window.dataLayer = window.dataLayer || [];

export function pushToDataLayer(eventData) {
  window.dataLayer.push(eventData);
}
