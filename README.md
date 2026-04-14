# HeapWise AI - DUHA Orchestrator

**Dynamic User-Aware Heap Orchestrator (DUHA)** - A Chrome Extension that simulates an on-device AI resource manager for Android phones.

## 🎯 Overview

This extension implements the complete DUHA algorithm designed specifically for mid-range Android devices like the **Redmi 11T**. It demonstrates intelligent memory management for running large language models alongside other system applications.

## 🏗️ Algorithm Phases

### Phase 0: Live Device & User Context Profiler
- Simulates real-time Android memory reading (Total RAM = 8.0 GB fixed)
- Shows memory used by photos, docs, Gallery AI, voice assistant, cached files
- Starts at 3.9 GB and fluctuates live every 4 seconds by ±0.3 GB
- Calculates Safe Budget = Total - Used - 1.9 GB buffer
- Displays a beautiful live memory gauge with colored bars

### Phase 1: Richardson Exploration
- Offers three candidate models:
  - **Qwen2.5-14B** - Large language model
  - **Qwen2.5-7B** - Balanced performance
  - **Phi-4-mini 3.8B** - Lightweight efficient model

### Phase 2: Adaptive Compression Engine
- Dynamically compresses selected models based on current Safe Budget:
  - 14B → Q3_K_M compressed version that fits exactly into Safe Budget
  - 7B → Already fits (Q4_K_M)
  - Phi-4-mini → Native fit
- Shows compression progress and final size

### Phase 3: Sorites Pruning
- Creates a "heap" of 3–4 indistinguishable models
- Philosophical core: no single best, any in the heap is good enough
- Displays the heap as clickable cards

### Phase 4: Heap-Converged Deployment
- "Launch Any From Heap" button
- Success message: "Model launched with safe resource lock. Co-existing peacefully with your photos, docs and other AI tools."

## 📦 Installation

### Step 1: Download/Clone the Extension
Download or clone this extension folder to your computer.

### Step 2: Open Chrome Extensions Page
1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Or go to Menu → More Tools → Extensions

### Step 3: Enable Developer Mode
- Toggle the **"Developer mode"** switch in the top-right corner

### Step 4: Load Unpacked Extension
1. Click **"Load unpacked"** button
2. Select the folder containing this extension
3. The extension icon should appear in your toolbar

### Step 5: Use the Extension
- Click the HeapWise AI icon in your Chrome toolbar
- Watch the live memory gauge update every 4 seconds
- Click on any model to start the compression process
- Launch your model from the heap!

## 🎨 UI Features

- **Dark Modern Design** - Material 3 style with teal accent color
- **Live Memory Gauge** - Real-time updating visualization
- **Responsive Layout** - Clean and beautiful popup interface
- **Interactive Cards** - Hover effects and smooth transitions
- **Progress Indicators** - Visual feedback for all operations

## 📍 Location Context

This extension is themed for:
- **Device**: Redmi 11T
- **Location**: Srinagar
- **RAM**: 8.0 GB

## 🔧 Technical Details

- **Manifest Version**: V3 (latest Chrome extension standard)
- **Background**: Service worker architecture
- **UI**: Pure HTML + Tailwind CSS via CDN + Vanilla JavaScript
- **No External Dependencies**: Everything runs locally
- **Icons**: Programmatically generated PNG files

## 📁 File Structure

```
HeapWise-DUHA/
├── manifest.json      # Extension configuration (Manifest V3)
├── popup.html         # Main popup UI
├── popup.js           # DUHA algorithm implementation
├── background.js      # Service worker
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
└── README.md          # This file
```

## 🧠 Algorithm Inspiration

The DUHA algorithm combines two philosophical concepts:

1. **Richardson Extrapolation** - Exploring multiple candidate solutions
2. **Sorites Paradox** - The heap paradox: when does a collection become a heap?

This creates a unique approach where multiple "good enough" models coexist in a heap, and any can be deployed safely within the device's memory constraints.

## 📝 Version

**DUHA v1.0** - Built from Sorites + Richardson algorithm

## 📄 License

This is a demonstration/simulation project for educational purposes.

---

*Made with ❤️ for AI enthusiasts exploring on-device machine learning*

---

## 🚀 How to Publish on Chrome Web Store

### Prerequisites
1. **Google Developer Account**: You need a one-time $5 USD registration fee
2. **Chrome Web Store Developer Dashboard**: https://chrome.google.com/webstore/devconsole

### Step-by-Step Publishing Guide

#### Step 1: Prepare Your Extension for Publishing
1. **Test Thoroughly**: Ensure the extension works perfectly in development mode
2. **Update manifest.json**: Add required publishing fields:
   ```json
   {
     "name": "HeapWise AI - DUHA Orchestrator",
     "version": "1.0.0",
     "description": "Dynamic User-Aware Heap Orchestrator for Android AI resource management simulation",
     ...
   }
   ```
3. **Create Screenshots**: Take 3-5 screenshots (1280x800 or 640x400 px) showing:
   - Main popup with memory gauge
   - Model selection screen
   - Compression progress
   - Heap deployment view
