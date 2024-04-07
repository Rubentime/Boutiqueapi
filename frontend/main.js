// main.js

// Fonction pour récupérer et afficher les produits sur la page produits
// Fonction pour récupérer et afficher les produits sur la page produits
function getProducts() {
    fetch('http://localhost:3000/api/truc')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Effacer le contenu précédent
        data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item'); // Ajouter la classe product-item
            // Créer un lien dynamique avec l'ID du produit comme paramètre
            const productLink = document.createElement('a');
            productLink.href = `products-detail.html?id=${product._id}`; // Utiliser _id pour l'ID du produit
            // Contenu de l'élément de produit
            productLink.innerHTML = `
                <img src="${product.urlimd}" alt="${product.nom_du_produit}">
                <h3>${product.nom_du_produit}</h3>
                <p>Prix: ${product.prix}</p>
            `;
            // Ajouter le lien à l'élément de produit
            productItem.appendChild(productLink);
            // Ajouter l'élément de produit à la liste des produits
            productList.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error:', error));
}


// Fonction pour ajouter un nouveau produit
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productUrl = document.getElementById('productUrl').value;

    fetch('http://localhost:3000/api/truc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom_du_produit: productName,
            prix: productPrice,
            urlimd: productUrl
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added:', data);
        // Actualiser la liste des produits après l'ajout
        getProducts();
        window.location.href = 'products.html';
    })
    .catch(error => console.error('Error:', error));
}

// Appeler la fonction getProducts au chargement de la page produits
window.addEventListener('DOMContentLoaded', getProducts);

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'identifiant du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if(productId) {
        // Effectuer une requête GET pour récupérer les détails du produit uniquement si l'ID du produit est défini
        fetch(`http://localhost:3000/api/truc/${productId}`)
        .then(response => response.json())
        .then(data => {
            const produit = data.produit; // Accéder à l'objet produit dans data
            // Afficher les détails du produit sur la page
            document.getElementById('productTitle').innerText = `Détails de ${produit.nom_du_produit}`;
            document.getElementById('productDetails').innerHTML = `
                <p><strong>Image:</strong> <img src="${produit.urlimd}" alt="${produit.nom_du_produit}"></p>
                <p><strong>Nom du Produit:</strong> ${produit.nom_du_produit}</p>
                <p><strong>Prix du Produit:</strong> ${produit.prix}</p>
            `;
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('Product ID is null');
    }
});


function redirectToEditPage() {
    // Récupérer l'ID du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Rediriger vers la page modification.html avec l'ID du produit
    window.location.href = `modification.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'identifiant du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Effectuer une requête GET pour récupérer les détails du produit
    fetch(`http://localhost:3000/api/truc/${productId}`)
    .then(response => response.json())
    .then(data => {
        const produit = data.produit; // Accéder à l'objet produit dans data
        // Pré-remplir les champs du formulaire avec les informations actuelles du produit
        document.getElementById('productName').value = produit.nom_du_produit;
        document.getElementById('productPrice').value = produit.prix;
        document.getElementById('productUrl').value = produit.urlimd;
    })
    .catch(error => console.error('Error:', error));
});


function submitEditForm(productId) {
    // Récupérer les nouvelles valeurs du produit à partir du formulaire
    const newName = document.getElementById('productName').value;
    const newPrice = document.getElementById('productPrice').value;
    const newImageUrl = document.getElementById('productUrl').value;

    // Récupérer l'identifiant du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productIdd = urlParams.get('id');
    // Envoyer une requête PUT pour mettre à jour le produit
    fetch(`http://localhost:3000/api/truc/${productIdd}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom_du_produit: newName,
            prix: newPrice,
            urlimd: newImageUrl
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product updated:', data);
        // Rediriger vers la page principale des produits après la mise à jour
        window.location.href = 'products.html';
    })
    .catch(error => console.error('Error:', error));
};

// Fonction pour supprimer un produit
function deleteProduct(productId) {
    // Récupérer l'identifiant du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productIds = urlParams.get('id');

    fetch(`http://localhost:3000/api/truc/${productIds}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Product deleted successfully');
            // Rediriger vers la page principale des produits après la suppression
            window.location.href = 'products.html';
        } else {
            console.error('Failed to delete product');
        }
    })
    .catch(error => console.error('Error:', error));
}

function inscription() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Envoi de la requête POST au backend pour l'inscription
    fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            // Redirection vers la page products.html après l'inscription réussie
            window.location.href = 'products.html';
        } else {
            // Gestion des erreurs d'inscription
            response.json().then(data => alert(data.message));
        }
    })
    .catch(error => console.error('Error:', error));
}

function connexion() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Envoi de la requête POST au backend pour la connexion
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            // Redirection vers la page products.html après la connexion réussie
            window.location.href = 'products.html';
        } else {
            // Gestion des erreurs de connexion
            response.json().then(data => alert(data.message));
        }
    })
    .catch(error => console.error('Error:', error));
}

