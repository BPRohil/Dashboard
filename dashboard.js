/**
 * BAPENDA Dashboard - Optimized Version
 * Enhanced with modern JavaScript practices, better performance, and improved maintainability
 */

class DashboardBapenda {
    // Static configuration
    static CONFIG = {
        SLIDE_INTERVAL: 10000,
        ANIMATION_DURATION: 300,
        RESIZE_DEBOUNCE: 250,
        SWIPE_THRESHOLD: 50,
        LOADING_DELAY: 1500,
    }

    constructor() {
        this.state = {
            currentSlide: 0,
            isPlaying: true,
            isInitialized: false,
        }

        this.elements = {}
        this.timers = {}
        this.touch = { startX: 0, startY: 0, endX: 0, endY: 0 }

        // Load marquee messages from external config file
        this.marqueeMessages = this.loadMarqueeConfig()

        this.init()
    }

    /**
     * Load marquee configuration from external config file
     * Falls back to default messages if config is not available
     */
    loadMarqueeConfig() {
        try {
            // Check if BapendaTickerManager is available (from marquee-config.js)
            if (typeof BapendaTickerManager !== 'undefined') {
                return BapendaTickerManager.getActiveMessages()
            }
            // Fallback to old MarqueeManager for backward compatibility
            if (typeof MarqueeManager !== 'undefined') {
                return MarqueeManager.getActiveMessages()
            }
            
            // Fallback to default financial ticker messages
            return [
                {
                    icon: "",
                    text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">PBB</span><span class="text-black font-semibold">Rp2.854.66M</span><span class="text-red-400 font-medium">-17.38</span><span class="text-green-400 font-medium">(+0.67%)</span></span>',
                },
                {
                    icon: "",
                    text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">BPHTB</span><span class="text-black font-semibold">Rp387.11M</span><span class="text-green-400 font-medium">+6.09</span><span class="text-green-400 font-medium">(+1.31%)</span></span>',
                },
                {
                    icon: "",
                    text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">RETRIB</span><span class="text-black font-semibold">Rp241.46M</span><span class="text-red-400 font-medium">-4.71</span><span class="text-red-400 font-medium">(-3.5%)</span></span>',
                },
                {
                    icon: "",
                    text: '<span class="inline-flex items-center space-x-2"><span class="text-black font-bold">TOTAL</span><span class="text-black font-semibold">Rp3.483.23M</span><span class="text-green-400 font-medium">+16.00</span><span class="text-green-400 font-medium">(+0.46%)</span></span>',
                }
            ]
        } catch (error) {
            console.warn('Failed to load marquee config, using fallback messages:', error)
            return []
        }
    }

    async init() {
        try {
            this.cacheElements()
            this.setupEventListeners()
            await this.initializeComponents()
            this.state.isInitialized = true
        } catch (error) {
            console.error("Dashboard initialization failed:", error)
        }
    }

    cacheElements() {
        this.elements = {
            slides: document.querySelectorAll(".slide"),
            navDots: document.querySelectorAll(".fixed.bottom-8 > div"),
            progressBar: document.getElementById("progressBar"),
            playPauseBtn: document.getElementById("playPauseBtn"),
            fullscreenBtn: document.getElementById("fullscreenBtn"),
            currentTime: document.getElementById("currentTime"),
            loadingScreen: document.getElementById("loadingScreen"),
            marqueeContent: document.querySelector(".marquee-content"),
            mainContainer: document.querySelector(".w-screen"),
        }
    }

    setupEventListeners() {
        // Use event delegation and passive listeners where appropriate
        this.elements.playPauseBtn?.addEventListener("click", () =>
            this.togglePlayPause()
        )
        this.elements.fullscreenBtn?.addEventListener("click", () =>
            this.toggleFullscreen()
        )

        // Passive listeners for better performance
        this.elements.mainContainer?.addEventListener(
            "mouseenter",
            () => this.pauseOnHover(),
            { passive: true }
        )
        this.elements.mainContainer?.addEventListener(
            "mouseleave",
            () => this.resumeOnLeave(),
            { passive: true }
        )

        document.addEventListener("keydown", (e) => this.handleKeyboard(e))
        document.addEventListener(
            "touchstart",
            (e) => this.handleTouchStart(e),
            { passive: true }
        )
        document.addEventListener("touchend", (e) => this.handleTouchEnd(e), {
            passive: true,
        })

        // Debounced resize handler
        window.addEventListener(
            "resize",
            this.debounce(
                () => this.handleResize(),
                DashboardBapenda.CONFIG.RESIZE_DEBOUNCE
            )
        )

        // Fullscreen change handler
        document.addEventListener("fullscreenchange", () =>
            this.updateFullscreenButton()
        )
    }

