document.addEventListener('DOMContentLoaded', () => {
  const langSwitcher = document.getElementById('language-switcher');
  const savedLang = localStorage.getItem('lang') || 'en';
  langSwitcher.value = savedLang;
  setLanguage(savedLang);

  langSwitcher.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    setLanguage(lang);
  });
});

function setLanguage(lang) {
  // Your i18n logic here. Example:
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key] || el.textContent;
  });
}

// Example translations object
const translations = {
  en: {
    menu_home: "Home",
    menu_products: "Products",
    menu_cart: "Cart",
    menu_suggestions: "Suggestions",
    menu_contact: "Contact",
    welcome_title: "Welcome to SOFT TOTS NZ",
    welcome_desc: "Handmade knitted products: scrunchies, scarves, cuddly toys for babies and more.",
    see_catalog: "See catalog",
    featured_products: "Featured Products",
    // ...add all your keys
  },
  es: {
    menu_home: "Inicio",
    menu_products: "Productos",
    menu_cart: "Carrito",
    menu_suggestions: "Sugerencias",
    menu_contact: "Contacto",
    welcome_title: "Bienvenido a SOFT TOTS NZ",
    welcome_desc: "Productos tejidos a mano: coleteros, bufandas, juguetes suaves para bebés y más.",
    see_catalog: "Ver catálogo",
    featured_products: "Productos Destacados",
    // ...add all your keys
  }
};
