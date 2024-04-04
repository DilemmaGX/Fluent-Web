const Appearance = {
    themes: ['light', 'dark'],
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            document.documentElement.setAttribute('theme', theme);
        }
    },
    getTheme() {
        return document.documentElement.getAttribute('theme') == null ? 'light' : document.documentElement.getAttribute('theme');
    }
}