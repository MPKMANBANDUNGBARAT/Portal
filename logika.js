const products = [
    {
        id: 1,
        name: "Lanyard Premium MPK",
        price: "15000",
        stock: 5,
        sold: "45",
        rating: "4.9",
        image: "foto/lanyard.jpg",
        category: "Aksesoris",
        desc: "Lanyard kualitas premium dengan bahan tisu lembut. Cocok untuk kartu pelajar atau id card panitia."
    },
    {
        id: 2,
        name: "Basreng Pedas Daun Jeruk",
        price: "5000",
        stock: 0, // Contoh stok habis
        sold: "210",
        rating: "5.0",
        image: "foto/basreng.jpg",
        category: "Makanan",
        desc: "Basreng renyah dengan bumbu pedas melimpah dan aroma daun jeruk yang segar."
    },
    {
        id: 3,
        name: "Brownies Lumer Cup",
        price: "10000",
        stock: 5,
        sold: "85",
        rating: "4.9",
        image: "foto/brownies.jpg",
        category: "Makanan",
        desc: "Brownies cokelat lumer di dalam cup. Manisnya pas!"
    },
    {
        id: 4,
        name: "SYNDICATE 06 // BATCH 01",
        price: "85000",
        stock: 5,
        sold: "12",
        rating: "5.0",
        image: "foto/tshirt.jpg",
        category: "Pakaian",
        desc: "Kaos eksklusif SYNDICATE 06. Bahan katun combed 30s."
    }
];

function renderProducts(productsToRender) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    productsToRender.forEach(p => {
        const isOutOfStock = p.stock <= 0;
        const card = document.createElement('div');
        // Tambahkan efek grayscale jika stok habis
        card.className = `item-card group relative cursor-pointer ${isOutOfStock ? 'opacity-70 grayscale' : ''}`;
        
        card.innerHTML = `
            <div class="relative overflow-hidden aspect-square">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                ${isOutOfStock ? `
                    <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span class="border-2 border-white px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase rotate-[-15deg]">HABIS</span>
                    </div>
                ` : ''}
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-white">Lihat Detail</span>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-[11px] font-bold uppercase tracking-tighter text-zinc-400">${p.category}</h3>
                    <div class="flex items-center gap-1">
                        <i class="fa-solid fa-star text-[8px] text-yellow-500"></i>
                        <span class="text-[9px] font-bold text-zinc-500">${p.rating}</span>
                    </div>
                </div>
                <h2 class="text-sm font-black italic uppercase tracking-tighter mb-2 line-clamp-1">${p.name}</h2>
                <div class="flex items-center justify-between">
                    <span class="text-red-500 font-black text-sm tracking-tighter">Rp${parseInt(p.price).toLocaleString('id-ID')}</span>
                    <span class="text-[9px] text-zinc-600 font-bold uppercase">${p.sold} Terjual</span>
                </div>
            </div>
        `;

        // Jangan izinkan klik jika stok habis
        if (!isOutOfStock) {
            card.onclick = () => {
                const params = new URLSearchParams({
                    name: p.name,
                    price: p.price,
                    img: p.image,
                    desc: p.desc,
                    cat: p.category
                });
                window.location.href = `product-detail.html?${params.toString()}`;
            };
        }
        
        grid.appendChild(card);
    });
}

// Inisialisasi Event Listener
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);

    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function filterAll() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';

        const filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }

    if(searchInput) searchInput.addEventListener('input', filterAll);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-[#8b0000]', 'text-white'));
            btn.classList.add('active', 'bg-[#8b0000]', 'text-white');
            filterAll();
        });
    });
});

