let chart;

document.addEventListener('DOMContentLoaded', () => {
    loadInventory();
    loadSalesChart();
    
    document.getElementById('addItemForm').addEventListener('submit', addItem);
    document.getElementById('saleForm').addEventListener('submit', recordSale);
});

async function loadInventory() {
    const response = await fetch('php/get_items.php');
    const items = await response.json();
    
    const tbody = document.getElementById('inventoryBody');
    const saleSelect = document.getElementById('saleItem');
    tbody.innerHTML = '';
    saleSelect.innerHTML = '<option value="">Pilih Barang</option>';
    
    items.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rp ${item.price}</td>
                <td><button class="delete-btn" onclick="deleteItem(${item.id})">Hapus</button></td>
            </tr>
        `;
        saleSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });
}

async function addItem(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const qty = document.getElementById('itemQty').value;
    const price = document.getElementById('itemPrice').value;
    
    await fetch('php/add_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${name}&quantity=${qty}&price=${price}`
    });
    
    loadInventory();
    e.target.reset();
}

async function deleteItem(id) {
    await fetch('php/delete_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    });
    loadInventory();
}

async function recordSale(e) {
    e.preventDefault();
    const itemId = document.getElementById('saleItem').value;
    const qty = document.getElementById('saleQty').value;
    
    await fetch('php/record_sale.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `item_id=${itemId}&quantity=${qty}`
    });
    
    loadInventory();
    loadSalesChart();
    e.target.reset();
}

async function loadSalesChart() {
    const response = await fetch('php/get_sales.php');
    const sales = await response.json();
    
    const ctx = document.getElementById('salesChart').getContext('2d');
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sales.map(s => s.item_name),
            datasets: [{
                label: 'Jumlah Terjual',
                data: sales.map(s => s.quantity),
                backgroundColor: '#7b5e9e'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}