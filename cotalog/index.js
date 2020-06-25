//header
const button = document.querySelector(".button");
const drobDawn = document.querySelector(".nav");
const clickLi = document.querySelector(".catalog");
const body = document.querySelector("body");
const product = document.querySelector(".prod");
button.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!drobDawn.classList.contains("block")) {
    drobDawn.classList.add("block", "navScrin");
  } else {
    drobDawn.classList.remove("block", "navScrin");
  }
});
clickLi.addEventListener("click", () => {
  if (!drobDawn.classList.contains("block")) {
    product.classList.add("block");
  } else {
    product.classList.remove("block");
  }
});
body.addEventListener("click", () => {
  drobDawn.classList.remove("block", "navScrin");
});

const buttonsSort = document.querySelectorAll(".controlers button");

const tv = document.querySelector(".TvContent");
const GetTv = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  //flitr in lg
  buttonsSort[0].addEventListener("click", () => {
    filterPr(data, "3");
  });
  //filter in sony
  buttonsSort[1].addEventListener("click", () => {
    filterPr(data, "2");
  });
  //filter in samsung
  buttonsSort[2].addEventListener("click", () => {
    filterPr(data, "1");
  });
  buttonsSort[3].addEventListener("click", () => {
    const sortData = SortPrice(data);
    tv.innerHTML = "";
    sortData.forEach((item) => {
      let exemple = CreateTv(item);
      tv.append(exemple);
      Basket();
    });
  });
  await data.forEach((item) => {
    let exemple = CreateTv(item);
    tv.append(exemple);
  });

  await Basket();
};
const filterPr = (data, id) => {
  const newData = data.filter((item) => item.categoryId === id);
  tv.innerHTML = "";
  newData.forEach((item) => {
    let lg = CreateTv(item);
    tv.append(lg);
    Basket();
  });
};
const CreateTv = (item) => {
  const { name, image, price, id, categoryId } = item;
  const phon = document.createElement("div");
  phon.classList.add("tv");

  phon.innerHTML = `
    <div data-id ='${id}' class = 'elemProduct'>
    <div class='imageProd'>
  <button class = 'logo'
  data-id = '${id}' 
  data-categoryId = '${categoryId}'
  data-name = "${name}"
  data-price= "${price}"
  data-image = "${image[0]}"
  >   
   <img src="../images/logo/download.png" alt="logo"
       
       /></button>
       <button class = 'logo1'
       data-id ='${id}'
        data-categoryId='${categoryId}'
        data-name = "${name}"
       data-price= "${price}"
       data-image = ${image[0]}
       >
      <img src="../images/logo/сирт.png" alt="logo" 
       
        /></button>

      <img src="${image[0]}" alt="logo" class ="Imgelem">
      </div>
      <div>
      <p>${name}</p>
      <p>${price}<span>$</span></p>
      
      </div>
    </div>
  
`;
  return phon;
};
window.addEventListener("DOMContentLoaded", () => {
  GetTv("../../API/tv.json");
});

