

<script>
        // Simulación de base de datos de inventario
        let inventory = [
            { id: 1, name: "Laptop HP", description: "Laptop HP 15-dw1005la", price: 12500.00, stock: 15, category: "Electrónicos" },
            { id: 2, name: "Mouse Inalámbrico", description: "Mouse Logitech M185", price: 299.00, stock: 42, category: "Accesorios" },
            { id: 3, name: "Teclado Mecánico", description: "Teclado Redragon Kumara", price: 899.00, stock: 8, category: "Accesorios" },
            { id: 4, name: "Monitor 24\"", description: "Monitor Samsung F24T350", price: 3499.00, stock: 5, category: "Electrónicos" },
            { id: 5, name: "Impresora Multifuncional", description: "Epson EcoTank L3210", price: 4999.00, stock: 0, category: "Electrónicos" }
        ];

        // Función para renderizar la tabla de inventario
        function renderInventory() {
            const tbody = document.getElementById("inventoryBody");
            tbody.innerHTML = "";
            
            inventory.forEach(product => {
                const row = document.createElement("tr");
                
                // Resaltar productos con bajo stock o sin stock
                if (product.stock === 0) {
                    row.classList.add("out-of-stock");
                } else if (product.stock < 5) {
                    row.classList.add("low-stock");
                }
                
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>${product.category}</td>
                    <td>
                        <button onclick="restockProduct(${product.id})">Reabastecer (+5)</button>
                        <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Actualizar el select de productos para ventas
            updateProductSelect();
        }

        // Función para actualizar el select de productos
        function updateProductSelect() {
            const select = document.getElementById("productSelect");
            select.innerHTML = "";
            
            inventory.filter(product => product.stock > 0).forEach(product => {
                const option = document.createElement("option");
                option.value = product.id;
                option.textContent = `${product.name} - $${product.price.toFixed(2)} (Disponibles: ${product.stock})`;
                select.appendChild(option);
            });
        }

        // Función para registrar una venta
        function makeSale() {
            const productId = parseInt(document.getElementById("productSelect").value);
            const quantity = parseInt(document.getElementById("quantityInput").value);
            const resultDiv = document.getElementById("saleResult");
            
            if (!productId || quantity <= 0) {
                resultDiv.innerHTML = "<p style='color:red;'>Por favor seleccione un producto y una cantidad válida</p>";
                return;
            }
            
            const productIndex = inventory.findIndex(p => p.id === productId);
            
            if (productIndex === -1) {
                resultDiv.innerHTML = "<p style='color:red;'>Producto no encontrado</p>";
                return;
            }
            
            if (inventory[productIndex].stock < quantity) {
                resultDiv.innerHTML = `<p style='color:red;'>No hay suficiente stock. Solo quedan ${inventory[productIndex].stock} unidades</p>`;
                return;
            }
            
            // Actualizar stock
            inventory[productIndex].stock -= quantity;
            
            // Calcular total
            const total = inventory[productIndex].price * quantity;
            
            // Mostrar resultado
            resultDiv.innerHTML = `
                <p style='color:green;'>Venta registrada exitosamente</p>
                <p>Producto: ${inventory[productIndex].name}</p>
                <p>Cantidad: ${quantity}</p>
                <p>Total: $${total.toFixed(2)}</p>
            `;
            
            // Actualizar la tabla y el select
            renderInventory();
            
            // Resetear cantidad
            document.getElementById("quantityInput").value = 1;
        }

        // Función para agregar un nuevo producto
        function addProduct() {
            const name = document.getElementById("newProductName").value;
            const description = document.getElementById("newProductDesc").value;
            const price = parseFloat(document.getElementById("newProductPrice").value);
            const stock = parseInt(document.getElementById("newProductStock").value);
            const category = document.getElementById("newProductCategory").value;
            const resultDiv = document.getElementById("addProductResult");
            
            if (!name || isNaN(price) {
                resultDiv.innerHTML = "<p style='color:red;'>Nombre y precio son requeridos</p>";
                return;
            }
            
            // Generar nuevo ID
            const newId = inventory.length > 0 ? Math.max(...inventory.map(p => p.id)) + 1 : 1;
            
            // Crear nuevo producto
            const newProduct = {
                id: newId,
                name: name,
                description: description,
                price: price,
                stock: stock,
                category: category
            };
            
            // Agregar al inventario
            inventory.push(newProduct);
            
            // Mostrar resultado
            resultDiv.innerHTML = `<p style='color:green;'>Producto "${name}" agregado con ID ${newId}</p>`;
            
            // Actualizar la tabla
            renderInventory();
            
            // Limpiar formulario
            document.getElementById("newProductName").value = "";
            document.getElementById("newProductDesc").value = "";
            document.getElementById("newProductPrice").value = "";
            document.getElementById("newProductStock").value = "";
            document.getElementById("newProductCategory").value = "";
        }

        // Función para reabastecer un producto
        function restockProduct(productId) {
            const productIndex = inventory.findIndex(p => p.id === productId);
            
            if (productIndex !== -1) {
                inventory[productIndex].stock += 5;
                renderInventory();
                alert(`Se han agregado 5 unidades de ${inventory[productIndex].name}`);
            }
        }

        // Función para eliminar un producto
        function deleteProduct(productId) {
            if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                inventory = inventory.filter(p => p.id !== productId);
                renderInventory();
            }
        }

        // Inicializar la tabla al cargar la página
        document.addEventListener("DOMContentLoaded", renderInventory);
    </script>




<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Módulo de Ventas e Inventario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .low-stock {
            background-color: #ffdddd;
        }
        .out-of-stock {
            background-color: #ffb3b3;
            color: #ff0000;
        }
        .form-group {
            margin-bottom: 15px;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            margin-right: 5px;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>Módulo de Ventas e Inventario</h1>
    
    <div>
        <h2>Inventario Actual</h2>
        <table id="inventoryTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio Unitario</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="inventoryBody">
                <!-- Los datos se llenarán con JavaScript -->
            </tbody>
        </table>
    </div>
    
    <div>
        <h2>Registrar Venta</h2>
        <div class="form-group">
            <label for="productSelect">Producto:</label>
            <select id="productSelect"></select>
        </div>
        <div class="form-group">
            <label for="quantityInput">Cantidad:</label>
            <input type="number" id="quantityInput" min="1" value="1">
        </div>
        <button onclick="makeSale()">Registrar Venta</button>
        <div id="saleResult"></div>
    </div>
    
    <div>
        <h2>Agregar Producto</h2>
        <div class="form-group">
            <label for="newProductName">Nombre:</label>
            <input type="text" id="newProductName" required>
        </div>
        <div class="form-group">
            <label for="newProductDesc">Descripción:</label>
            <input type="text" id="newProductDesc">
        </div>
        <div class="form-group">
            <label for="newProductPrice">Precio:</label>
            <input type="number" id="newProductPrice" min="0" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="newProductStock">Stock Inicial:</label>
            <input type="number" id="newProductStock" min="0" required>
        </div>
        <div class="form-group">
            <label for="newProductCategory">Categoría:</label>
            <input type="text" id="newProductCategory">
        </div>
        <button onclick="addProduct()">Agregar Producto</button>
        <div id="addProductResult"></div>
    </div>

    
</body>
</html>