4. **Create Promotional Images** (optional but recommended):
   - Small promo: 440x280 px
   - Large promo: 920x680 px
   - Marquee: 1400x560 px

#### Step 2: Create a ZIP File
1. Remove any development-only files (like `index.html` if not needed)
2. Zip all extension files:
   ```bash
   cd /workspace
   zip -r heapwise-duha-v1.zip manifest.json popup.html popup.js background.js icon*.png README.md
   ```
3. Keep the ZIP file under 32MB (limit for Chrome Web Store)

#### Step 3: Register as a Chrome Web Store Developer
1. Go to https://chrome.google.com/webstore/devconsole
2. Click "Register" and pay the one-time $5 fee
3. Complete your developer profile

#### Step 4: Create a New Item
1. In the Developer Dashboard, click **"New Item"**
2. Upload your ZIP file (`heapwise-duha-v1.zip`)
3. Fill in the store listing details:

   **Basic Information:**
   - **Name**: HeapWise AI - DUHA Orchestrator
   - **Description**: A smart AI resource manager simulator for Android devices. Implements the Dynamic User-Aware Heap Orchestrator (DUHA) algorithm with live memory profiling, adaptive model compression, and philosophical heap-based deployment. Perfect for Redmi 11T and similar mid-range devices.
   - **Category**: Productivity or Developer Tools
   - **Language**: English

   **Detailed Description** (max 4000 chars):
   ```
   🧠 HeapWise AI brings the revolutionary DUHA algorithm to your browser!
   
   KEY FEATURES:
   • Live Memory Profiling - Watch real-time RAM usage simulation (8GB total)
   • Adaptive Compression - Dynamically compress AI models to fit available memory
   • Sorites Heap Philosophy - Multiple "good enough" models coexist peacefully
   • Beautiful Dark UI - Material 3 design with teal accents
   
   HOW IT WORKS:
   1. Phase 0: Monitors your device's memory (simulated for Redmi 11T)
   2. Phase 1: Choose from Qwen2.5-14B, Qwen2.5-7B, or Phi-4-mini
   3. Phase 2: Automatic compression based on safe memory budget
   4. Phase 3: Creates a philosophical "heap" of equivalent models
   4. Phase 4: Deploy any model with guaranteed safe resource allocation
   
   PERFECT FOR:
   - AI researchers and enthusiasts
   - Android developers optimizing ML models
   - Anyone curious about on-device AI resource management
   
   Note: This is a simulation/educational tool demonstrating the DUHA algorithm.
   ```

#### Step 5: Upload Visual Assets
1. **Screenshots**: Upload 3-5 screenshots (required)
2. **Promo Images**: Upload small/large promo and marquee (optional)
3. **Icon**: Already included (128x128 px)

#### Step 6: Privacy & Security
1. **Privacy Policy**: Since this extension doesn't collect user data:
   - Select "No, I don't collect user data"
   - Or create a simple privacy policy stating no data collection
2. **Permissions Disclosure**: The extension only uses minimal permissions (activeTab if needed)

#### Step 7: Content Rating
1. Complete the content rating questionnaire
2. This extension should rate as "Everyone" (no mature content)

#### Step 8: Submit for Review
1. Review all information for accuracy
2. Click **"Submit for Review"**
3. Wait for Google's review process (typically 1-3 business days)

#### Step 9: Post-Approval
1. Once approved, your extension goes live automatically
2. Share your store link: `https://chrome.google.com/webstore/detail/[extension-id]`
3. Monitor reviews and update as needed

### Important Publishing Tips

✅ **Do's:**
- Be honest about what the extension does (it's a simulation)
- Use clear, professional screenshots
- Write a compelling but accurate description
- Test thoroughly before submitting
- Respond to user reviews promptly

❌ **Don'ts:**
- Don't mislead users about functionality
- Don't use copyrighted material without permission
- Don't submit multiple times with minor changes
- Don't ignore Google's developer policies

### Common Rejection Reasons & How to Avoid

1. **Misleading Description**: Clearly state it's a simulation
2. **Poor Quality Screenshots**: Use high-resolution, clear images
3. **Functionality Issues**: Test extensively before submission
4. **Privacy Concerns**: Be transparent about data handling (none in this case)
5. **Duplicate Content**: Ensure your extension offers unique value

### Updating Your Extension

After publishing:
1. Make changes to your code
2. Increment version number in `manifest.json` (e.g., "1.0.1")
3. Create new ZIP file
4. Upload as update in Developer Dashboard
5. Submit for review again

### Monetization Options (Optional)

- **Free**: Recommended for educational tools
- **Paid**: Set a price (rarely successful for extensions)
- **In-app purchases**: Not applicable for this type of extension

### Marketing Your Extension

1. Share on social media (Twitter, LinkedIn, Reddit r/chromeextensions)
2. Write a blog post about the DUHA algorithm
3. Share on GitHub with a link to the store
4. Engage with AI/ML communities

---

**Need Help?**
- Chrome Web Store Documentation: https://developer.chrome.com/docs/webstore/
- Developer Policies: https://chrome.google.com/webstore/program-policies
- Support Forum: https://groups.google.com/a/chromium.org/g/chromium-extensions

Good luck with your publication! 🎉
