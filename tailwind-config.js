/**
 * BAPENDA Dashboard - Optimized Tailwind Configuration
 * Enhanced with modern practices, better performance, and improved maintainability
 */

// Enhanced Tailwind CSS configuration with performance optimizations
tailwind.config = {
    // Enable JIT mode for better performance
    mode: 'jit',
    
    // Optimize content scanning
    content: [
        './index.html',
        './dashboard.js',
        './**/*.{html,js}'
    ],
    
    // Enhanced theme configuration
    theme: {
        extend: {
            // Custom color palette
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a'
                },
                secondary: {
                    50: '#fef7ed',
                    100: '#fef3e2',
                    200: '#fde4c4',
                    300: '#fbcf9b',
                    400: '#f8b570',
                    500: '#f6803b',
                    600: '#ea6d2a',
                    700: '#c2571f',
                    800: '#9a4520',
                    900: '#7c3a1e'
                },
                success: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b'
                }
            },
            
            // Enhanced animation configuration
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'fade-in-down': 'fadeInDown 0.8s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'bounce-in': 'bounceIn 0.8s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'marquee': 'marquee 30s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                'scale-in': 'scaleIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out'
            },
            
            // Enhanced keyframes with hardware acceleration
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, 30px, 0)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                fadeInDown: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, -30px, 0)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                slideInLeft: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(-30px, 0, 0)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                slideInRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(30px, 0, 0)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                bounceIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'scale3d(0.3, 0.3, 0.3)'
                    },
                    '20%': {
                        transform: 'scale3d(1.1, 1.1, 1.1)'
                    },
                    '40%': {
                        transform: 'scale3d(0.9, 0.9, 0.9)'
                    },
                    '60%': {
                        opacity: '1',
                        transform: 'scale3d(1.03, 1.03, 1.03)'
                    },
                    '80%': {
                        transform: 'scale3d(0.97, 0.97, 0.97)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale3d(1, 1, 1)'
                    }
                },
                pulseGlow: {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)'
                    },
                    '50%': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)'
                    }
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    }
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-200% 0'
                    },
                    '100%': {
                        backgroundPosition: '200% 0'
                    }
                },
                marquee: {
                    '0%': {
                        transform: 'translateX(100%)'
                    },
                    '100%': {
                        transform: 'translateX(-100%)'
                    }
                },
                scaleIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.9)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    }
                },
                slideUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                fadeIn: {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                }
            },
            
            // Enhanced spacing scale
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                '144': '36rem'
            },
            
            // Enhanced font family
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Poppins', 'system-ui', 'sans-serif']
            },
            
            // Enhanced box shadows
            boxShadow: {
                'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
                'glass-lg': '0 12px 40px rgba(31, 38, 135, 0.5)',
                'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glow-lg': '0 0 40px rgba(59, 130, 246, 0.6)'
            },
            
            // Enhanced backdrop blur
            backdropBlur: {
                'xs': '2px',
                '4xl': '72px'
            },
            
            // Enhanced border radius
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem'
            },
            
            // Enhanced z-index scale
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100'
            },
            
            // Enhanced transition timing
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms'
            },
            
            // Enhanced transition timing functions
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
            }
        }
    },
    
    // Enhanced plugins configuration
    plugins: [
        // Custom plugin for glass morphism
        function({ addUtilities, theme }) {
            const newUtilities = {
                '.glass': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
                },
                '.glass-dark': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
                },
                '.text-shadow': {
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                },
                '.text-shadow-lg': {
                    textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                },
                '.gpu-accelerated': {
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                },
                '.smooth-edges': {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                }
            };
            
            addUtilities(newUtilities, ['responsive', 'hover']);
        },
        
        // Custom plugin for animation delays
        function({ addUtilities }) {
            const delays = {};
            for (let i = 1; i <= 20; i++) {
                delays[`.delay-${i * 100}`] = {
                    animationDelay: `${i * 100}ms`
                };
            }
            addUtilities(delays);
        }
    ],
    
    // Optimize for production
    corePlugins: {
        // Disable unused core plugins for better performance
        container: false
    },
    
    // Enhanced variants
    variants: {
        extend: {
            animation: ['hover', 'focus', 'group-hover'],
            transform: ['hover', 'focus', 'group-hover'],
            scale: ['hover', 'focus', 'group-hover'],
            opacity: ['disabled'],
            cursor: ['disabled']
        }
    }
};

// Performance optimization: Preload critical animations
if (typeof window !== 'undefined') {
    // Create a style element for critical CSS
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
        /* Critical animations for immediate use */
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
        }
        .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out;
        }
        .animate-pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }
        
        /* Hardware acceleration for better performance */
        .animate-fade-in-up,
        .animate-slide-in-left,
        .animate-pulse-glow {
            will-change: transform, opacity;
            transform: translateZ(0);
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-slide-in-left,
            .animate-pulse-glow {
                animation: none;
            }
        }
    `;
    
    document.head.appendChild(criticalCSS);
    
    // Cleanup function for memory management
    window.addEventListener('beforeunload', () => {
        if (criticalCSS.parentNode) {
            criticalCSS.parentNode.removeChild(criticalCSS);
        }
    });
}

// Export configuration for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tailwind.config;
}