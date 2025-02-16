document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("lang-toggle");
    let currentLang = localStorage.getItem("lang") || "ru";

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

                document.querySelector("a[href='index.html']").textContent = data.nav.home;
                document.querySelector("a[href='about.html']").textContent = data.nav.about;
                document.querySelector("a[href='contact.html']").textContent = data.nav.contact;

                localStorage.setItem("lang", lang);
            })
            .catch(error => console.error("Ошибка загрузки языка:", error));
    }

    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "ru" ? "en" : "ru";
        loadLanguage(currentLang);
    });

    loadLanguage(currentLang);

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
