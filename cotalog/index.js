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
      clickEleme();
    });
  });
  await data.forEach((item) => {
    let exemple = CreateTv(item);
    tv.append(exemple);
  });

  await Basket();
  await clickEleme();
};
const filterPr = (data, id) => {
  const newData = data.filter((item) => item.categoryId === id);
  tv.innerHTML = "";
  newData.forEach((item) => {
    let lg = CreateTv(item);
    tv.append(lg);
    Basket();
    clickEleme();
  });
};
const CreateTv = (item) => {
  const { name, image, price, id, categoryId } = item;
  const phon = document.createElement("div");
  phon.classList.add("tv");

  phon.innerHTML = `
    <div data-id ='${id}' class = 'elemProduct elemId'  >
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
  if (body.dataset.type === "phone") {
    GetTv("../API/phones.json");
  } else {
    GetTv("../../API/tv.json");
  }
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
    buy();
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

let productInfos = document.querySelector(".productInfo");
const main = document.querySelector(".main");
const GetInfo = async (url, id) => {
  const response = await fetch(url);
  const data = await response.json();
  const findId = await filterProducts(data, id);
  const elem = await paintProduct(findId);
  productInfos.innerHTML = "";
  await productInfos.append(elem);
  await eventer();
  await selectBox();
  await Basket("logoBk", "logoLk");

  await BUY();
};
const filterProducts = (data, id) => {
  return data.find((item) => item.id === id);
};
const paintProduct = (data) => {
  const element = document.createElement("div");
  const { price, name, id, categoryId, size, display, image } = data;
  element.innerHTML = `
  <div class="infProd" data-id =${id} data-categoryId =${categoryId}>
    <div class="imagess">
        <img src=${image[0]} alt="img" class="bigImage">
        <div class="smallImages">
            <img src=${image[0]} alt="log" >
            <img src=${image[1]} alt="log" >
            <img src=${image[2]} alt="log">
        </div>
    </div>
    <div class="infos">
        <p><span> NAME: </span>${name}</p>
        <p><span> PRICE:</span> ${price}$</p>
        <p><span> SIZE:</span> ${size}</p>
        <p><span> DISPLAY:</span>${display}</p>
        <div class="buttonss">
         
          <button class="BUY"
          data-id ='${id}' 
          data-categoryId='${categoryId}'
            data-name = "${name}"
           data-price= "${price}"
           data-image = "${image[0]}"
          >BUY</button>
        </div>
    </div>
</div>
  `;
  return element;
};
function eventer() {
  const bt = document.querySelectorAll(".smallImages img");
  const img = document.querySelector(".bigImage");

  bt.forEach((elem) => {
    elem.addEventListener("click", () => {
      img.src = elem.src;
    });
  });
}
function selectBox() {
  if (!main.classList.contains("unbox")) {
    main.classList.add("unbox");
  } else {
    main.classList.remove("unbox");
  }
  if (!productInfos.classList.contains("block")) {
    productInfos.classList.add("block");
  } else {
    productInfos.classList.remove("block");
  }
}

const clickEleme = () => {
  const elementProduct = document.querySelectorAll(".elemId");
  console.log(elementProduct);

  window.addEventListener("hashchange", Hashchange);
  elementProduct.forEach((elem) => {
    console.log("aa");

    const { id, type } = elem.dataset;
    elem.addEventListener("click", () => {
      {
        window.location.href = `#${type}/#${id}`;
      }
    });
  });
};
const LinkProd = document.querySelectorAll(".LinkProd");

LinkProd.forEach((elem) => {
  const { type } = elem.dataset;
  elem.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(type);

    if (type === "phone") {
      window.location.assign("../../cotalog/phone.html");
    } else {
      window.location.assign("../../cotalog/tv.html");
    }
  });
});
const fetchPost = async (data) => {
  const dataPost = await JSON.stringify(data);
  await fetch(url, { method: "POST", body: data });
};

function BUY() {
  const BUY = document.querySelector(".BUY");
  BUY.addEventListener("click", () => {
    const { id } = BUY.dataset;
    console.log(id);

    //fetchPost(JSON.stringify({ id }));
  });
}
function Hashchange() {
  const hash = location.hash ? location.hash.slice(1) : "";
  const param = hash.split("/#");

  if (param[0] === "phone") {
    GetInfo("../../API/phones.json", param[1]);
  } else if ((param[0] === "tv", param[1])) {
    GetInfo("../../API/tv.json", param[1]);
  } else {
    main.classList.remove("unbox");
    productInfos.classList.remove("block");
  }
}
const fetchingValue = {};
const buyingButton = document.querySelector(".Buying button");
const Buying = document.querySelector(".Buying");
function buy() {
  console.log("l");

  const buy = document.querySelectorAll(".buy");
  let fetchData = {};
  buy.forEach((elem) => {
    console.log("aa");

    elem.addEventListener("click", (e) => {
      e.stopPropagation();
      const { id, counter } = elem.dataset;

      fetchingValue.id = id;
      fetchingValue.counter = counter;
      console.log(fetchingValue);

      if (!Buying.classList.contains("buyFlexing")) {
        Buying.classList.add("buyFlexing");
      } else {
        Buying.classList.remove("buyFlexing");
      }
      // fetchPost(JSON.stringify(fetchData));
    });
  });
}
body.addEventListener("click", () => {
  drobDawn.classList.remove("buyFlexing");
});
buyingButton.addEventListener("click", (e) => {
  e.preventDefault();
  // e.stopPropagation();
  const buyingInput = document.querySelector(".Buying input");
  fetchingValue.email = buyingInput.value;
  console.log(fetchingValue);
  //fetchPost(JSON.stringify(fetchingValue))
});
