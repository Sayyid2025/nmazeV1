// HeapWise AI - DUHA Orchestrator
// Dynamic User-Aware Heap Orchestrator Implementation

class DUHAOrchestrator {
  constructor() {
    // Phase 0: Constants
    this.TOTAL_RAM = 8.0; // GB (fixed for Redmi 11T)
    this.OS_BUFFER = 1.9; // GB (always reserved for OS + other apps)
    this.BASE_USED = 3.9; // GB (base memory used by system apps)
    this.FLUCTUATION_RANGE = 0.3; // GB (± fluctuation every 4 seconds)
    
    // Model configurations
    this.models = {
      qwen14b: {
        name: 'Qwen2.5-14B',
        originalSize: 8.2,
        compressedSize: null, // Will be calculated based on safe budget
        quantization: 'Q3_K_M',
        description: 'Large language model with aggressive compression'
      },
      qwen7b: {
        name: 'Qwen2.5-7B',
        originalSize: 4.5,
        compressedSize: 4.5, // Already fits with Q4_K_M
        quantization: 'Q4_K_M',
        description: 'Balanced performance model'
      },
      phi4mini: {
        name: 'Phi-4-mini 3.8B',
        originalSize: 2.4,
        compressedSize: 2.4, // Native fit
        quantization: 'Native',
        description: 'Lightweight efficient model'
      }
    };
    
    // State
    this.currentUsedMemory = this.BASE_USED;
    this.safeBudget = 0;
    this.selectedModel = null;
    this.heapModels = [];
    this.updateInterval = null;
    
    // DOM Elements
    this.elements = {};
  }
  
  init() {
    this.cacheElements();
    this.startLiveUpdates();
    this.attachEventListeners();
    this.updateMemoryDisplay();
  }
  
  cacheElements() {
    this.elements = {
      usedBar: document.getElementById('usedBar'),
      bufferBar: document.getElementById('bufferBar'),
      safeBar: document.getElementById('safeBar'),
      usedMemory: document.getElementById('usedMemory'),
      availableMemory: document.getElementById('availableMemory'),
      safeBudgetDisplay: document.getElementById('safeBudgetDisplay'),
      refreshBtn: document.getElementById('refreshBtn'),
      modelBtns: document.querySelectorAll('.model-btn'),
      compressionSection: document.getElementById('compressionSection'),
      compressionModelName: document.getElementById('compressionModelName'),
      compressionStatus: document.getElementById('compressionStatus'),
      compressionBar: document.getElementById('compressionBar'),
      originalSize: document.getElementById('originalSize'),
      compressedSize: document.getElementById('compressedSize'),
      targetBudget: document.getElementById('targetBudget'),
      soritesSection: document.getElementById('soritesSection'),
      heapContainer: document.getElementById('heapContainer'),
      deploymentSection: document.getElementById('deploymentSection'),
      launchBtn: document.getElementById('launchBtn'),
      successMessage: document.getElementById('successMessage')
    };
  }
  
  startLiveUpdates() {
    // Initial update
    this.updateMemoryState();
    
    // Update every 4 seconds with realistic fluctuation
    this.updateInterval = setInterval(() => {
      this.updateMemoryState();
    }, 4000);
  }
  
  updateMemoryState() {
    // Simulate realistic memory fluctuation
    const randomFluctuation = (Math.random() - 0.5) * 2 * this.FLUCTUATION_RANGE;
    let newUsed = this.BASE_USED + randomFluctuation;
    
    // Clamp between reasonable bounds (3.6 to 4.2 GB)
    newUsed = Math.max(3.6, Math.min(4.2, newUsed));
    this.currentUsedMemory = parseFloat(newUsed.toFixed(2));
    
    // Calculate safe budget
    this.safeBudget = this.TOTAL_RAM - this.currentUsedMemory - this.OS_BUFFER;
    this.safeBudget = Math.max(0, parseFloat(this.safeBudget.toFixed(2)));
    
    this.updateMemoryDisplay();
  }
  
  updateMemoryDisplay() {
    const usedPercent = (this.currentUsedMemory / this.TOTAL_RAM) * 100;
    const bufferPercent = (this.OS_BUFFER / this.TOTAL_RAM) * 100;
    const safePercent = (this.safeBudget / this.TOTAL_RAM) * 100;
    
    this.elements.usedBar.style.width = `${usedPercent}%`;
    this.elements.bufferBar.style.width = `${bufferPercent}%`;
    this.elements.safeBar.style.width = `${safePercent}%`;
    
    this.elements.usedMemory.textContent = `${this.currentUsedMemory.toFixed(2)} GB`;
    this.elements.availableMemory.textContent = `${this.safeBudget.toFixed(2)} GB`;
    this.elements.safeBudgetDisplay.textContent = `${this.safeBudget.toFixed(2)} GB`;
  }
  
