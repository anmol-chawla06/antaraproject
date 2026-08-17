# System Architecture & Workflow: Antara Platform

This document details the end-to-end data flow and interaction lifecycle across the Antara web frontend, static data layer, and Telegram bot assistant.

---

## High-Level Architecture Flow

```mermaid
flowchart TD
    subgraph DataLayer [Local Static Data Layer]
        DB[(festivals_database.json)]
    end

    subgraph Client [Antara Web Frontend - index.html]
        Init[Client Boot & Fetch] --> Calendar[Render Temporal Grid]
        Init --> Carousel[Initialize Image Carousel]
        UserClick[User Clicks Month Node] --> Filter{Events in Month?}
        Filter -- 0 Events --> EmptyState[Display Empty State]
        Filter -- 1 Event --> RenderSingle[Render Detail Panel]
        Filter -- 2+ Events --> RenderPicker[Render Alignment Picker]
        RenderPicker -- User Selects Event --> RenderSingle
        RenderSingle --> HeroImg[Mount Regional Hero Image]
        RenderSingle --> Meta[Populate Location & Timing]
        RenderSingle --> Sections[Render History, Highlights & Cuisine]
        RenderSingle --> DeepLinkBtn[Generate Telegram Action Button]
    end

    subgraph BotAssistant [Telegram Travel Assistant - bot.js]
        DeepLinkBtn -- Click (https://t.me/AntaraV1bot?start=fest_id) --> TGClient[Telegram Client / Web App]
        TGClient --> StartCmd[/start fest_id]
        StartCmd --> BotRoute[Route & Lookup in Local DB]
        BotRoute --> ItineraryMsg[Send Instant Formatted Itinerary]
        ItineraryMsg --> UserActions[Inline Keyboard: View Route / Confirm Booking]
    end

    DB -.->|HTTP Fetch| Init
    DB -.->|fs.readFileSync| BotRoute
```

---

## Detailed Step-by-Step Data Flow

### 1. Data Ingestion & Client Initialization
1. **Frontend Boot**: When `index.html` loads, the asynchronous `init()` function invokes the native browser `fetch('festivals_database.json')`.
2. **Calendar Grid Population**: 
   - The script creates 12 temporal nodes (January through December).
   - Each node scans the loaded array to identify if any festivals match its month code (`monthData.code`).
   - If one or more festivals exist, a distinct marker (`✦`) is injected into the node.
3. **Carousel Activation**:
   - High-resolution placeholder image paths (`image_placeholder`) are extracted from all entries.
   - An automated timer cycle transitions between regional images using smooth CSS opacity crossfades every 5 seconds.

---

### 2. User Interaction on the Split-Screen Temporal Grid
1. **Node Selection**: The traveler clicks on a month node (e.g., `JUN` or `AUG`).
2. **State Transition**:
   - The selected month node receives the `.active` class, activating a subtle gold border and illumination glow.
   - The right-hand detail container triggers a CSS exit transition (`opacity: 0; transform: translateY(20px)`).

---

### 3. Dynamic Rendering in the Heritage Details Panel
1. **Single Festival Scenario**:
   - When a month contains exactly one event (e.g., June $\rightarrow$ Ambubachi Mela), `renderDetails(festival)` executes immediately.
2. **Multi-Festival Scenario**:
   - When multiple festivals occur in a selected month (e.g., August $\rightarrow$ Bastar Dussehra & Janmashtami), an **Event Alignment Picker** is presented.
   - Upon clicking a specific option, `triggerFestivalLoad(festId)` smoothly loads that festival's record.
3. **Component Mounting**:
   - **Featured Hero Image**: Displays the specific festival's image (`.festival-hero-img-container`) with a custom fallback error handler (`onerror`) to prevent layout breakage if an asset is missing.
   - **Metadata Badges**: Renders verified location coordinates, seasonal timing, and regional dialects (`✦`, `◈`, `❖`).
   - **Historical Overview**: Injects the verified historical record and background narrative.
   - **Cultural Highlights**: Details ritual practices, traditional instruments, dances, and local community customs.
   - **Culinary Heritage**: Injects indigenous dishes and regional sweets (with smart fallbacks if unlisted).

---

### 4. Deep-Link Generation & Telegram Bot Execution
1. **Dynamic Deep-Link Construction**:
   - The platform creates a direct URL attached to the **◈ Plan a trip** button:
     $$\text{Target URL} = \text{https://t.me/AntaraV1bot?start=} + \text{festival.id}$$
   - Configured with `target="_blank"` and `rel="noopener noreferrer"` for secure external tab navigation.
2. **Telegram Route Interception**:
   - When the user launches the link in Telegram, the bot intercepts the `/start <festival_id>` payload.
   - `bot.js` performs an exact lookup on its preloaded memory dataset (`festivals_database.json`).
3. **Instant Automated Response**:
   - Without hitting external AI models or third-party APIs, the bot immediately outputs a structured 2-day heritage itinerary, transit guide, and interactive inline action buttons (e.g., simulated bookings, schedule breakdowns).

---

## Performance & Resilience Characteristics

- **Zero Third-Party API Latency**: Because all textual and routing metadata is contained in `festivals_database.json`, responses on both the web UI and Telegram bot execute in $< 50\text{ms}$.
- **Graceful Asset Fallbacks**: Image load failures in the frontend automatically hide the hero container without displacing surrounding typography or buttons.
- **Hardware-Accelerated UI**: Animations leverage CSS transforms and opacity to maintain 60 FPS transitions across mobile and desktop displays.
