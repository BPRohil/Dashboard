# BAPENDA Ticker Messages Configuration System

This document explains how to manage and configure the BAPENDA ticker messages in the BAPENDA Dashboard.

## Files Overview

- **`src/js/marquee-config.js`** - Main configuration file for all marquee messages
- **`src/js/dashboard.js`** - Main dashboard script that uses the marquee config
- **`index.html`** - HTML file that loads both scripts

## How to Manage Marquee Messages

### 1. Edit Messages in `src/js/marquee-config.js`

Open `src/js/marquee-config.js` and modify the message sets:

```javascript
const BAPENDA_TICKER_MESSAGES = {
    financial: [
        {
            icon: "",
            text: 'Your financial ticker content here',
            category: "revenue"
        }
    ],
    announcements: [
        {
            icon: "fas fa-bullhorn",
            text: "Your announcement here",
            category: "info"
        }
    ]
};
```

### 2. Switch Between Message Sets

Change the `activeSet` in `MARQUEE_SETTINGS`:

```javascript
const BAPENDA_TICKER_SETTINGS = {
    activeSet: 'financial', // or 'announcements', 'custom'
    // ... other settings
};
```

### Settings

The `BAPENDA_TICKER_SETTINGS` object controls:
- `activeSet`: Which message set to display ('financial', 'announcements', 'custom')
- `animationDuration`: Base animation duration (used when fixedSpeed is false)
- `animationDirection`: Direction of animation ('left' or 'right')
- `fixedSpeed`: Keep consistent speed regardless of message count (true/false)
- `baseSpeed`: Base speed in pixels per second (used when fixedSpeed is true)
- `showIcons`: Whether to display icons with messages
- `separator`: Text separator between messages

### 3. Add New Messages

#### Option A: Edit the config file directly
```javascript
// Add to existing set
BAPENDA_TICKER_MESSAGES.financial.push({
    icon: "",
    text: 'New ticker message',
    category: "new"
});
```

#### Option B: Use JavaScript console (for testing)
```javascript
// Add message dynamically
BapendaTickerManager.addMessage('financial', {
    icon: "fas fa-chart-line",
    text: "New revenue data",
    category: "revenue"
});

// Reload the marquee
dashboard.reloadMarqueeConfig();
```

### 4. Remove Messages

#### Option A: Edit the config file
Simply delete or comment out the message object from the array.

#### Option B: Use JavaScript console
```javascript
// Remove message by index (0-based)
BapendaTickerManager.removeMessage('financial', 0);

// Reload the marquee
dashboard.reloadMarqueeConfig();
```

### 5. Switch Message Sets Dynamically

```javascript
// Switch to announcements
dashboard.switchMarqueeSet('announcements');

// Switch back to financial
dashboard.switchMarqueeSet('financial');

// Get available sets
console.log(dashboard.getAvailableMarqueeSets());
```

### 6. Control Animation Speed

To maintain consistent speed regardless of message count:

```javascript
// Enable fixed speed mode (default)
BAPENDA_TICKER_SETTINGS.fixedSpeed = true;
BAPENDA_TICKER_SETTINGS.baseSpeed = 100; // pixels per second

// Disable fixed speed (uses fixed duration)
BAPENDA_TICKER_SETTINGS.fixedSpeed = false;
BAPENDA_TICKER_SETTINGS.animationDuration = '30s';
```

## Message Format

### Basic Message Structure
```javascript
{
    icon: "font-awesome-class",     // Font Awesome icon class (optional)
    text: "Your message text",      // Plain text or HTML content
    category: "optional-category"   // For organizing messages
}
```

### Financial Ticker Format
```javascript
{
    icon: "",
    text: '<span class="inline-flex items-center space-x-2"><span class="text-white font-bold">SYMBOL</span><span class="text-white font-semibold">Value</span><span class="text-green-400 font-medium">Change</span><span class="text-green-400 font-medium">(Percentage)</span></span>',
    category: "revenue"
}
```

### Traditional Announcement Format
```javascript
{
    icon: "fas fa-bullhorn",
    text: "Your announcement message here",
    category: "announcement"
}
```

## CSS Classes for Styling

- **Text Colors**: `text-white`, `text-green-400`, `text-red-400`
- **Font Weights**: `font-bold`, `font-semibold`, `font-medium`
- **Layout**: `inline-flex`, `items-center`, `space-x-2`

## Tips

1. **Test Changes**: After editing `src/js/marquee-config.js`, refresh the page to see changes
2. **Backup**: Keep a backup of your config before making major changes
3. **HTML Content**: You can use HTML in the `text` field for rich formatting
4. **Icons**: Use Font Awesome classes for icons, or leave empty for no icon
5. **Categories**: Use categories to organize and filter messages if needed

## Troubleshooting

- **Messages not showing**: Check browser console for errors
- **Config not loading**: Ensure `src/js/marquee-config.js` is loaded before `src/js/dashboard.js`
- **Styling issues**: Verify Tailwind CSS classes are correct
- **JavaScript errors**: Check that the config file syntax is valid JSON

## Example: Adding a New Revenue Item

```javascript
// In src/js/marquee-config.js, add to the financial array:
{
    icon: "",
    text: '<span class="inline-flex items-center space-x-2"><span class="text-white font-bold">PAJAK</span><span class="text-white font-semibold">Rp1.234.56M</span><span class="text-green-400 font-medium">+12.34</span><span class="text-green-400 font-medium">(+2.1%)</span></span>',
    category: "revenue"
}
```

Save the file and refresh the page to see the new ticker item.