  attachEventListeners() {
    // Refresh button
    this.elements.refreshBtn.addEventListener('click', () => {
      this.simulateRefresh();
    });
    
    // Model selection buttons
    this.elements.modelBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modelKey = e.currentTarget.dataset.model;
        this.selectModel(modelKey);
      });
    });
    
    // Launch button
    this.elements.launchBtn.addEventListener('click', () => {
      this.launchModel();
    });
  }
  
  simulateRefresh() {
    this.elements.refreshBtn.textContent = '🔄 Refreshing...';
    this.elements.refreshBtn.disabled = true;
    
    setTimeout(() => {
      this.updateMemoryState();
      this.elements.refreshBtn.textContent = '✅ Refreshed!';
      
      setTimeout(() => {
        this.elements.refreshBtn.textContent = '🔄 Refresh Phone State';
        this.elements.refreshBtn.disabled = false;
      }, 1000);
    }, 500);
  }
  
  selectModel(modelKey) {
    this.selectedModel = this.models[modelKey];
    
    // Highlight selected model
    this.elements.modelBtns.forEach(btn => {
      btn.classList.remove('border-teal-500', 'bg-slate-700');
      btn.classList.add('border-slate-600', 'bg-slate-900/50');
    });
    
    event.currentTarget.classList.remove('border-slate-600', 'bg-slate-900/50');
    event.currentTarget.classList.add('border-teal-500', 'bg-slate-700');
    
    // Start Phase 2: Adaptive Compression
    this.startCompression(modelKey);
  }
  
  async startCompression(modelKey) {
    const model = this.models[modelKey];
    
    // Show compression section
    this.elements.compressionSection.classList.remove('hidden');
    this.elements.soritesSection.classList.add('hidden');
    this.elements.deploymentSection.classList.add('hidden');
    this.elements.successMessage.classList.add('hidden');
    
    // Set initial values
    this.elements.compressionModelName.textContent = model.name;
    this.elements.compressionStatus.textContent = 'Analyzing...';
    this.elements.compressionBar.style.width = '0%';
    this.elements.originalSize.textContent = `~${model.originalSize} GB`;
    this.elements.targetBudget.textContent = `${this.safeBudget.toFixed(2)} GB`;
    
    // Calculate compressed size based on safe budget
    if (modelKey === 'qwen14b') {
      // Compress 14B to fit exactly into safe budget
      model.compressedSize = Math.min(this.safeBudget * 0.95, 6.0); // Leave 5% headroom, max 6GB
      this.elements.compressedSize.textContent = `~${model.compressedSize.toFixed(2)} GB (${model.quantization})`;
    } else {
      // 7B and Phi-4-mini already fit
      model.compressedSize = model.originalSize;
      this.elements.compressedSize.textContent = `~${model.compressedSize.toFixed(2)} GB (${model.quantization})`;
    }
    
    // Simulate compression progress
    await this.simulateCompressionProgress();
    
    // Move to Phase 3
    this.createHeap(modelKey);
  }
  
  simulateCompressionProgress() {
    return new Promise(resolve => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          this.elements.compressionStatus.textContent = '✅ Compression Complete';
          resolve();
        } else {
          this.elements.compressionBar.style.width = `${progress}%`;
          
          if (progress < 30) {
            this.elements.compressionStatus.textContent = 'Loading weights...';
          } else if (progress < 60) {
            this.elements.compressionStatus.textContent = 'Applying quantization...';
          } else if (progress < 90) {
            this.elements.compressionStatus.textContent = 'Optimizing for heap...';
          } else {
            this.elements.compressionStatus.textContent = 'Finalizing...';
          }
        }
      }, 200);
    });
  }
  
  createHeap(selectedModelKey) {
    // Phase 3: Sorites Pruning
    // Create a heap of 3-4 indistinguishable models
    this.heapModels = [
      { id: 1, name: this.models[selectedModelKey].name, variant: 'Primary', confidence: 94 },
      { id: 2, name: this.models[selectedModelKey].name, variant: 'Alt-A', confidence: 92 },
      { id: 3, name: this.models[selectedModelKey].name, variant: 'Alt-B', confidence: 91 },
      { id: 4, name: this.models[selectedModelKey].name, variant: 'Lite', confidence: 89 }
    ];
    
    // Show sorites section
    this.elements.soritesSection.classList.remove('hidden');
    this.elements.deploymentSection.classList.remove('hidden');
    
    // Render heap cards
    this.renderHeapCards();
  }
  
  renderHeapCards() {
    this.elements.heapContainer.innerHTML = '';
    
    this.heapModels.forEach((model, index) => {
      const card = document.createElement('div');
      card.className = 'bg-slate-900/50 border border-slate-600 hover:border-teal-500 rounded-lg p-3 cursor-pointer transition-all card-hover';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs bg-teal-600/30 text-teal-400 px-2 py-0.5 rounded">${model.variant}</span>
          <span class="text-xs text-slate-400">${model.confidence}%</span>
        </div>
        <p class="text-sm font-medium text-white truncate">${model.name}</p>
        <p class="text-xs text-slate-500 mt-1">Heap Member #${index + 1}</p>
      `;
      
      card.addEventListener('click', () => {
        this.selectHeapMember(index);
      });
      
      this.elements.heapContainer.appendChild(card);
    });
  }
  
  selectHeapMember(index) {
    // Visual feedback for heap member selection
    const cards = this.elements.heapContainer.children;
    Array.from(cards).forEach((card, i) => {
      if (i === index) {
        card.classList.add('border-teal-500', 'bg-slate-700');
        card.classList.remove('border-slate-600', 'bg-slate-900/50');
      } else {
        card.classList.remove('border-teal-500', 'bg-slate-700');
        card.classList.add('border-slate-600', 'bg-slate-900/50');
      }
    });
  }
  
  launchModel() {
    // Phase 4: Heap-Converged Deployment
    this.elements.launchBtn.disabled = true;
    this.elements.launchBtn.innerHTML = '🚀 Launching...';
    
    setTimeout(() => {
      this.elements.deploymentSection.classList.add('hidden');
      this.elements.successMessage.classList.remove('hidden');
      
      // Reset after showing success
      setTimeout(() => {
        this.elements.launchBtn.disabled = false;
        this.elements.launchBtn.innerHTML = '🚀 Launch Any From Heap';
      }, 2000);
    }, 1500);
  }
  
  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const duha = new DUHAOrchestrator();
  duha.init();
  
  // Cleanup on page unload
  window.addEventListener('unload', () => {
    duha.cleanup();
  });
});