function Basket() {
  const basketBt = document.querySelectorAll(".logo");
  const likeBt = document.querySelectorAll(".logo1");
  const basketLine = document.querySelector(".bask");
  const likeLine = document.querySelector(".like");
  const selectedProd = document.querySelector(".selectedProd");

  likeLine.innerHTML = `${localStorage.getItem("countLike")} pc`;
  basketLine.innerHTML = `${localStorage.getItem("countBasketPrice")} $`;
  selectedProd.addEventListener("click", (e) => e.stopPropagation());
  let ObjBasket = [];
  let ObjLike = [];
  //price conuter
  function counterPrice(obj) {
    basketLine.innerHTML = "";
    let countBasketPrice = obj.reduce((sum, akk) => {
      return parseInt(sum) + parseInt(akk.price);
    }, 0);

    localStorage.setItem("countBasketPrice", countBasketPrice);
    basketLine.innerHTML = "";
    basketLine.innerHTML = `${localStorage.getItem("countBasketPrice")} $`;
  }
  //like counter
  function counterLike(obj) {
    likeLine.innerHTML = "";

    let countLike = obj.reduce((sum, cur) => {
      return sum + parseInt(cur.counter);
    }, 0);

    localStorage.setItem("countLike", countLike);

    likeLine.innerHTML = `${localStorage.getItem("countLike")} pc`;
  }
  // creat Element in Basket && like
  const apenderElementBasket = (obj, apnding) => {
    obj.forEach((elem) => {
      const el = creatElementBasket(elem);
      apnding.append(el);
    });
  };
  const creatElementBasket = (item) => {
    const { name, image, price, id, counter } = item;

    const elem = document.createElement("div");
    elem.innerHTML = `
   
<div data-id ='${id}' class = 'basketElem'>
<button class ="clearItem" data-id ='${id}'><i class="fas fa-times"></i></button>
  
  <img src="${image}" alt="logo" class ="phonImg">
  <p>${name}</p>
  <p>${counter}</p>
  <p>${price} $</p>
  <button class="buy" data-id ="${id}" data-counter="${counter}">Buy</button>

  
</div>


`;
    return elem;
  };
  //basket inspekt elem function
  basketBt.forEach((elem) => {
    elem.addEventListener("click", () => {
      const { name, image, price, id } = elem.dataset;
      let bull = true;
      if (ObjBasket.length !== 0) {
        ObjBasket.forEach((item) => {
          if (item.id === id) {
            ++item.counter;
            item.price = +item.price + parseInt(price);
            bull = false;
            return null;
          }
        });
        if (bull) {
          ObjBasket.push({
            id,
            price,
            name,
            image,
            counter: 1,
          });
        }
      } else {
        ObjBasket.push({
          id,
          price,
          name,
          image,
          counter: 1,
        });
      }
      localStorage.setItem("basket", JSON.stringify(ObjBasket));

      counterPrice(JSON.parse(localStorage.getItem("basket")));
    });
  });

  const basketClick = document.querySelector(".basketClick");
  const likeClick = document.querySelector(".likeClick");

  basketClick.addEventListener("click", (e) => {
    e.stopPropagation();

    apenderElementBasket(
      JSON.parse(localStorage.getItem("basket")),
      selectedProd
    );
    clearItem(JSON.parse(localStorage.getItem("basket")), "basket");

    if (!selectedProd.classList.contains("block")) {
      selectedProd.classList.add("block");
    } else {
      selectedProd.classList.remove("block");
      selectedProd.innerHTML = "";
    }
  });
  likeClick.addEventListener("click", (e) => {
    e.stopPropagation();

    apenderElementBasket(
      JSON.parse(localStorage.getItem("like")),
      selectedProd
    );
    clearItem(JSON.parse(localStorage.getItem("like")), "like");
    if (!selectedProd.classList.contains("block")) {
      selectedProd.classList.add("block");
    } else {
      selectedProd.classList.remove("block");
      selectedProd.innerHTML = "";
    }
  });
  body.addEventListener("click", () => {
    selectedProd.classList.remove("block");
    selectedProd.innerHTML = "";
  });
  //like inspect elem function
  likeBt.forEach((elem) => {
    elem.addEventListener("click", () => {
      const { name, image, price, id } = elem.dataset;
      let bull = true;
      if (ObjLike.length !== 0) {
        ObjLike.forEach((item) => {
          if (item.id === id) {
            item.counter++;
            item.price = +item.price + parseInt(price);
            bull = false;
            return null;
          }
        });
        if (bull) {
          ObjLike.push({
            id,
            price,
            name,
            image,
            counter: 1,
          });
        }
      } else {
        ObjLike.push({
          id,
          price,
          name,
          image,
          counter: 1,
        });
      }
      localStorage.setItem("like", JSON.stringify(ObjLike));

      counterLike(JSON.parse(localStorage.getItem("like")));
    });
  });
  const clearItem = (obj, prop) => {
    const clearIt = document.querySelectorAll(".clearItem");

    clearIt.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.stopPropagation();

        const { id } = elem.dataset;
        obj.forEach((item, index) => {
          if (item.id === id) {
            obj.splice(index, 1);
          }
        });

        localStorage.setItem(prop, JSON.stringify(obj));
        selectedProd.innerHTML = "";
        if (prop === "like") {
          ObjLike = [...obj];
          counterLike(JSON.parse(localStorage.getItem("like")));
        } else {
          counterPrice(JSON.parse(localStorage.getItem("basket")));
          ObjBasket = [...obj];
        }
        apenderElementBasket(
          JSON.parse(localStorage.getItem(prop)),
          selectedProd
        );
        clearItem(obj, prop);
      });
    });
  };
}

const SortPrice = (data) => {
  return data.sort((b, a) => a.price - b.price);
};
