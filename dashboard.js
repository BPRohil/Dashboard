class DashboardBapenda {
    constructor() {
        this.currentSlide = 0
        this.slides = []
        this.navDots = []
        this.progressBar = null
        this.slideInterval = 10000 // 10 seconds
        this.autoSlideTimer = null
        this.isPlaying = true
        this.pbbChart = null
        this.bphtbChart = null
        this.resizeTimeout = null

        // Touch/swipe properties
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0

        // Marquee properties
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
                text: "Hubungi Kami di: bapenda.rohil@gmail.com  |  Facebook: Bapenda Rohil  |  Instagram: bapenda_rohil",
            },
        ]

        this.init()
    }

    init() {
        this.initElements()
        this.initEventListeners()
        this.initLoadingScreen()
        this.initTimeUpdater()
        this.initMarquee()
        this.createCharts()
        this.showSlide(0)
        this.startAutoSlide()
    }

    initElements() {
        this.slides = document.querySelectorAll(".slide")
        this.navDots = document.querySelectorAll(".fixed.bottom-8 > div")
        this.progressBar = document.getElementById("progressBar")
    }

    initMarquee() {
        this.updateMarqueeContent()
    }

    updateMarqueeContent(customMessages = null) {
        const messages = customMessages || this.marqueeMessages
        const marqueeContent = document.querySelector(".marquee-content")

        if (marqueeContent) {
            marqueeContent.innerHTML = messages
                .map(
                    (msg) =>
                        `<span class="mx-8">
                    <i class="${msg.icon} mr-2"></i>
                    ${msg.text}
                </span>`
                )
                .join("")
        }
    }

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

    initEventListeners() {
        // Control buttons
        document
            .getElementById("playPauseBtn")
            .addEventListener("click", () => this.togglePlayPause())
        document
            .getElementById("fullscreenBtn")
            .addEventListener("click", () => this.toggleFullscreen())

        // Mouse events for pause on hover
        document
            .querySelector(".w-screen")
            .addEventListener("mouseenter", () => this.pauseOnHover())
        document
            .querySelector(".w-screen")
            .addEventListener("mouseleave", () => this.resumeOnLeave())

        // Keyboard navigation
        document.addEventListener("keydown", (e) => this.handleKeyboard(e))

        // Touch/swipe support
        document.addEventListener("touchstart", (e) => this.handleTouchStart(e))
        document.addEventListener("touchend", (e) => this.handleTouchEnd(e))

        // Window resize
        window.addEventListener("resize", () => this.handleResize())
    }

    initLoadingScreen() {
        window.addEventListener("load", () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById("loadingScreen")
                loadingScreen.style.opacity = "0"
                setTimeout(() => {
                    loadingScreen.style.display = "none"
                }, 500)
            }, 1500)
        })
    }

    initTimeUpdater() {
        this.updateTime()
        setInterval(() => this.updateTime(), 1000)
    }

    updateTime() {
        const now = new Date()
        const timeString = now.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        document.getElementById("currentTime").textContent = timeString
    }

    getChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderWidth: 1,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `Rp ${context.parsed.y} Juta`
                        },
                    },
                },
                datalabels: {
                    display: true,
                    color: "#374151",
                    font: {
                        size: 11,
                        weight: "bold",
                    },
                    anchor: "end",
                    align: "top",
                    formatter: function (value) {
                        return value + " Jt"
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(156, 163, 175, 0.3)",
                        lineWidth: 1,
                    },
                    ticks: {
                        color: "#6B7280",
                        font: {
                            size: 12,
                        },
                        callback: function (value) {
                            return value + " Jt"
                        },
                    },
                },
                x: {
                    grid: {
                        color: "rgba(156, 163, 175, 0.3)",
                        lineWidth: 1,
                    },
                    ticks: {
                        color: "#6B7280",
                        font: {
                            size: 12,
                        },
                    },
                },
            },
            animation: {
                duration: 2000,
                easing: "easeInOutQuart",
            },
        }
    }

    getPBBData() {
        return {
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
            datasets: [
                {
                    label: "PBB (Juta Rupiah)",
                    data: [845, 149, 168, 93, 208, 461],
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderColor: "#f6803b",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "rgba(16, 185, 129, 1)",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                },
            ],
        }
    }

    getBPHTBData() {
        return {
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
            datasets: [
                {
                    label: "BPHTB (Juta Rupiah)",
                    data: [159, 697, 504, 417, 480, 294],
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderColor: "#f6803b",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "rgba(16, 185, 129, 1)",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                },
            ],
        }
    }

    createCharts() {
        this.createPBBChart()
        this.createBPHTBChart()
    }

    createPBBChart() {
        const pbbCtx = document.getElementById("pbbChart").getContext("2d")
        const chartOptions = this.getChartOptions()

        this.pbbChart = new Chart(pbbCtx, {
            type: "line",
            data: this.getPBBData(),
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    title: {
                        display: true,
                        text: "Grafik Penerimaan PBB 2025",
                        color: "#374151",
                        font: {
                            size: 18,
                            weight: "bold",
                        },
                        padding: 20,
                    },
                },
            },
            plugins: [ChartDataLabels],
        })
    }

    createBPHTBChart() {
        const bphtbCtx = document.getElementById("bphtbChart").getContext("2d")
        const chartOptions = this.getChartOptions()

        this.bphtbChart = new Chart(bphtbCtx, {
            type: "line",
            data: this.getBPHTBData(),
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    title: {
                        display: true,
                        text: "Grafik Penerimaan BPHTB 2025",
                        color: "#374151",
                        font: {
                            size: 18,
                            weight: "bold",
                        },
                        padding: 20,
                    },
                },
            },
            plugins: [ChartDataLabels],
        })
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove("opacity-100")
            slide.classList.add("opacity-0")
            if (i === index) {
                slide.classList.add("active")
            } else {
                slide.classList.remove("active")
            }
        })

        // Update navigation dots
        this.navDots.forEach((dot, i) => {
            dot.classList.remove("bg-blue-600", "text-white", "scale-110")
            dot.classList.add("bg-gray-300", "text-gray-600")
            if (i === index) {
                dot.classList.remove("bg-gray-300", "text-gray-600")
                dot.classList.add("bg-blue-600", "text-white", "scale-110")
            }
        })

        // Show current slide with enhanced transition
        setTimeout(() => {
            this.slides[index].classList.remove("opacity-0")
            this.slides[index].classList.add("opacity-100")
        }, 50)

        // Update charts when slides become active
        setTimeout(() => {
            if (index === 1 && this.pbbChart) {
                this.pbbChart.update("active")
            } else if (index === 2 && this.bphtbChart) {
                this.bphtbChart.update("active")
            }
        }, 300)

        // Reset and start progress bar
        this.progressBar.classList.add("reset")
        this.progressBar.style.width = "0%"
        setTimeout(() => {
            this.progressBar.classList.remove("reset")
            if (this.isPlaying) {
                this.progressBar.style.width = "100%"
            }
        }, 150)
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length
        this.showSlide(this.currentSlide)
    }

    goToSlide(index) {
        this.currentSlide = index
        this.showSlide(this.currentSlide)
        this.resetAutoSlide()
    }

    startAutoSlide() {
        clearInterval(this.autoSlideTimer) // Always clear existing timer
        if (this.isPlaying) {
            this.autoSlideTimer = setInterval(
                () => this.nextSlide(),
                this.slideInterval
            )
        }
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideTimer)
        this.startAutoSlide()
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying
        const btn = document.getElementById("playPauseBtn")
        const icon = btn.querySelector("i")

        if (this.isPlaying) {
            icon.className = "fas fa-pause"
            this.startAutoSlide()
            this.progressBar.style.animationPlayState = "running"
        } else {
            icon.className = "fas fa-play"
            clearInterval(this.autoSlideTimer)
            this.progressBar.style.animationPlayState = "paused"
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            document
                .getElementById("fullscreenBtn")
                .querySelector("i").className = "fas fa-compress"
        } else {
            document.exitFullscreen()
            document
                .getElementById("fullscreenBtn")
                .querySelector("i").className = "fas fa-expand"
        }
    }

    pauseOnHover() {
        if (this.isPlaying) {
            clearInterval(this.autoSlideTimer)
            this.progressBar.style.animationPlayState = "paused"
        }
    }

    resumeOnLeave() {
        if (this.isPlaying) {
            this.startAutoSlide()
            this.progressBar.style.animationPlayState = "running"
        }
    }

    handleKeyboard(e) {
        switch (e.key) {
            case "ArrowLeft":
                this.currentSlide =
                    this.currentSlide > 0
                        ? this.currentSlide - 1
                        : this.slides.length - 1
                this.goToSlide(this.currentSlide)
                break
            case "ArrowRight":
            case " ":
                this.nextSlide()
                this.resetAutoSlide()
                break
            case "Escape":
                if (document.fullscreenElement) {
                    document.exitFullscreen()
                }
                break
            case "f":
            case "F":
                this.toggleFullscreen()
                break
            case "p":
            case "P":
                this.togglePlayPause()
                break
        }
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX
        this.startY = e.touches[0].clientY
    }

    handleTouchEnd(e) {
        this.endX = e.changedTouches[0].clientX
        this.endY = e.changedTouches[0].clientY
        this.handleSwipe()
    }

    handleSwipe() {
        const threshold = 50
        const diffX = this.startX - this.endX
        const diffY = this.startY - this.endY

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                this.nextSlide()
            } else {
                this.currentSlide =
                    this.currentSlide > 0
                        ? this.currentSlide - 1
                        : this.slides.length - 1
                this.goToSlide(this.currentSlide)
            }
            this.resetAutoSlide()
        }
    }

    handleResize() {
        clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(() => {
            // Resize charts
            if (this.pbbChart) this.pbbChart.resize()
            if (this.bphtbChart) this.bphtbChart.resize()
        }, 250)
    }
}

// Global functions for navigation (called from HTML onclick)
function goToSlide(index) {
    if (window.dashboardInstance) {
        window.dashboardInstance.goToSlide(index)
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    window.dashboardInstance = new DashboardBapenda()
})
