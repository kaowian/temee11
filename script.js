
let prices = JSON.parse(localStorage.getItem('prices')) || {
  "เบียร์ช้าง": 18,
  "เบียร์ลีโอ": 10,
  "ไฮเนเก้น620": 16,
  "น้ำปลาคอยาว": 21,
  "น้ำหวาน": 15,
  "พรทิพย์": 23,
  "หงส์แบนตัวนูน": 11,
  "หงส์ใหม่ตัวนูน": 18,
  "สิงห์ใหญ่": 9,
  "สิงห์เล็ก": 15,
  "เหล้าใหญ่": 14,
  "เหล้าเล็ก": 25,
  "แสงกลม": 23,
  "เหล้าใหญ่รวงข้าว": 11,
  "เหล้าเล็กรวงข้าว": 21,
  "เหล้าใหญ่ตะวันแดง": 11,
  "700cc": 21
};

const itemTable = document.getElementById("itemTable");

function renderItems() {
  itemTable.innerHTML = '';
  Object.entries(prices).forEach(([name, price]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" value="${name}" onchange="renameItem('${name}', this.value)"></td>
      <td><input type="number" id="price_${name}" value="${price}" onchange="updatePrice('${name}', this.value)"></td>
      <td><input type="number" id="qty_${name}" min="0" value="0" style="width: 60px;"></td>
      <td class="actions">
        <button class="delete" onclick="deleteItem('${name}')">ลบ</button>
      </td>
    `;
    itemTable.appendChild(row);
  });
}

function renameItem(oldName, newName) {
  if (newName && !prices[newName]) {
    prices[newName] = prices[oldName];
    delete prices[oldName];
    renderItems();
  }
}

function updatePrice(name, newPrice) {
  prices[name] = parseFloat(newPrice);
}

function deleteItem(name) {
  delete prices[name];
  renderItems();
}

function addItem() {
  let newName = prompt("ชื่อสินค้าใหม่:");
  if (newName && !prices[newName]) {
    prices[newName] = 0;
    renderItems();
  }
}

function saveChanges() {
  localStorage.setItem('prices', JSON.stringify(prices));
  alert("ข้อมูลสินค้าถูกบันทึกเรียบร้อยแล้ว ✅");
}

function generateReceipt() {
  const customer = document.getElementById('customer').value;
  const rItems = document.getElementById('r_items');
  const rTotal = document.getElementById('r_total');
  const rCustomer = document.getElementById('r_customer');
  const rDate = document.getElementById('r_date');
  rItems.innerHTML = '';
  let total = 0;

  Object.keys(prices).forEach(name => {
    const qtyInput = document.getElementById(`qty_${name}`);
    const priceInput = document.getElementById(`price_${name}`);
    if (qtyInput && priceInput) {
      const qty = parseInt(qtyInput.value);
      const price = parseFloat(priceInput.value);
      if (qty > 0) {
        const itemTotal = price * qty;
        total += itemTotal;
        const li = document.createElement('li');
        li.textContent = `${name} x ${qty} = ${itemTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`;
        rItems.appendChild(li);
      }
    }
  });

  rCustomer.textContent = customer;
  rDate.textContent = new Date().toLocaleDateString('th-TH');
  rTotal.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('receipt').style.display = 'block';
}

renderItems();
