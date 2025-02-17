document.addEventListener("DOMContentLoaded", () => {
    // === Переключение языка и темы
    const themeSwitch = document.getElementById("theme-switch");
    const langSwitch = document.getElementById("lang-switch");

    // Загружаем сохраненные настройки
    let currentTheme = localStorage.getItem("theme") || "light";
    let currentLang = localStorage.getItem("lang") || "ru";

    document.body.classList.toggle("dark-mode", currentTheme === "dark");
    themeSwitch.checked = currentTheme === "dark";
    langSwitch.checked = currentLang === "en";

    // Переключение темы
    themeSwitch.addEventListener("change", () => {
        const newTheme = themeSwitch.checked ? "dark" : "light";
        document.body.classList.toggle("dark-mode", themeSwitch.checked);
        localStorage.setItem("theme", newTheme);
    });

    // Переключение языка
    langSwitch.addEventListener("change", () => {
        const newLang = langSwitch.checked ? "en" : "ru";
        localStorage.setItem("lang", newLang);
        loadLanguage(newLang);
    });
    
    // === Анимация появления блоков ===
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Отключаем наблюдение после появления
            }
        });
    }, {
        threshold: 0.2 // Запускаем, когда 20% элемента в зоне видимости
    });

    fadeInElements.forEach(el => observer.observe(el));
});
