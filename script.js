document.addEventListener("DOMContentLoaded", () => {
    // === Переключение языка и темы
    const themeSwitch = document.getElementById("theme-switch");
    const langSwitch = document.getElementById("lang-switch");

    // Загружаем сохраненные настройки
    let currentTheme = localStorage.getItem("theme") || "dark";
    let currentLang = localStorage.getItem("lang") || "ru";

    document.body.classList.toggle("dark-mode", currentTheme === "dark");
    themeSwitch.checked = currentTheme === "dark";
    langSwitch.checked = currentLang === "en";

    function loadLanguage(lang) {
        fetch(`lang/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                document.title = data.title;

                document.querySelectorAll("[data-i18n]").forEach(element => {
                    let key = element.getAttribute("data-i18n");
                    if (data[key]) {
                        element.textContent = data[key];
                    }
                });
                
                document.querySelectorAll('a').forEach(link => {
                    const newHref = link.getAttribute(`data-${lang}`);
                    if (newHref) {
                        link.href = newHref;
                    }
                });

                document.querySelectorAll('img').forEach(img => {
                    const newSrc = img.getAttribute(`data-${lang}`);
                    if (newSrc) {
                        img.src = newSrc;
                    }
                });                

                //document.body.classList.toggle("lang-en", lang === "en");
                //document.body.classList.toggle("lang-ru", lang === "ru");

                document.querySelectorAll(".lang-en, .lang-ru").forEach(el => {
                    el.classList.remove("visible");
                });
            
                if (window.innerWidth <= 800) { // Apply hiding only on mobile
                    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
                        el.classList.add("visible");
                    });
                }

                localStorage.setItem("lang", lang);
            })
            .catch(error => console.error("Ошибка загрузки языка:", error));
    }

    loadLanguage(currentLang);

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
