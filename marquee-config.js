/**
 * BAPENDA Ticker Messages Configuration File
 *
 * This file contains all BAPENDA ticker message configurations for the BAPENDA Dashboard.
 * You can easily modify, add, or remove ticker messages by editing the arrays below.
 *
 * Message Format:
 * - icon: Font Awesome icon class (optional)
 * - text: Display text
 * - value: Numeric value (for financial data)
 * - change: Percentage change (for financial data)
 * - changeType: 'positive' or 'negative' (affects styling)
 *
 * @author BAPENDA Dashboard Team
 * @version 1.0
 */

const BAPENDA_TICKER_MESSAGES = {
    // Financial ticker messages (current active set)
    financial: [
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">Selamat datang di Badan Pendapatan Daerah (BAPENDA) Kabupaten Rokan Hilir</span></span>',
            category: "revenue",
        },
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">Hubungi Kami di: bapenda.rohil@gmail.com | Facebook: Bapenda Rohil | Instagram: bapenda_rohil</span></span>',
            category: "revenue",
        },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">Hubungi Kami di: bapenda.rohil@gmail.com | Facebook: Bapenda Rohil | Instagram: bapenda_rohil</span></span>',
        //     category: "revenue",
        // },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span></span>',
        //     category: "revenue",
        // },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span></span>',
        //     category: "revenue",
        // },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span></span>',
        //     category: "revenue",
        // },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span></span>',
        //     category: "revenue",
        // },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span></span>',
        //     category: "revenue",
        // },
    ],

    // Alternative: Traditional announcement messages
    announcements: [
        {
            icon: "fas fa-bullhorn",
            text: "Selamat datang di Badan Pendapatan Daerah (BAPENDA) Kabupaten Rokan Hilir",
            category: "welcome",
        },
        {
            icon: "fas fa-info-circle",
            text: "Periode pelaporan: Januari - Juni 2025",
            category: "info",
        },
        {
            icon: "fas fa-globe",
            text: "Hubungi Kami di: bapenda.rohil@gmail.com | Facebook: Bapenda Rohil | Instagram: bapenda_rohil",
            category: "contact",
        },
    ],

    // Custom messages (add your own here)
    custom: [
        // Example:
        // {
        //     icon: "fas fa-star",
        //     text: "Your custom message here",
        //     category: "custom"
        // }
    ],
}

// Configuration settings
const BAPENDA_TICKER_SETTINGS = {
    // Which message set to use: 'financial', 'announcements', or 'custom'
    activeSet: "financial",

    // Animation settings
    speed: "normal", // 'slow', 'normal', 'fast'

    // Display settings
    showSeparator: true,
    separatorSymbol: "|",
}

// Helper functions for managing marquee content
const BapendaTickerManager = {
    /**
     * Get the currently active message set
     */
    getActiveMessages() {
        return (
            BAPENDA_TICKER_MESSAGES[BAPENDA_TICKER_SETTINGS.activeSet] ||
            BAPENDA_TICKER_MESSAGES.financial
        )
    },

    /**
     * Add a new message to a specific set
     */
    addMessage(setName, message) {
        if (BAPENDA_TICKER_MESSAGES[setName]) {
            BAPENDA_TICKER_MESSAGES[setName].push(message)
        }
    },

    /**
     * Remove a message by index from a specific set
     */
    removeMessage(setName, index) {
        if (
            BAPENDA_TICKER_MESSAGES[setName] &&
            BAPENDA_TICKER_MESSAGES[setName][index]
        ) {
            BAPENDA_TICKER_MESSAGES[setName].splice(index, 1)
        }
    },

    /**
     * Switch to a different message set
     */
    switchSet(setName) {
        if (BAPENDA_TICKER_MESSAGES[setName]) {
            BAPENDA_TICKER_SETTINGS.activeSet = setName
            return true
        }
        return false
    },

    /**
     * Get all available message sets
     */
    getAvailableSets() {
        return Object.keys(BAPENDA_TICKER_MESSAGES)
    },
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        BAPENDA_TICKER_MESSAGES,
        BAPENDA_TICKER_SETTINGS,
        BapendaTickerManager,
    }
}

// Make available globally for browser use
if (typeof window !== "undefined") {
    window.BAPENDA_TICKER_MESSAGES = BAPENDA_TICKER_MESSAGES
    window.BAPENDA_TICKER_SETTINGS = BAPENDA_TICKER_SETTINGS
    window.BapendaTickerManager = BapendaTickerManager

    // Keep old names for backward compatibility
    window.MARQUEE_CONFIG = BAPENDA_TICKER_MESSAGES
    window.MARQUEE_SETTINGS = BAPENDA_TICKER_SETTINGS
    window.MarqueeManager = BapendaTickerManager
}