    async initializeComponents() {
        await Promise.all([
            this.initLoadingScreen(),
            this.initTimeUpdater(),
            this.initMarquee(),
        ])

        // Pastikan elements sudah tersedia sebelum memulai slide
        if (this.elements.slides && this.elements.slides.length > 0) {
            this.showSlide(0)
            // Tambahkan delay untuk memastikan DOM sudah siap
            setTimeout(() => {
                this.startAutoSlide()
            }, 100)
        }
    }

    startAutoSlide() {
        this.clearTimer("autoSlide")

        // Validasi state dan elements sebelum memulai
        if (
            this.state.isPlaying &&
            this.elements.slides &&
            this.elements.slides.length > 0
        ) {
            this.timers.autoSlide = setInterval(() => {
                // Double check sebelum next slide
                if (this.state.isPlaying && this.state.isInitialized) {
                    this.nextSlide()
                }
            }, DashboardBapenda.CONFIG.SLIDE_INTERVAL)
        }
    }

    showSlide(index) {
        if (index < 0 || index >= this.elements.slides.length) return

        // Update slides dengan validasi tambahan
        this.elements.slides.forEach((slide, i) => {
            if (slide) {
                slide.style.opacity = i === index ? "1" : "0"
                slide.classList.toggle("active", i === index)
            }
        })

        // Update navigation dots dengan validasi
        if (this.elements.navDots && this.elements.navDots.length > 0) {
            this.elements.navDots.forEach((dot, i) => {
                if (dot) {
                    dot.className =
                        i === index
                            ? "w-5 h-5 rounded-full bg-blue-600 text-white cursor-pointer transition-all duration-300 scale-110 shadow-lg hover:shadow-xl"
                            : "w-5 h-5 rounded-full bg-gray-300 text-gray-600 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:scale-110 shadow-lg"
                }
            })
        }



        this.updateProgressBar()
    }

    updateProgressBar() {
        if (!this.elements.progressBar) return

        // Force stop any existing animation and reset
        this.elements.progressBar.style.transition = "none"
        this.elements.progressBar.style.width = "0%"

        // Force reflow to ensure the reset is applied
        this.elements.progressBar.offsetHeight

        // Gunakan timeout yang lebih stabil
        setTimeout(() => {
            if (this.state.isPlaying && this.state.isInitialized) {
                this.elements.progressBar.style.transition = `width ${DashboardBapenda.CONFIG.SLIDE_INTERVAL}ms linear`
                this.elements.progressBar.style.width = "100%"
            } else {
                this.elements.progressBar.style.transition = "width 0.1s ease"
                this.elements.progressBar.style.width = "0%"
            }
        }, 100) // Tingkatkan delay untuk stabilitas
    }

    resetAutoSlide() {
        this.clearTimer("autoSlide")
        // Tambahkan delay kecil sebelum restart untuk mencegah konflik
        setTimeout(() => {
            this.startAutoSlide()
        }, 50)
    }

    initLoadingScreen() {
        return new Promise((resolve) => {
            if (document.readyState === "complete") {
                this.hideLoadingScreen()
                resolve()
            } else {
                window.addEventListener("load", () => {
                    setTimeout(() => {
                        this.hideLoadingScreen()
                        resolve()
                    }, DashboardBapenda.CONFIG.LOADING_DELAY)
                })
            }
        })
    }

    hideLoadingScreen() {
        const loadingScreen = this.elements.loadingScreen
        if (loadingScreen) {
            loadingScreen.style.transition = "opacity 0.5s ease"
            loadingScreen.style.opacity = "0"
            setTimeout(() => {
                loadingScreen.style.display = "none"
            }, 500)
        }
    }

    initTimeUpdater() {
        this.updateTime()
        this.timers.timeUpdate = setInterval(() => this.updateTime(), 1000)
    }

