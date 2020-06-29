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

//main slaydbar
const links = [
  "http://cdn.home-designing.com/wp-content/uploads/2018/04/designer-lamps.jpg",
  "https://i0.wp.com/see.news/wp-content/uploads/2020/04/Apple-iPhone-SE-2.jpg?resize=750%2C375&ssl=1",
  "https://kod.ru/content/images/size/w700/2020/04/IMG_20200413_170359_382-01.jpeg",
];
const slaydButt = document.querySelectorAll(".buttons button");
const image = document.querySelector(".poster");

slaydButt.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    image.src = links[index];
  });
});
let a = 0;
image.addEventListener("click", () => {
  console.log(a);

  if (a !== links.length - 1) {
    image.src = links[++a];
  } else {
    a = 0;
    image.src = links[a];
  }
});
//main phones
const phones = document.querySelector(".phones");
const GetPhons = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  data.forEach((item) => {
    let exemple = CreatePhones(item);
    phones.append(exemple);
  });
};
const CreatePhones = (item) => {
  const { name, image, price, id, categoryId } = item;
  const phon = document.createElement("div");
  phon.classList.add("phone", "slider__item");

  phon.innerHTML = `
  <div data-id ='${id}'  class ='elemId' data-type='phone'>
  <button 
  class = 'logo'
  data-id ='${id}' 
  data-categoryId='${categoryId}'
    data-name = "${name}"
   data-price= "${price}"
   data-image = "${image[0]}"
  >
      <img src="../images/logo/download.png" alt="" >
      </button>
      <button 
      class = 'logo1' 
      data-id ='${id}' 
      data-categoryId='${categoryId}'
      data-name = "${name}"
      data-price= "${price}"
      data-image = "${image[0]}"
      >
      <img src="../images/logo/сирт.png" alt="" 
     
      ></button>
      <img src="${image[0]}" alt="logo" class ="phonImg">
      <p>${name}</p>
      <p>${price}<span>$</span></p>
    </div>
`;
  return phon;
};
//tv slayd
const tv = document.getElementById("tvs");
const GetTv = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  await data.forEach((item) => {
    let exemple = CreateTv(item);
    tv.append(exemple);
  });
  await slick();
  await Basket("logo", "logo1");
  await clickEleme();
};
const CreateTv = (item) => {
  const { name, image, price, id, categoryId } = item;
  const phon = document.createElement("div");
  phon.classList.add("tv", "slider__item", "filter");

  phon.innerHTML = `
    <div data-id ='${id}' class ='elemId' data-type='tv'>
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
      <img src="${image[0]}" alt="logo" class ="phonImg">
      <p>${name}</p>
      <p>${price}<span>$</span></p>
    </div>
  
`;
  return phon;
};
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
window.addEventListener("DOMContentLoaded", () => {
  GetPhons("../../API/phones.json");
  GetTv("../../API/tv.json");
  Hashchange();
});
//slayder
function slick() {
  $(".slider").slick({
    arrows: true,
    dots: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 800,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

function Basket(bt1, bt2) {
  const basketBt = document.querySelectorAll(`.${bt1}`);
  const likeBt = document.querySelectorAll(`.${bt2}`);
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
    elem.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("mt");
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
    buy();
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
    elem.addEventListener("click", (e) => {
      e.stopPropagation();
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
let productInfos = document.querySelector(".productInfo");
const main = document.querySelector("main");
const GetInfo = async (url, id) => {
  const response = await fetch(url);
  const data = await response.json();
  const findId = await filterProducts(data, id);
  const elem = await paintProduct(findId);
  productInfos.innerHTML = "";
  await productInfos.append(elem);
  await eventer();
  await selectBox();
  await Basket("logo", "logo1");
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

  window.addEventListener("hashchange", Hashchange);
  elementProduct.forEach((elem) => {
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
const fetchingValue = {};
const buyingButton = document.querySelector(".Buying button");
const Buying = document.querySelector(".Buying");
function buy() {
  const buy = document.querySelectorAll(".buy");

  buy.forEach((elem) => {
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

function BUY() {
  const BUY = document.querySelector(".BUY");
  BUY.addEventListener("click", (e) => {
    const { id } = BUY.dataset;
    //fetchPost(JSON.stringify({ id }));.buyFlexing
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
