const API_URL = "http://localhost:3000/products";

// show the product form
function showForm() {
    resetForm();
document.getElementById("productForm").classList.remove("d-none");
}

// function to save the product data
function saveProduct() {
let name = document.getElementById("name").value;
let price = document.getElementById("price").value;
let category = document.getElementById("category").value;
let brand = document.getElementById("brand").value;
let productId = document.getElementById("productId").value;

// check if all fields are filled
if (!name || !price || !category || !brand ) {
alert("Please fill all fields");
return;
}

//cteat product object
let product = { name, price, category, brand,};

// creating new product
if (!productId) {
axios.post(API_URL, product)
    .then(() => {
        resetForm();
        loadProducts();
    })
    .catch(error => console.error("Error adding product:", error));
} else {
axios.put(`${API_URL}/${productId}`, product)
    .then(() => {
        resetForm();
        loadProducts();
    })
    .catch(error => console.error("Error updating product:", error));
}
}

// function to load all products displaying in the table
function loadProducts() {
axios.get(API_URL)
.then(response => {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    response.data.forEach(product => {
        tableBody.innerHTML += `
            <tr id="row-${product.id}">
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>
                    <button class="btn btn-info btn-sm " onclick="editProduct('${product.id}')">Edit <ion-icon name="create"></ion-icon></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Del<ion-icon name="trash"></ion-icon></button>
                </td>
            </tr>
        `;
    });
})
.catch(error => console.error("Error loading products:", error));
}

// function to edit the product data
function editProduct(id) {
axios.get(`${API_URL}/${id}`)
.then(response => {
    let product = response.data;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("brand").value = product.brand;
    document.getElementById("productId").value = product.id;
    document.getElementById("productForm").classList.remove("d-none");
})
.catch(error => console.error("Error fetching product data:", error));
}

// function to delete the product data
function deleteProduct(id) {
if (!confirm("Are you sure you want to delete this product?")) return;
axios.delete(`${API_URL}/${id}`)
.then(() => {
    const row = document.getElementById(`row-${id}`);
    if (row) row.remove(); 
})
.catch(error => console.error("Error deleting product:", error));
}

// function to reset the form 
function resetForm() {
document.getElementById("name").value = "";
document.getElementById("price").value = "";
document.getElementById("category").value = "";
document.getElementById("brand").value = "";
document.getElementById("productId").value = "";
document.getElementById("productForm").classList.add("d-none");
}