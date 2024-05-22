const btag = document.querySelector("#bb");
const orderCount = document.querySelector("#order_count");
const orderName = document.querySelector("#order_name");
const tbody = document.querySelector("#tbody");
const pElem = document.querySelector("#total");

let all = 0;
const orders = [];
const menu = [
  { name: "قهوه ترک", price: 40 },
  { name: "موکا کولا", price: 55 },
  { name: "آیس موکا", price: 35 },
  { name: "آفوگاتو", price: 15 },
  { name: "آیس کافی ", price: 20 },
  { name: "کاپوچینو", price: 30 },
  { name: "لاته", price: 25 },
  { name: "اسپرسو ", price: 50 },
  { name: "موکا", price: 55 },
];

btag.addEventListener("click", () => {
  const name = orderName.value;
  const count = Number(orderCount.value);
  const product = findProduct(name);

  if (!product || count <= 0) {
    alert("محصول معتبر یا تعداد صحیح وارد کنید");
    return;
  }

  const order = {
    id: orders.length + 1,
    name,
    count,
    price: product.price,
    totalprice: product.price * count,
  };

  orders.push(order);
  addOrderToTable(order);
  updateTotalPrice(order.totalprice);

  console.log(orders);
});

function findProduct(name) {
  return menu.find((item) => item.name === name);
}

function addOrderToTable(order) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${order.id}</td>
    <td>${order.name}</td>
    <td>${order.count}</td>
    <td>${order.price}</td>
    <td>${order.totalprice}</td>
    <td><button class="pointer" key="${order.totalprice}">حذف</button></td>
  `;

  tbody.appendChild(tr);
}

function updateTotalPrice(amount) {
  all += amount;
  pElem.textContent = `قیمت کل : ${all}`;
}

function removeOrder(tr, totalprice) {
  all -= totalprice;
  if (all < 0) all = 0;
  pElem.textContent = `قیمت کل : ${all}`;
  tr.remove();
}

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("pointer")) {
    const tr = e.target.closest("tr");
    const totalPrice = Number(tr.children[4].textContent);
    removeOrder(tr, totalPrice);
  }
});
