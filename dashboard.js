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
        this.charts = {}
        this.timers = {}
        this.touch = { startX: 0, startY: 0, endX: 0, endY: 0 }

        this.marqueeMessages = [
            {
                icon: "fas fa-bullhorn",
                text: "Selamat datang di Badan Pendapatan Daerah (BAPENDA) Kabupaten Rokan Hilir",
            },
            {
                icon: "fas fa-info-circle",
                text: "Periode pelaporan: Januari - Juni 2025",
            },
            {
                icon: "fas fa-globe",
                text: "Hubungi Kami di: bapenda.rohil@gmail.com | Facebook: Bapenda Rohil | Instagram: bapenda_rohil",
            },
        ]

        this.init()
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
            this.createCharts(),
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

        // Update charts when needed
        requestAnimationFrame(() => {
            if (index === 1 && this.charts.pbb) {
                this.charts.pbb.update("active")
            } else if (index === 2 && this.charts.bphtb) {
                this.charts.bphtb.update("active")
            }
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
                    `<span class="mx-8"><i class="${msg.icon} mr-2"></i>${msg.text}</span>`
            )
            .join("")
    }

    // Enhanced chart configuration with beautiful styling
    getOptimizedChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 25,
                    right: 15,
                    bottom: 10,
                    left: 15,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        color: "#1f2937",
                        font: {
                            size: 14,
                            weight: "bold",
                            family: "Inter, sans-serif",
                        },
                        padding: 4,
                        usePointStyle: true,
                        pointStyle: "circle",
                    },
                },
                tooltip: {
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    titleColor: "#f9fafb",
                    bodyColor: "#f9fafb",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: true,
                    titleFont: { size: 14, weight: "bold" },
                    bodyFont: { size: 13 },
                    padding: 8,
                    caretPadding: 8,
                    callbacks: {
                        title: (context) => `${context[0].label} 2025`,
                        label: (context) =>
                            `💰 Rp ${context.parsed.y.toLocaleString(
                                "id-ID"
                            )} Juta`,
                        afterLabel: (context) => {
                            const total = context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            )
                            const percentage = (
                                (context.parsed.y / total) *
                                100
                            ).toFixed(1)
                            return `📊 ${percentage}% dari total`
                        },
                    },
                },
                datalabels: {
                    display: true,
                    color: "#1f2937",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    borderWidth: 1,
                    borderRadius: 6,
                    font: {
                        size: 12,
                        weight: "bold",
                        family: "Inter, sans-serif",
                    },
                    padding: 6,
                    anchor: "center",
                    align: "top",
                    offset: 8,
                    clip: false,
                    formatter: (value) => `${value} Jt`,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(156, 163, 175, 0.2)",
                        lineWidth: 1,
                        drawBorder: false,
                    },
                    border: {
                        display: false,
                    },
                    ticks: {
                        color: "#6b7280",
                        font: {
                            size: 12,
                            family: "Inter, sans-serif",
                        },
                        padding: 4,
                        callback: (value) => `${value} Jt`,
                    },
                    title: {
                        display: true,
                        text: "Penerimaan (Juta Rupiah)",
                        color: "#374151",
                        font: {
                            size: 13,
                            weight: "bold",
                            family: "Inter, sans-serif",
                        },
                        padding: 10,
                    },
                },
                x: {
                    grid: {
                        color: "rgba(156, 163, 175, 0.1)",
                        lineWidth: 1,
                        drawBorder: false,
                    },
                    border: {
                        display: false,
                    },
                    ticks: {
                        color: "#6b7280",
                        font: {
                            size: 16,
                            family: "Inter, sans-serif",
                        },
                        padding: 12,
                    },
                    // title: {
                    //     display: true,
                    //     text: "Bulan",
                    //     color: "#374151",
                    //     font: {
                    //         size: 13,
                    //         weight: "bold",
                    //         family: "Inter, sans-serif",
                    //     },
                    //     padding: 10,
                    // },
                },
            },
            animation: {
                duration: 2500,
                easing: "easeInOutCubic",
                delay: (context) => context.dataIndex * 100,
            },
            elements: {
                point: {
                    radius: 6,
                    hoverRadius: 10,
                    hoverBorderWidth: 3,
                    borderWidth: 2,
                    hitRadius: 10,
                },
                line: {
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true,
                },
            },
            onResize: (chart, size) => {
                // Ensure chart maintains proper scaling on zoom changes
                chart.update("none")
            },
        }
    }

    // Enhanced chart data with beautiful gradients and styling
    getChartData() {
        const months = DataConfig.getBulan()

        // Create gradient for PBB chart
        const createGradient = (ctx, colorStart, colorEnd) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400)
            gradient.addColorStop(0, colorStart)
            gradient.addColorStop(1, colorEnd)
            return gradient
        }

        return {
            pbb: {
                labels: months,
                datasets: [
                    {
                        label: "💰 PBB(Pajak Bumi & Bangunan)",
                        data: DataConfig.getDataPBB(),
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx
                            return createGradient(
                                ctx,
                                "rgba(16, 185, 129, 0.3)",
                                "rgba(16, 185, 129, 0.05)"
                            )
                        },
                        borderColor: "#10b981",
                        borderWidth: 6,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#ffffff",
                        pointBorderColor: "#10b981",
                        pointBorderWidth: 3,
                        pointRadius: 7,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "#10b981",
                        pointHoverBorderColor: "#ffffff",
                        pointHoverBorderWidth: 4,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowBlur: 10,
                        shadowColor: "rgba(59, 130, 246, 0.3)",
                        cubicInterpolationMode: "monotone",
                        spanGaps: false,
                    },
                ],
            },
            bphtb: {
                labels: months,
                datasets: [
                    {
                        label: "🏠 BPHTB (Bea Perolehan Hak atas Tanah & Bangunan)",
                        data: DataConfig.getDataBPHTB(),
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx
                            return createGradient(
                                ctx,
                                "rgba(16, 185, 129, 0.3)",
                                "rgba(16, 185, 129, 0.05)"
                            )
                        },
                        borderColor: "#10b981",
                        borderWidth: 4,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#ffffff",
                        pointBorderColor: "#10b981",
                        pointBorderWidth: 3,
                        pointRadius: 7,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "#10b981",
                        pointHoverBorderColor: "#ffffff",
                        pointHoverBorderWidth: 4,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowBlur: 10,
                        shadowColor: "rgba(16, 185, 129, 0.3)",
                        cubicInterpolationMode: "monotone",
                        spanGaps: false,
                    },
                ],
            },
        }
    }

    async createCharts() {
        const chartData = this.getChartData()
        const options = this.getOptimizedChartOptions()

        try {
            // Pastikan container chart memiliki ukuran yang benar
            const chartContainers = document.querySelectorAll('.chart-container');
            chartContainers.forEach(container => {
                container.style.height = '550px';
                container.style.minHeight = '450px';
            });

            // Create PBB Chart
            const pbbCtx = document.getElementById("pbbChart")?.getContext("2d")
            if (pbbCtx) {
                // Ensure canvas is properly sized before creating chart
                const pbbCanvas = document.getElementById("pbbChart")
                if (pbbCanvas) {
                    pbbCanvas.style.height = "100%"
                    pbbCanvas.style.width = "100%"
                }

                this.charts.pbb = new Chart(pbbCtx, {
                    type: "line",
                    data: chartData.pbb,
                    options: {
                        ...options,
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            ...options.plugins,
                            title: {
                                display: true,
                                text: "Grafik Penerimaan PBB 2025",
                                color: "#374151",
                                font: { size: 18, weight: "bold" },
                                padding: 10,
                            },
                        },
                    },
                    plugins: [ChartDataLabels],
                })
            }

            // Create BPHTB Chart
            const bphtbCtx = document
                .getElementById("bphtbChart")
                ?.getContext("2d")
            if (bphtbCtx) {
                // Ensure canvas is properly sized before creating chart
                const bphtbCanvas = document.getElementById("bphtbChart")
                if (bphtbCanvas) {
                    bphtbCanvas.style.height = "100%"
                    bphtbCanvas.style.width = "100%"
                }

                this.charts.bphtb = new Chart(bphtbCtx, {
                    type: "line",
                    data: chartData.bphtb,
                    options: {
                        ...options,
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            ...options.plugins,
                            title: {
                                display: true,
                                text: "Grafik Penerimaan BPHTB 2025",
                                color: "#374151",
                                font: { size: 18, weight: "bold" },
                                padding: 10,
                            },
                        },
                    },
                    plugins: [ChartDataLabels],
                })
            }

            // Add window resize event listener to update charts with debounce
            this.debouncedResize = this.debounce(() => this.handleResize(), 250);
            window.addEventListener("resize", this.debouncedResize);

            // Force an initial resize to ensure proper rendering
            setTimeout(() => {
                this.handleResize();
            }, 100);

            // Tambahkan interval untuk memeriksa ukuran chart setiap 30 detik
            // Ini akan memastikan chart tidak mengecil setelah beberapa jam
            this.timers.chartSizeCheck = setInterval(() => {
                this.handleResize();
            }, 30000); // 30 detik
        } catch (error) {
            console.error("Chart creation failed:", error)
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

        // Update charts when needed
        requestAnimationFrame(() => {
            if (index === 1 && this.charts.pbb) {
                this.charts.pbb.update("active")
            } else if (index === 2 && this.charts.bphtb) {
                this.charts.bphtb.update("active")
            }
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
        // Pastikan container chart memiliki ukuran yang benar
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.style.height = '550px';
            container.style.minHeight = '450px';
        });

        // Pastikan canvas chart mengisi 100% dari container
        const chartCanvases = document.querySelectorAll('.chart-container canvas');
        chartCanvases.forEach(canvas => {
            canvas.style.height = '100%';
            canvas.style.width = '100%';
        });

        // Tambahkan delay kecil sebelum resize untuk memastikan DOM telah diperbarui
        setTimeout(() => {
            Object.values(this.charts).forEach((chart) => {
                if (chart && typeof chart.resize === "function") {
                    chart.resize();
                    // Perbarui chart tanpa animasi untuk memastikan rendering yang tepat
                    chart.update('none');
                }
            });
        }, 100);
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

    // Cleanup method
    destroy() {
        // Bersihkan semua timer termasuk chartSizeCheck
        Object.values(this.timers).forEach((timer) => clearInterval(timer))
        
        // Bersihkan event listener resize jika ada
        if (this.debouncedResize) {
            window.removeEventListener("resize", this.debouncedResize)
        }
        
        // Hancurkan semua instance chart
        Object.values(this.charts).forEach((chart) => {
            if (chart && typeof chart.destroy === "function") {
                chart.destroy()
            }
        })
        
        // Reset objek timer dan chart
        this.timers = {}
        this.charts = {}
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
