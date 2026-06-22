const productData = {
    1: {
        name: 'Свадебный торт «Аксай»', cat: 'Торты',
        img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80',
        desc: 'Многоярусный свадебный торт с ручной росписью. Каждый ярус украшается съедобными цветами и элементами из мастики. Изготавливается только под заказ, срок — от 5 рабочих дней.',
        details: [{ label:'Вес',value:'от 5 кг'},{label:'Ярусов',value:'2–4'},{label:'Срок',value:'от 5 дней'},{label:'Доставка',value:'По Бишкеку'}]
    },
    2: {
        name: 'Торт «Иссык-Куль»', cat: 'Торты',
        img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
        desc: 'Авторский торт вдохновлён горным озером. Шоколадный бисквит, мусс из голубики и черники, зеркальная глазурь цвета глубокой воды.',
        details: [{label:'Вес',value:'1.5–3 кг'},{label:'Вкус',value:'Шоколад + голубика'},{label:'Хранение',value:'72 часа'},{label:'Аллергены',value:'Глютен, яйца'}]
    },
    3: {
        name: 'Эклеры «Ала-Тоо»', cat: 'Выпечка',
        img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80',
        desc: 'Воздушные заварные эклеры с кремом из местного мёда и фисташковой пасты. Глазурь — тёмный бельгийский шоколад.',
        details: [{label:'Упаковка',value:'6 или 12 шт.'},{label:'Вкусы',value:'Мёд, фисташка'},{label:'Калории',value:'~310 ккал/шт'},{label:'Срок',value:'24 часа'}]
    },
    4: {
        name: 'Круассаны с маком', cat: 'Выпечка',
        img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
        desc: 'Классические французские круассаны с маковой начинкой и ванилью. Тесто ламинируется в 27 слоёв. Выпекаются свежими каждое утро.',
        details: [{label:'Вес',value:'90 г/шт'},{label:'Слоёв',value:'27'},{label:'Выпечка',value:'Ежедневно 07:00'},{label:'Упаковка',value:'от 4 шт.'}]
    },
    5: {
        name: 'Набор «Манас»', cat: 'Конфеты',
        img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80',
        desc: 'Премиальный набор ручных шоколадных конфет с орехами Тянь-Шаньского региона. В подарочной коробке с национальным орнаментом.',
        details: [{label:'Кол-во',value:'16–24 шт.'},{label:'Шоколад',value:'70% какао'},{label:'Орехи',value:'Тянь-Шань'},{label:'Заказ',value:'от 2 коробок'}]
    },
    6: {
        name: 'Боорсок праздничный', cat: 'Национальные сладости',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
        desc: 'Традиционная кыргызская сладость без которой не обходится ни один той. Жареные лепёшки по старинному рецепту подаются с мёдом и каймаком.',
        details: [{label:'Вес',value:'от 500 г'},{label:'Состав',value:'Мука, молоко, яйца'},{label:'Подача',value:'С мёдом, каймаком'},{label:'Заказ',value:'Опт и розница'}]
    }
};

// Navbar scroll
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
function closeMobileMenu() {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
});

// Smooth scroll
function scrollToSection(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target) return;

    if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (updateHash) {
        history.pushState(null, '', `#${id}`);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        if (!id || !document.getElementById(id)) return;

        e.preventDefault();
        closeMobileMenu();
        scrollToSection(id);
    });
});

document.querySelectorAll('[data-scroll-target]').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scrollTarget));
});

// Counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let cur = 0; const step = target / 120;
        const t = setInterval(() => {
            cur += step; if (cur >= target) { cur = target; clearInterval(t); }
            el.textContent = Math.floor(cur) + '+';
        }, 16);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// Particles
