/*ENTREGA Nª3 / CONSIGNA-2*/

document.addEventListener("DOMContentLoaded", function () {
  const productId = localStorage.getItem("ID_del_producto");

  if (productId) {
    // Realizar la solicitud para obtener los detalles del producto
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
      .then((response) => response.json())
      .then((product) => {
        // Construir el HTML para mostrar los detalles del producto
        const detalleProductoHTML = `
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <p>Precio: ${product.currency} ${product.cost}</p>
          <p>Vendidos: ${product.soldCount}</p>
          `;

        // Mostrar los detalles del producto en la página
        const detalleProductoContainer =
          document.getElementById("detalle-producto");
        detalleProductoContainer.innerHTML = detalleProductoHTML;

        // hacemos un bucle for-of para poder iterar el array de las imágenes correctamente
        for (const image of product.images) {
          const img = document.createElement("img");
          img.src = image;
          img.alt = product.name;

          // mostrar las imágenes del producto en la página
          const imagenProductoContainer =
            document.getElementById("detalle-producto");
          imagenProductoContainer.appendChild(img);
        }
        /*ENTREGA Nª3 / CONSIGNA-3*/
        //crear los comentarios de los productos
        //realizo la solicitud fetch
        fetch(
          `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`
        )
          .then((response) => response.json())
          .then((comments) => {
            console.log(comments);

            for (const comment of comments) {
              const commentHTML = `
          <div class="comments-container">
              <div>
                <div>
                  <div class="user-comment">
                    <div>
                    <p class="user-name">${comment.user.toUpperCase()}</p>
                    </div>
                    <div>
                    <p>${comment.dateTime}</p> 
                    </div>
                  </div>
                  <span class="fa fa-star ${
                    comment.score >= 1 && "checked"
                  }"></span>
                  <span class="fa fa-star ${
                    comment.score >= 2 && "checked"
                  }"></span>
                  <span class="fa fa-star ${
                    comment.score >= 3 && "checked"
                  }"></span>
                  <span class="fa fa-star ${
                    comment.score >= 4 && "checked"
                  }"></span>
                  <span class="fa fa-star ${
                    comment.score >= 5 && "checked"
                  }"></span>
                </div>
                <div>
                  <p>${comment.description}</p>
                </div>
              </div
          </div>`;

              const comments = document.getElementById(
                "product-comment"
              );

              comments.innerHTML += commentHTML;
            }
          });
      });
  }
});
