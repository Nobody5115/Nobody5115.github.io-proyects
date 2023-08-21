document.addEventListener("DOMContentLoaded", function () {
  function agregarItem(params = {}) {
    const templateEl = document.getElementById("template-card");
    const container = document.querySelector(".proyects");

    if (templateEl) {
      let clone = document.importNode(templateEl.content, true);
      clone.querySelector(".proyect__title").textContent = params.title;
      clone.querySelector(".proyect__description").textContent =
        params.description;
      clone.querySelector(".proyect__link").href = params.url;
      clone.querySelector(".proyect__img").src = params.img;
      container.appendChild(clone);
    }
  }
  function info() {
    return fetch(
      "https://cdn.contentful.com/spaces/8xmknzuz0uyo/environments/master/entries?access_token=Nm6Cjy7Xhze8SYUlOO5y8eN14XSucwAhrhtLT0IDhUc&content_type=work"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const collection = data.items.map((item) => {
          const assetId = item.fields.img.sys.id; // Obtener el ID del asset
          const asset = data.includes.Asset.find((a) => a.sys.id === assetId); // Encontrar el asset en el includes
          const imgURL = asset.fields.file.url; // Obtener la URL de la imagen

          return {
            title: item.fields.titulo,
            description: item.fields.description,
            img: imgURL,
            url: item.fields.url,
          };
        });

        return collection;
      });
  }
  function main() {
    info().then((response) => {
      for (r of response) {
        agregarItem(r);
      }
    });
  }
  main();
});
