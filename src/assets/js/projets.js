import projets from "../data/projets.json";

const generateModaleContent = (projet) => {
  const holder = document.querySelector(".modale-holder");
  const contentHolder = document.querySelector(".modale-contenu");
  const closeBtn = document.querySelector("[data-modal-close]");

  const header = holder.querySelector("header");

  if (header.querySelector("h2")) {
    header.querySelector("h2").remove();
  }

  const title = document.createElement("h2");
  title.innerText = projet.name;
  header.prepend(title);

  contentHolder.innerHTML = "";

  const img = document.createElement("img");
  img.src = projet.img;
  img.alt = "image du projet" + projet.name;

  contentHolder.append(img);

  const infosHolder = document.createElement("div");
  const typeStackHolder = document.createElement("div");
  typeStackHolder.className = "flex";
  const type = document.createElement("p");
  const stackHolder = document.createElement("ul");
  const stackItems = projet.stack;
  stackItems.forEach((stack) => {
    const item = document.createElement("li");
    item.innerText = stack;
    stackHolder.append(item);
  });
  type.innerText = projet.type;
  typeStackHolder.append(type);
  infosHolder.append(typeStackHolder);
  typeStackHolder.append(stackHolder);

  const descriptionHolder = document.createElement("p");
  descriptionHolder.innerText = projet.description;
  infosHolder.append(descriptionHolder);

  const liensHolder = document.createElement("ul");
  liensHolder.className = "flex gap-5";
  for (let lien in projet.liens) {
    const containerList = document.createElement("li");
    const containerLien = document.createElement("a");
    containerLien.innerText = "voir sur " + lien;
    containerLien.href = lien[lien];
    containerList.append(containerLien);
    liensHolder.append(containerList);
  }
  contentHolder.append(liensHolder);
  contentHolder.append(infosHolder);

  const date = document.createElement("p");
  date.innerText = projet.date;
  holder.classList.remove("hidden");
  contentHolder.append(date);

  closeBtn.addEventListener("click", () => {
    holder.classList.add("hidden");
  });
};

const generateProjectsList = () => {
  const holder = document.querySelector(".projets-holder");

  projets.forEach((projet) => {
    const cardHolder = document.createElement("div");
    cardHolder.className = "col-start-" + projet.colStart;
    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.innerText = projet.name;
    header.append(title);
    cardHolder.append(header);

    const img = document.createElement("img");
    img.src = projet.img;
    img.alt = "image du projet " + projet.name;
    cardHolder.append(img);

    const typeP = document.createElement("p");
    typeP.innerText = projet.type;
    cardHolder.append(typeP);

    const modalBtn = document.createElement("button");
    modalBtn.innerText = "En savoir plus";
    modalBtn.ariaLabel = modalBtn.innerText + "-" + projet.name;
    cardHolder.append(modalBtn);
    modalBtn.addEventListener("click", () => {
      generateModaleContent(projet);
    });

    holder.append(cardHolder);
  });
};

generateProjectsList();
