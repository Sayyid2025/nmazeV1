// HeapWise AI - DUHA Orchestrator
// Background Service Worker (Manifest V3)

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('HeapWise AI - DUHA Orchestrator installed successfully!');
    
    // Open welcome page or show notification
    chrome.notifications?.create('welcome', {
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'HeapWise AI Installed',
      message: 'DUHA Orchestrator ready for Redmi 11T • Srinagar'
    });
  }
});

// Keep service worker alive for memory monitoring simulation
let memoryMonitorInterval = null;

// Start memory monitoring when extension is activated
chrome.runtime.onStartup.addListener(() => {
  startMemoryMonitoring();
});

function startMemoryMonitoring() {
  if (memoryMonitorInterval) {
    clearInterval(memoryMonitorInterval);
  }
  
  // Simulate background memory monitoring
  memoryMonitorInterval = setInterval(() => {
    // This would normally communicate with native Android APIs
    // For simulation, we just log the activity
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] DUHA: Memory monitoring active`);
  }, 10000);
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMemoryState') {
    // Return simulated memory state
    sendResponse({
      totalRam: 8.0,
      osBuffer: 1.9,
      device: 'Redmi 11T',
      location: 'Srinagar'
    });
  }
  
  if (request.action === 'launchModel') {
    // Handle model launch request
    console.log(`Launching model: ${request.model}`);
    sendResponse({ success: true });
  }
  
  return true; // Keep message channel open for async response
});

// Clean up on service worker shutdown
self.addEventListener('unload', () => {
  if (memoryMonitorInterval) {
    clearInterval(memoryMonitorInterval);
  }
});

console.log('HeapWise AI - DUHA Orchestrator background service loaded');
