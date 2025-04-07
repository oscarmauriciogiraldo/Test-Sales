/* Sales and inventories granja Sena */

/* Contantes botones  */
/* const addModal = document.getElementById('addProduct'); */
const modal = document.getElementById('add-product')

const buttonOpenAdd  = document.getElementById('openModal')

/**
 * @description: Mock base de datos inventario 
 * granja Sena 
*/
let inventory = [
    {id: 1, name: 'Cebolla Larga ', description: 'Cebollin o cebolla larga, Precio por Kilo', price: 1200, stock: 15, category: 'vegetal'  },
    {id: 2, name: 'Cebolla Colorada ', description: 'Cebolla roja, cebolla colorada', price: 2000, stock: 5, category: 'vegetal' },
    {id: 3, name: 'Huevo AAA ', description: 'Panal o Canasta', price:  17000, stock: 100, category: 'Animal' },
    {id: 4, name: 'Huevo AA ', description: 'Panal o Canasta', price:  15000, stock: 50, category: 'Animal' },
    {id: 5, name: ' Papa ', description: 'Papa sucia', price: 2200, stock: 200, category: 'Tuberculo'  },
    {id: 6, name: ' Papa Criolla ', description: 'Paquete de papa por Kilo', price: 1500, stock: 100, category: 'Tuberculo'  },
    {id: 7, name: ' Cilantro ', description: 'Manojo de cilantro', price: 500, stock: 100, category: 'vegetal' },
];
console.log('Este es el inventario', inventory)
/* **** Function Abrir modal para agregar producto **** */
const openModal = () => {
    console.log('click')
    //modal.classList.remove('addingProduct')
    modal.classList.add('show-modal')
}

buttonOpenAdd.addEventListener('click',  async () => {
    openModal()   
})

/* *** Renderizar inventario en el front *** */
const renderInventory = () => {
    const tbody = document.getElementById('productsInventory')
    tbody.innerHTML = "";

    inventory.forEach(product => {
        /* productos con bajo stock o sin stock */
        const row = document.createElement("tr")

        if(product.stock === 0){
            /* Si estrictamente en stock no hay productos
            esta fila mostrara otro color */
            row.classList.add('out-of-stock')
        }else if(product.stock < 5) {
            /* Señala cuando se acaban los productos del stock */
            row.classList.add('low-stock')
        }

        /* *** Renderiza y crea una etiqueta <td> para cada producto y  */
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price.toFixed(2)} - COP</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="restockProduct(${product.id})">Reabastecer (+5)</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    })

    /* Actualizar select de los prodcutos */
    upDateProductSelect();
}



/* *** agregar nuevos producttos a la base de datos */
const addproduct = () => {
    console.log('Funcion agregar producto')
}

const deleteProduct = () => {
    console.log('Producto eliminado')
}

/* **** Reabastecer stock de un producto ***** */
const restockProduct = () =>{
    console.log('agregando productos al stock de cada uno')
}

const upDateProductSelect = () => {
    console.log('Actualiza select de la lista')
}

const makeSale = () => {
    console.log('Registra una nueva venta')
}

document.addEventListener("DOMContentLoaded", renderInventory);


