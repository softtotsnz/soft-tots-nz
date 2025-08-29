document.addEventListener('DOMContentLoaded', () => {
  const langSwitcher = document.getElementById('language-switcher');
  // Default to English if nothing is stored
  const savedLang = localStorage.getItem('lang') || 'en';
  if (langSwitcher) langSwitcher.value = savedLang;
  setLanguage(savedLang);

  if (langSwitcher) {
    langSwitcher.addEventListener('change', (e) => {
      const lang = e.target.value;
      localStorage.setItem('lang', lang);
      setLanguage(lang);
    });
  }
});

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

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
    // Productos.html
    products_title: "Our Products",
    // Sugerencias.html
    suggestions_title: "Suggestions",
    suggestions_desc: "We value your feedback. Please share your suggestions.",
    // Contacto.html
    contact_title: "Contact Us",
    contact_desc: "Send us your questions or comments."
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
    // Productos.html
    products_title: "Nuestros Productos",
    // Sugerencias.html
    suggestions_title: "Sugerencias",
    suggestions_desc: "Valoramos tu opinión. Por favor, comparte tus sugerencias.",
    // Contacto.html
    contact_title: "Contáctanos",
    contact_desc: "Envíanos tus preguntas o comentarios."
  }
};
