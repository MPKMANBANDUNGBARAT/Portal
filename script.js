lucide.createIcons();

const scriptURL = 'https://script.google.com/macros/s/AKfycbyWZkti9R-zZ-AbrefuuAXaxYPhxXHnntxsdyj0NUF2TpYIoSfXvwMoFWxQH7tzLTAPDw/exec'; 

// Navigasi Form
function showForm(title) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('jenis_aspirasi').value = title;
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function hideForm() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('form-section').classList.add('hidden');
}

// Navigasi Menu Samping
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('active');
    
    // Logic CSS untuk membuka menu (karena menggunakan Tailwind translate-x-full)
    if (menu.classList.contains('active')) {
        menu.classList.remove('translate-x-full');
    } else {
        menu.classList.add('translate-x-full');
    }

    const isOpened = menu.classList.contains('active');
    icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
    lucide.createIcons();
}

// Navigasi Struktur
function showStruktur() {
    if (document.getElementById('side-menu').classList.contains('active')) {
        toggleMenu(); 
    }
    document.getElementById('main-menu').classList.add('hidden');
    document.querySelector('header').classList.add('hidden');
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('struktur-section').classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function hideStruktur() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.querySelector('header').classList.remove('hidden');
    document.getElementById('struktur-section').classList.add('hidden');
}

// --- LOGIC KIRIM FORM & MODAL ---
const form = document.getElementById('aspirasi-form');
const btn = document.getElementById('submit-btn');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Mengirim...`;

    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
    .then(() => {
        openModal();
        btn.disabled = false;
        btn.innerText = "Kirim Aspirasi";
        form.reset();
        hideForm();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Gagal mengirim. Silakan periksa koneksi internet Anda.");
        btn.disabled = false;
        btn.innerText = "Kirim Aspirasi";
    });
});

function openModal() {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('opacity-0', 'scale-90');
        content.classList.add('opacity-100', 'scale-100');
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('modal-content');
    content.classList.remove('opacity-100', 'scale-100');
    content.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 400); 
}

