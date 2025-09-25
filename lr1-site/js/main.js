(function () {
    'use strict';

    // Current year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // Mobile menu toggle
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Smooth scroll for in-page anchors
    document.addEventListener('click', function (e) {
        var target = e.target;
        if (!(target instanceof Element)) return;
        if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
            var id = target.getAttribute('href').slice(1);
            var el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.focus({ preventScroll: true });
            }
        }
    });

    // Simple client-side contact form validation (no submission)
    var form = document.getElementById('contactForm');
    if (form) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');
        var formResult = document.getElementById('formResult');

        function validateEmail(value) {
            // Simple RFC5322-like check
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        function showError(el, errorEl, msg) {
            if (errorEl) errorEl.textContent = msg;
            el.setAttribute('aria-invalid', 'true');
        }

        function clearError(el, errorEl) {
            if (errorEl) errorEl.textContent = '';
            el.removeAttribute('aria-invalid');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var isValid = true;

            if (nameInput && nameInput.value.trim().length < 2) {
                isValid = false;
                showError(nameInput, nameError, 'Введите имя (минимум 2 символа).');
            } else if (nameInput) {
                clearError(nameInput, nameError);
            }

            if (emailInput && !validateEmail(emailInput.value.trim())) {
                isValid = false;
                showError(emailInput, emailError, 'Введите корректный e-mail.');
            } else if (emailInput) {
                clearError(emailInput, emailError);
            }

            if (messageInput && messageInput.value.trim().length < 10) {
                isValid = false;
                showError(messageInput, messageError, 'Сообщение слишком короткое (мин. 10 символов).');
            } else if (messageInput) {
                clearError(messageInput, messageError);
            }

            if (formResult) {
                formResult.textContent = isValid
                    ? 'Спасибо! Форма заполнена корректно (отправка не выполняется).'
                    : '';
            }
        });
    }
})();


