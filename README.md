# BAPENDA Dashboard

A modern, responsive dashboard for Badan Pendapatan Daerah (BAPENDA) Kabupaten Rokan Hilir featuring glassmorphism design and dynamic content management.

## 🚀 Features

- **Modern Glassmorphism UI**: Apple-inspired glass effects with colorful aesthetics
- **Responsive Design**: Optimized for all screen sizes and devices
- **Dynamic Ticker System**: Configurable marquee messages for announcements and financial data
- **Slideshow Presentation**: Automated image carousel with smooth transitions
- **Real-time Updates**: Live time display and dynamic content updates
- **Touch & Keyboard Support**: Full interaction support for all input methods

## 📁 Project Structure

```
Dashboard/
├── assets/                 # Static assets
│   └── images/            # Image files (PNG, JPG, GIF)
├── config/                # Configuration files
│   └── tailwind.config.js # Tailwind CSS configuration
├── docs/                  # Documentation
│   └── marquee-configuration.md # Marquee system documentation
├── src/                   # Source code
│   ├── css/              # Stylesheets
│   │   └── styles.css    # Main CSS file with glassmorphism effects
│   └── js/               # JavaScript files
│       ├── dashboard.js  # Main dashboard functionality
│       └── marquee-config.js # Ticker message configuration
└── index.html            # Main HTML file
```

## 🛠️ Installation & Setup

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **Customize** content by editing configuration files

No build process required - the dashboard runs directly in the browser!

## ⚙️ Configuration

### Ticker Messages
Edit `src/js/marquee-config.js` to customize ticker messages:
- Financial data displays
- Announcements
- Contact information

### Styling
Modify `src/css/styles.css` for custom styling and `config/tailwind.config.js` for Tailwind customization.

### Images
Add new images to `assets/images/` and reference them in the HTML file.

## 📖 Documentation

- [Marquee Configuration Guide](docs/marquee-configuration.md) - Detailed guide for managing ticker messages

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🎨 Design System

The dashboard uses a modern glassmorphism design with:
- Backdrop blur effects
- Semi-transparent backgrounds
- Colorful glass aesthetics
- Smooth animations and transitions

## 🔧 Customization

### Adding New Slides
1. Add image to `assets/images/`
2. Update HTML in `index.html`
3. Configure slide timing in `src/js/dashboard.js`

### Modifying Colors
Update the color palette in `config/tailwind.config.js` under the `colors` section.

### Changing Animations
Modify animation settings in `src/css/styles.css` and `config/tailwind.config.js`.

## 📄 License

This project is developed for BAPENDA Kabupaten Rokan Hilir.

## 🤝 Contributing

For modifications or improvements, please follow the existing code structure and documentation standards.

---

**BAPENDA Dashboard** - Modern, efficient, and beautiful revenue management interface.