const pc = document.getElementById('particles');
function mkParticle() {
    const p = document.createElement('div'); p.className = 'particle';
    const s = Math.random() * 60 + 20;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*8+6}s;animation-delay:${Math.random()*5}s`;
    pc.appendChild(p); setTimeout(() => p.remove(), 14000);
}
setInterval(mkParticle, 800); for (let i = 0; i < 6; i++) mkParticle();

// About tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
    });
});

// Catalog filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.product-card').forEach(card => {
            const show = btn.dataset.filter === 'all' || card.dataset.category === btn.dataset.filter;
            card.classList.toggle('hidden', !show);
        });
    });
});

// Modal
const modal = document.getElementById('modal');
const modalInner = document.getElementById('modal-inner');
function openModal(id) {
    const d = productData[id]; if (!d) return;
    modalInner.innerHTML = `
    <img src="${d.img}" alt="${d.name}"/>
    <span class="modal-cat">${d.cat}</span>
    <h2>${d.name}</h2>
    <p>${d.desc}</p>
    <div class="modal-details">${d.details.map(x=>`<div class="modal-detail"><strong>${x.label}</strong><span>${x.value}</span></div>`).join('')}</div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
});
document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openModal(parseInt(btn.closest('.product-card').dataset.id)); });
});
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// City tabs
document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.city-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('city-' + btn.dataset.city)?.classList.add('active');
    });
});

// Recipes
document.querySelectorAll('.recipe-open-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = document.getElementById('recipe-' + btn.dataset.recipe);
        const isOpen = panel.classList.contains('open');
        document.querySelectorAll('.recipe-panel').forEach(p => p.classList.remove('open'));
        document.querySelectorAll('.recipe-open-btn').forEach(b => b.textContent = 'Открыть рецепт');
        if (!isOpen) { panel.classList.add('open'); btn.textContent = 'Закрыть рецепт ▲'; }
    });
});

// Gallery carousel
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-item');
const galleryPrev = document.querySelector('.gallery-arrow-prev');
const galleryNext = document.querySelector('.gallery-arrow-next');
let galleryIndex = 0;

function getVisibleGallerySlides() {
    if (!galleryTrack) return 1;

    const count = parseInt(getComputedStyle(galleryTrack.parentElement).getPropertyValue('--visible-slides'), 10);
    return Number.isNaN(count) ? 1 : count;
}

function getMaxGalleryIndex() {
    return Math.max(gallerySlides.length - getVisibleGallerySlides(), 0);
}

function updateGallery() {
    if (!galleryTrack || !gallerySlides.length) return;

    const gap = parseFloat(getComputedStyle(galleryTrack).gap) || 0;
    const slideWidth = gallerySlides[0].getBoundingClientRect().width + gap;
    galleryIndex = Math.min(galleryIndex, getMaxGalleryIndex());
    galleryTrack.style.transform = `translateX(-${galleryIndex * slideWidth}px)`;
}

function moveGallery(direction) {
    if (!gallerySlides.length) return;

    const maxIndex = getMaxGalleryIndex();
    galleryIndex = galleryIndex + direction;

    if (galleryIndex < 0) galleryIndex = maxIndex;
    if (galleryIndex > maxIndex) galleryIndex = 0;

    updateGallery();
}

galleryPrev?.addEventListener('click', () => moveGallery(-1));
galleryNext?.addEventListener('click', () => moveGallery(1));
window.addEventListener('resize', updateGallery);
updateGallery();

// Form submit
document.getElementById('submit-btn').addEventListener('click', () => {
    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    if (!name || !phone) {
        [document.getElementById('f-name'), document.getElementById('f-phone')].forEach(el => {
            if (!el.value.trim()) { el.style.borderColor='#c62828'; el.focus(); setTimeout(()=>el.style.borderColor='',2000); }
        }); return;
    }
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Отправляем...'; btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Отправить заявку'; btn.disabled = false;
        document.getElementById('form-success').classList.add('show');
        ['f-name','f-phone','f-type','f-msg'].forEach(id => document.getElementById(id).value = '');
        setTimeout(() => document.getElementById('form-success').classList.remove('show'), 5000);
    }, 1500);
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', '#home');
});

// Scroll animations
const animObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; animObs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.product-card, .bakery-item, .recipe-card, .gallery-carousel, .contact-item').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(28px);transition:opacity 0.6s ease,transform 0.6s ease';
    animObs.observe(el);
});
