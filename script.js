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
                        element.innerHTML = data[key].replace(/\n/g, "<br>");
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

                document.querySelectorAll(".lang-en, .lang-ru").forEach(el => {
                    el.classList.remove("visible");
                });
            
                document.querySelectorAll(`.lang-${lang}`).forEach(el => {
                    el.classList.add("visible");
                });

                if (lang === "ru") {
                    document.querySelector("meta[property='og:title']").setAttribute("content", "Личный сайт Павла Муленко");
                } else {
                    document.querySelector("meta[property='og:title']").setAttribute("content", "Personal website of Paul Mulenko");
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
