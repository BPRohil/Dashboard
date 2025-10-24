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
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">Realisasi Pendapatan Asli Daerah (1 Januari 2025 s/d 22 Oktober 2025)</span></span>',
            category: "revenue",
        },
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">Total Pendapatan Pajak: 112,52 Miliar</span></span>',
            category: "revenue",
        },
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">PBB-P2: 9,5 Miliar | BPHTB: 5,7 Miliar</span></span>',
            category: "revenue",
        },
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">PBJT Makan atau Minum: 4,1 Miliar | PBJT Tenaga Listrik: 35,12 Miliar | PBJT Perhotelan: 1,4 Miliar | PBJT Parkir: 664 Juta | PBJT Kesenian dan Hiburan: 1,08 Miliar | Reklame: 1,03 Miliar | Air Tanah: 906 Juta | Sarang Burung Walet: 50 Juta | MBLB: 2,39 Miliar</span></span>',
            category: "revenue",
        },
        {
            icon: "",
            text: '<span class="inline-flex items-center space-x-2"><span class="text-slate-900 font-bold">Opsen PKB: 27,10 Miliar | Opsen BBNKB: 23,32 Miliar</span></span>',
            category: "revenue",
        },
        // {
        //     icon: "",
        //     text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">Hubungi Kami di: bapenda.rohil@gmail.com | Facebook: Bapenda Rohil | Instagram: bapenda_rohil</span></span>',
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
    baseSpeed: 60, // Base speed in pixels per second for optimal readability
    minDuration: 20, // Minimum animation duration in seconds
    maxDuration: 120, // Maximum animation duration in seconds

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

    /**
     * Calculate optimal animation duration based on content length
     * This ensures consistent readability regardless of text volume
     */
    calculateAnimationDuration() {
        const messages = this.getActiveMessages()
        if (!messages || messages.length === 0) {
            return `${BAPENDA_TICKER_SETTINGS.minDuration}s`
        }

        // Calculate total content length (including HTML tags for accurate measurement)
        const totalLength = messages.reduce((total, msg) => {
            // Create a temporary element to measure actual text content
            const tempDiv = document.createElement("div")
            tempDiv.innerHTML = msg.text
            const textContent = tempDiv.textContent || tempDiv.innerText || ""
            return total + textContent.length
        }, 0)

        // Add spacing between messages (8 characters per separator)
        const totalWithSpacing = totalLength + messages.length * 16 // 8 chars per side spacing

        // Calculate duration based on reading speed
        // Using baseSpeed pixels per second for optimal readability
        const settings = BAPENDA_TICKER_SETTINGS
        let speedMultiplier = 1

        // Adjust speed based on speed setting
        switch (settings.speed) {
            case "slow":
                speedMultiplier = 0.6
                break
            case "fast":
                speedMultiplier = 1.4
                break
            default: // 'normal'
                speedMultiplier = 1
        }

        // Estimate character width (approximately 8-10 pixels per character for most fonts)
        const avgCharWidth = 9
        const estimatedWidth = totalWithSpacing * avgCharWidth

        // Calculate duration: distance / speed
        const baseDuration =
            estimatedWidth / settings.baseSpeed / speedMultiplier

        // Ensure duration is within reasonable bounds
        const duration = Math.max(
            settings.minDuration,
            Math.min(settings.maxDuration, baseDuration)
        )

        return `${Math.round(duration)}s`
    },

    /**
     * Update marquee speed setting and recalculate duration
     * @param {string} speed - 'slow', 'normal', or 'fast'
     */
    setSpeed(speed) {
        if (["slow", "normal", "fast"].includes(speed)) {
            BAPENDA_TICKER_SETTINGS.speed = speed
            // Trigger recalculation if dashboard is available
            if (typeof window !== "undefined" && window.dashboard) {
                window.dashboard.updateMarqueeContent()
            }
            return true
        }
        return false
    },

    /**
     * Get current speed setting
     */
    getSpeed() {
        return BAPENDA_TICKER_SETTINGS.speed
    },

    /**
     * Get current calculated duration for debugging
     */
    getCurrentDuration() {
        return this.calculateAnimationDuration()
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
