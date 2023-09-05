
class MenuItem {
    constructor(type, harga, stok) {
        this.type = type;
        this.harga = harga;
        this.stok = stok;
    }
}

class Money {
    constructor(money) {
        this.money = money;
    }
}

class VendingMachine {
    constructor(menu, requireMoney) {
        this.menu = menu;
        this.requireMoney = requireMoney;
        this.selectedItem = null;
        this.selectedMoney = null;
    }

    selectItem(item) {
        this.selectedItem = item;
    }

    selectMoney(money) {
        this.selectedMoney = money;
    }

    buyItem() {
        if (!this.selectedItem || !this.selectedMoney) {
            return "Pilih makanan dan masukkan uang Anda terlebih dahulu.";
        }

        const selectedItem = this.menu.find((item) => item.type === this.selectedItem.type);

        if (!selectedItem) {
            return "Makanan tidak ditemukan.";
        }

        if (selectedItem.stok === 0) {
            return "Maaf, makanan telah habis.";
        }

        if (this.selectedMoney.money < selectedItem.harga) {
            return "Maaf, uang Anda kurang dari harga makanan.";
        }

        const kembalian = this.selectedMoney.money - selectedItem.harga;
        selectedItem.stok--;
        return `Terima kasih! Uang kembalian Anda: ${kembalian}`;
    }
}

const menu = [
    new MenuItem("Biskuit", 6000, 10),
    new MenuItem("Chips", 8000, 0),
    new MenuItem("Oreo", 10000, 7),
    new MenuItem("Tanggo", 12000, 3),
    new MenuItem("Cokelat", 15000, 8),
];

const requireMoney = [
    new Money(2000),
    new Money(5000),
    new Money(10000),
    new Money(20000),
    new Money(50000),
];

const selectMakanan = document.getElementById("type-makanan");
const selectedHarga = document.getElementById("harga-makanan");
const vendingMoney = document.getElementById("require-money");
const selectedStok = document.getElementById("stok-makanan");
const buyButton = document.getElementById("buy");
const changeMoney = document.getElementById("change-money");

// Mengisi elemen <select> dengan opsi-opsi dari array menu
for (let i = 0; i < menu.length; i++) {
    const option = document.createElement("option");
    option.text = menu[i].type;
    selectMakanan.appendChild(option);
}

for (let i = 0; i < requireMoney.length; i++) {
    const optionMoney = document.createElement("option");
    optionMoney.text = requireMoney[i].money;
    vendingMoney.appendChild(optionMoney);
}

const vendingMachine = new VendingMachine(menu, requireMoney);


selectMakanan.addEventListener("change", function () {
    const selectedOption =
        selectMakanan.options[selectMakanan.selectedIndex];
    const selectedType = selectedOption.text;

    
    const selectedMenuItem = menu.find(
        (item) => item.type === selectedType
    );


    selectedHarga.textContent = `Harga Makanan: ${selectedMenuItem.harga}`;

    
    if (selectedMenuItem.stok === 0) {
        selectedStok.textContent = "Makanan Telah Habis";
    } else {
        selectedStok.textContent = `Tersedia: ${selectedMenuItem.stok}`;
    }

    
    vendingMachine.selectItem(selectedMenuItem);
});


buyButton.addEventListener("click", function () {
    const selectedOptionMoney =
        vendingMoney.options[vendingMoney.selectedIndex];
    const selectedMoney = parseInt(selectedOptionMoney.text);

    vendingMachine.selectMoney(new Money(selectedMoney));

    const result = vendingMachine.buyItem();
    changeMoney.textContent = result;
});