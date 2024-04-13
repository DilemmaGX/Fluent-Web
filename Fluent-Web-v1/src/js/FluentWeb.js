var zoom = 1;

document.addEventListener('mousemove', function (event) {
    document.documentElement.style.setProperty('--mouse-x', event.clientX / zoom + 'px');
    document.documentElement.style.setProperty('--mouse-y', event.clientY / zoom + 'px');
});

document.addEventListener('mousewheel', function (e) {
    e = e || window.event;
    if ((e.wheelDelta && event.ctrlKey) || e.detail) {
        event.preventDefault();
    }
}, { capture: false, passive: false });

document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey === true || event.metaKey === true)
        && (event.keyCode === 61 || event.keyCode === 107
            || event.keyCode === 173 || event.keyCode === 109
            || event.keyCode === 187 || event.keyCode === 189)) {
        event.preventDefault();
    }
}, false);

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

const Appearance = {
    setTheme(theme) {
        document.documentElement.setAttribute('theme', theme);
    },
    setSystemTheme() {
        this.setTheme(this.getSystemTheme());
    },
    getTheme() {
        return document.documentElement.getAttribute('theme') == null ? 'light' : document.documentElement.getAttribute('theme');
    },
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'true';
    }
}

const Action = {
    setZoom(z) {
        zoom = z;
        document.documentElement.style.setProperty('zoom', zoom);
    },
    toggleTheme(t1, t2) {
        Appearance.setTheme(Appearance.getTheme() == t1 ? t2 : t1);
    },
    toggleThemeWithTransition(t1, t2) {
        document.documentElement.style.setProperty('--cache-x', event.clientX / zoom + 'px');
        document.documentElement.style.setProperty('--cache-y', event.clientY / zoom + 'px');
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                Appearance.setTheme(Appearance.getTheme() == t1 ? t2 : t1);
            });
        } else {
            Appearance.setTheme(Appearance.getTheme() == t1 ? t2 : t1);
        }
    },
    toggleDisabled(id) {
        let ele = document.getElementById(id);
        let val = ele.firstElementChild.value;
        if (ele.hasAttribute('disabled')) { ele.removeAttribute('disabled') }
        else { ele.setAttribute('disabled', '') }
        ele.firstElementChild.setAttribute('value', val);
    },
    togglePassword(id) {
        let ele = document.getElementById(id);
        let val = ele.firstElementChild.value;
        if (ele.hasAttribute('password')) {
            ele.removeAttribute('password');
        } else {
            ele.setAttribute('password', '');
        }
        ele.firstElementChild.setAttribute('value', val);
    },
    setAttribute(id, attriName, attriVal) {
        let ele = document.getElementById(id);
        ele.setAttribute(attriName, attriVal);
    },
    getAttribute(id, attriName) {
        let ele = document.getElementById(id);
        return ele.getAttribute(attriName);
    },
    hasAttribute(id, attriName) {
        let ele = document.getElementById(id);
        return ele.hasAttribute(attriName);
    },
    getValue(id) {
        let ele = document.getElementById(id);
        return ele.value;
    }
}

class FlButton extends HTMLElement {
    static observedAttributes = ['appearance', 'text', '@click', 'disabled']

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'appearance' || name === 'text' || name === '@click' || name === 'disabled') {
            this.render();
        }
    }

    render() {
        this.innerHTML = '';
        const appearance = this.getAttribute('appearance') || '';
        const text = this.getAttribute('text') || '';
        const click = this.getAttribute('@click') || null;

        const template = document.createElement('template');
        template.innerHTML = `<button appearance="${appearance}" onclick="${click}" ${this.hasAttribute('disabled') ? 'disabled' : ''} ${this.hasAttribute('compact') ? 'compact' : ''}>${text}</button>`;
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('fl-button', FlButton);

class FlText extends HTMLElement {
    static observedAttributes = ['appearance', 'text', 'disabled', 'password']

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder' || name === 'disabled' || name === 'default' || name === 'password') {
            this.render();
        }
    }

    render() {
        this.innerHTML = '';
        const placeholder = this.getAttribute('placeholder') || '';
        const text = this.getAttribute('default') || '';
        const color = this.getAttribute('color') || '';

        const template = document.createElement('template');
        template.innerHTML = `<input ${this.hasAttribute('password') ? 'type="password"' : 'type="text"'} ${this.hasAttribute('disabled') ? 'disabled' : ''} placeholder="${placeholder}" value="${text}"><span style="background-color: ${color};"></span>`;
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('fl-text', FlText);