    updateTime() {
        if (!this.elements.currentTime) return

        const timeString = new Date().toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        this.elements.currentTime.textContent = timeString
    }

    initMarquee() {
        this.updateMarqueeContent()
    }

    updateMarqueeContent(customMessages = null) {
        const messages = customMessages || this.marqueeMessages
        if (!this.elements.marqueeContent) return

        this.elements.marqueeContent.innerHTML = messages
            .map(
                (msg) =>
                    `<span class="mx-8">${msg.icon ? `<i class="${msg.icon} mr-2"></i>` : ''}${msg.text}</span>`
            )
            .join('')
            
        // Apply dynamic animation duration based on content length
        const manager = typeof BapendaTickerManager !== 'undefined' ? BapendaTickerManager : MarqueeManager
        if (typeof manager !== 'undefined' && manager.calculateAnimationDuration) {
            const duration = manager.calculateAnimationDuration()
            // Apply duration to the marquee content element itself
            if (this.elements.marqueeContent) {
                this.elements.marqueeContent.style.animationDuration = duration
            }
        }
    }







    showSlide(index) {
        if (index < 0 || index >= this.elements.slides.length) return

        // Update slides with better performance
        this.elements.slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0"
            slide.classList.toggle("active", i === index)
        })

        // Update navigation dots
        this.elements.navDots.forEach((dot, i) => {
            dot.className =
                i === index
                    ? "w-5 h-5 rounded-full bg-blue-600 text-white cursor-pointer transition-all duration-300 scale-110 shadow-lg hover:shadow-xl"
                    : "w-5 h-5 rounded-full bg-gray-300 text-gray-600 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:scale-110 shadow-lg"
        })



        this.updateProgressBar()
    }

    updateProgressBar() {
        if (!this.elements.progressBar) return

        // Force stop any existing animation and reset
        this.elements.progressBar.style.transition = "none"
        this.elements.progressBar.style.width = "0%"

        // Force reflow to ensure the reset is applied
        this.elements.progressBar.offsetHeight

        // Use setTimeout instead of requestAnimationFrame for better timing control
        setTimeout(() => {
            if (this.state.isPlaying) {
                this.elements.progressBar.style.transition = `width ${DashboardBapenda.CONFIG.SLIDE_INTERVAL}ms linear`
                this.elements.progressBar.style.width = "100%"
            } else {
                this.elements.progressBar.style.transition = "width 0.1s ease"
                this.elements.progressBar.style.width = "0%"
            }
        }, 50)
    }

    nextSlide() {
        this.state.currentSlide =
            (this.state.currentSlide + 1) % this.elements.slides.length
        this.showSlide(this.state.currentSlide)
    }

    goToSlide(index) {
        this.state.currentSlide = index
        this.showSlide(this.state.currentSlide)
        this.resetAutoSlide()
    }

    startAutoSlide() {
        this.clearTimer("autoSlide")
        if (this.state.isPlaying) {
            this.timers.autoSlide = setInterval(
                () => this.nextSlide(),
                DashboardBapenda.CONFIG.SLIDE_INTERVAL
            )
        }
    }

    resetAutoSlide() {
        this.clearTimer("autoSlide")
        this.startAutoSlide()
    }

    togglePlayPause() {
        this.state.isPlaying = !this.state.isPlaying
        const icon = this.elements.playPauseBtn?.querySelector("i")

        if (icon) {
            icon.className = this.state.isPlaying
                ? "fas fa-pause"
                : "fas fa-play"
        }

        if (this.state.isPlaying) {
            this.startAutoSlide()
        } else {
            this.clearTimer("autoSlide")
        }

        this.updateProgressBar()
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(console.error)
        } else {
            document.exitFullscreen().catch(console.error)
        }
    }

    updateFullscreenButton() {
        const icon = this.elements.fullscreenBtn?.querySelector("i")
        if (icon) {
            icon.className = document.fullscreenElement
                ? "fas fa-compress"
                : "fas fa-expand"
        }
    }

    pauseOnHover() {
        if (this.state.isPlaying) {
            this.clearTimer("autoSlide")
        }
    }

    resumeOnLeave() {
        if (this.state.isPlaying) {
            this.startAutoSlide()
        }
    }

    handleKeyboard(e) {
        const actions = {
            ArrowLeft: () => {
                this.state.currentSlide =
                    this.state.currentSlide > 0
                        ? this.state.currentSlide - 1
                        : this.elements.slides.length - 1
                this.goToSlide(this.state.currentSlide)
            },
            ArrowRight: () => this.nextSlide(),
            " ": () => this.nextSlide(),
            Escape: () =>
                document.fullscreenElement && document.exitFullscreen(),
            f: () => this.toggleFullscreen(),
            F: () => this.toggleFullscreen(),
            p: () => this.togglePlayPause(),
            P: () => this.togglePlayPause(),
        }

        const action = actions[e.key]
        if (action) {
            e.preventDefault()
            action()
            if (["ArrowRight", " "].includes(e.key)) {
                this.resetAutoSlide()
            }
        }
    }

    handleTouchStart(e) {
        this.touch.startX = e.touches[0].clientX
        this.touch.startY = e.touches[0].clientY
    }

    handleTouchEnd(e) {
        this.touch.endX = e.changedTouches[0].clientX
        this.touch.endY = e.changedTouches[0].clientY
        this.handleSwipe()
    }

    handleSwipe() {
        const diffX = this.touch.startX - this.touch.endX
        const diffY = this.touch.startY - this.touch.endY

        if (
            Math.abs(diffX) > Math.abs(diffY) &&
            Math.abs(diffX) > DashboardBapenda.CONFIG.SWIPE_THRESHOLD
        ) {
            if (diffX > 0) {
                this.nextSlide()
            } else {
                this.state.currentSlide =
                    this.state.currentSlide > 0
                        ? this.state.currentSlide - 1
                        : this.elements.slides.length - 1
                this.goToSlide(this.state.currentSlide)
            }
            this.resetAutoSlide()
        }
    }

    handleResize() {
        // Handle responsive layout adjustments if needed
    }

    // Utility methods
    debounce(func, wait) {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    clearTimer(name) {
        if (this.timers[name]) {
            clearInterval(this.timers[name])
            delete this.timers[name]
        }
    }

    // Public API methods
    addMarqueeMessage(icon, text) {
        this.marqueeMessages.push({ icon, text })
        this.updateMarqueeContent()
    }

    removeMarqueeMessage(index) {
        if (index >= 0 && index < this.marqueeMessages.length) {
            this.marqueeMessages.splice(index, 1)
            this.updateMarqueeContent()
        }
    }

    setMarqueeMessages(newMessages) {
        this.marqueeMessages = newMessages
        this.updateMarqueeContent()
    }

    /**
     * Switch to a different marquee message set from config
     */
    switchMarqueeSet(setName) {
        const manager = typeof BapendaTickerManager !== 'undefined' ? BapendaTickerManager : MarqueeManager
        if (typeof manager !== 'undefined') {
            if (manager.switchSet(setName)) {
                this.marqueeMessages = manager.getActiveMessages()
                this.updateMarqueeContent()
                return true
            }
        }
        return false
    }

    /**
     * Reload marquee messages from config file
     */
    reloadMarqueeConfig() {
        this.marqueeMessages = this.loadMarqueeConfig()
        this.updateMarqueeContent()
    }

    /**
     * Get available marquee sets
     */
    getAvailableMarqueeSets() {
        const manager = typeof BapendaTickerManager !== 'undefined' ? BapendaTickerManager : MarqueeManager
        if (typeof manager !== 'undefined') {
            return manager.getAvailableSets()
        }
        return ['financial'] // fallback
    }

    // Cleanup method
    destroy() {
        // Bersihkan semua timer
        Object.values(this.timers).forEach((timer) => clearInterval(timer))
        
        // Bersihkan event listener resize jika ada
        if (this.debouncedResize) {
            window.removeEventListener("resize", this.debouncedResize)
        }
        
        // Reset objek timer
        this.timers = {}
    }
}

// Global functions for navigation (backward compatibility)
function goToSlide(index) {
    window.dashboardInstance?.goToSlide(index)
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Pastikan DOM benar-benar siap
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDashboard)
    } else {
        initDashboard()
    }
})

function initDashboard() {
    // Tambahkan delay kecil untuk memastikan semua elements sudah di-render
    setTimeout(() => {
        window.dashboardInstance = new DashboardBapenda()
    }, 50)
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
    window.dashboardInstance?.destroy()
})
