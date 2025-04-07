/* Sales and inventories granja Sena */

/**
 * @description: Mock base de datos inventario 
 * granja Sena 
*/
let inventory = [
    {id: 1, name: 'Cebolla Larga ', price: 1200, stock: 15, category: 'vegetal'  },
    {id: 2, name: 'Cebolla Colorada ', price: 2000, stock: 5, category: 'vegetal' },
    {id: 3, name: 'Huevo AAA ', price:  17000, stock: 100, category: 'Animal' },
    {id: 4, name: 'Huevo AA ', price:  15000, stock: 50, category: 'Animal' },
    {id: 5, name: ' Papa ', price: 2200, stock: 200, category: 'Tuberculo'  },
    {id: 6, name: ' Papa Criolla ', price: 1500, stock: 100, category: 'Tuberculo'  },
    {id: 7, name: ' Cilantro ', price: 500, stock: 100, category: 'vegetal' },
];
console.log('Este es el inventario', inventory)

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
            <td>${product.price}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>



        `;
        tbody.appendChild(row);

    })
}

