function getData(tableName, id) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "admin/includes/CRUD/getDataFromDB.php",
      type: "POST",
      data: {
        id: id,
        tableName: tableName,
      },
      dataType: "json",
      success: function (data) {
        let dataArray = Object.values(data);
        resolve(dataArray);
      },
      error: function (xhr, status, error) {
        console.error("Error:", xhr, status, error);
        reject(error);
      },
    });
  });
}

function stringToImageArray(imageString) {
  return imageString.split(",").map((image) => image.trim());
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
// ----------------------------------------------------------------

// ----------------------------------------------------------------

var currentUrl = window.location.href;
var urlSearchParams = new URLSearchParams(window.location.search);

getData("videoblog").then((response) => {
  let block = $(".sw_video_blog").empty();

  //   console.log(response);

  response.forEach((element) => {
    let tempElement = $("<div>").html(element.title);
    let textContent = tempElement.text();
    let tempElement2 = $("<div>").html(element.date);
    let textContent2 = tempElement2.text();

    block.append(`
    <div class="swiper-slide ss_video_blog">
      <div class="video_blog_wrapper__item">
          <iframe src="${element.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div class="video_blog_wrapper__item___text">
              <p class="video_blog_wrapper__item___text____date">${textContent2}</p>
              <p class="video_blog_wrapper__item___text____description">${textContent}</p>
          </div>
      </div>
    </div>
    `);
  });

  const swiperVideoBlog = new Swiper(".s_video_blog", {
    slidesPerView: 3,
    spaceBetween: 20,

    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".sp_video_blog",
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".sb_video_blog_next",
      prevEl: ".sb_video_blog_prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
});

getData("news").then((response) => {
  let block = $(".news_articles_wrapper__news_page");
  let block2 = $(".sw__news_articles_wrapper");
  console.log(response);

  response.forEach((element, index) => {
    // Создаем временный элемент для текста
    let tempElement = $("<div>").html(element.text);
    let textContent = tempElement.text();

    // Создаем временный элемент для даты
    let tempElement2 = $("<div>").html(element.date);
    let textContent2 = tempElement2.text();

    // Предполагая, что element.img содержит массив изображений
    let images = element.img.split(",");
    let mainImage = images[0];
    let additionalImages = images.slice(1);

    // Создаем HTML для дополнительных изображений
    let additionalImagesHTML = additionalImages
      .map((img) => `<img src="admin/img/${img}" alt="">`)
      .join("");

    // Добавляем новый элемент с основным изображением
    block.append(`
      <a class="news_articles_wrapper__item___news_page link" href="newsDetail.html?id=${
        element.id
      }&title=${encodeURIComponent(element.title)}">
            <img src="admin/img/${mainImage}" alt="">
            <p class="news_articles_wrapper__item___title">${element.title}</p>
            <p class="news_articles_wrapper__item___date">${textContent2}</p>
            <p class="news_articles_wrapper__item___text">${textContent}</p>
      </a>
    `);

    if (index >= response.length - 3) {
      block2.append(`
        <div class="swiper-slide ss__news_articles_wrapper">
          <a class="news_articles_wrapper__item link" href="newsDetail.html?id=${
            element.id
          }&title=${encodeURIComponent(element.title)}">
                <img src="admin/img/${mainImage}" alt="">
                <p class="news_articles_wrapper__item___title">${
                  element.title
                }</p>
                <p class="news_articles_wrapper__item___date">${textContent2}</p>
                <p class="news_articles_wrapper__item___text">${textContent}</p>
          </a>
        </div>
        
      `);
    }
  });

  const swiperNews = new Swiper(".s__news_articles_wrapper", {
    slidesPerView: 3,
    spaceBetween: 30,

    // Optional parameters
    direction: "horizontal",
    loop: true,
    init: true,

    // If we need pagination
    pagination: {
      el: ".sp__news_articles_wrapper",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".sb__news_articles_wrapper__next",
      prevEl: ".sb__news_articles_wrapper__prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
});

const url_new = new URL(window.location.href);
const queryParams_new = url_new.searchParams;
const id_new = queryParams_new.get("id");

if (id_new) {
  getData("news", id_new).then((response) => {
    let images = response[4].split(",");
    let mainImage = images[0];

    $(".newsDetail_articles_wrapper__item___title").text(response[1]);
    $(".newsDetail_articles_wrapper__item___date").html(response[2]);
    $(".newsDetail_img img").attr("src", "admin/img/" + mainImage);
    $(".newsDetail_articles_wrapper__item___text").html(response[3]);

    if (response[5]) {
      $(".vidsrc").attr("src", response[5]);
      $(".vidsrc").css("height", "300px");
      $(".video_blog_wrapper__itemN").css({
        border: "1px solid #2FC2B1",
        "margin-bottom": "50px",
        "padding-bottom": "24px",
      });
    } else {
      $(".video_blog_wrapper__itemN").css("display", "none");
    }

    $(".video_blog_wrapper__item___text____date").text(response[7]);
    $(".video_blog_wrapper__item___text____description").text(response[6]);

    let additionalImages = images.slice(1);
    let additionalImagesHTML = additionalImages
      .map(
        (img) => `<img src="admin/img/${img}" class="additional-img" alt="">`
      )
      .join("");

    if (additionalImagesHTML === "") {
      $(".newsDetail_articles_wrapper__item___imgs").css("display", "none");
    } else {
      $(".newsDetail_articles_wrapper__item___imgs").html(additionalImagesHTML);
    }

    // Обработчик клика по дополнительным изображениям
    $(".additional-img").on("click", function () {
      let modal = $("#myModal");
      let modalImg = $("#img01");
      let captionText = $("#caption");

      modal.css("display", "flex"); // Используем flexbox для центрирования
      modalImg.attr("src", this.src);
      captionText.text(this.alt);
    });

    // Обработчик для закрытия модального окна
    $(".close").on("click", function () {
      $("#myModal").css("display", "none");
    });

    // Обработчик для закрытия модального окна при клике на фон
    $("#myModal").on("click", function (event) {
      if ($(event.target).is("#myModal")) {
        $(this).css("display", "none");
      }
    });
  });
}

getData("resources").then((response) => {
  let block = $(".resources_list").empty();

  response.forEach((element, index) => {
    let currentIndex = index + 1;
    let tempElement = $("<div>").html(element.subtitle);
    let textContent = tempElement.text();

    block.append(
      `
      <div class="resources_list__item">
        <div class="resources_list__item___title">
            <p class="resources_list__item___title____text">${element.title}</p>
            <hr style="margin-inline: 16px;">
            <p class="resources_list__item___title____num">${
              currentIndex < 10 ? "0" + currentIndex : currentIndex
            }.</p>
        </div>
        <p class="resources_list__item___subtitle">${textContent}</p>
      </div>
      `
    );
  });
});

getData("resources").then((response) => {
  let block = $(".sw_resources").empty();

  response.forEach((element, index) => {
    let currentIndex = index + 1;

    block.append(`
    <div class="swiper-slide ss_resources">
      <div class="resources_item" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('../admin/img/${stringToImageArray(
        element.img
      )}');;background-size: 100%, cover;
      background-repeat: no-repeat;">
          <div class="resources_item__text">
              <p class="resources_item__num">${
                currentIndex < 10 ? "0" + currentIndex : currentIndex
              }</p>
              <p class="resources_item__txt">${element.title}</p>
          </div>
      </div>
    </div>
    `);
  });

  const swiperResources = new Swiper(".s_resources", {
    slidesPerView: 3,
    spaceBetween: 50,

    // Optional parameters
    direction: "horizontal",
    loop: true,
    init: false,

    // If we need pagination
    pagination: {
      el: ".sp_resources",
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".sb_resources_next",
      prevEl: ".sb_resources_prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  swiperResources.on("slideChange afterInit init", function () {
    let currentSlide = this.realIndex + 1; // Используйте realIndex для получения текущего индекса слайда
    let totalSlides = this.slides.length; // Вычитайте 2, так как у вас есть клонированные слайды из-за опции loop
    document.querySelector(".counter").innerHTML = `
      <span class="counter__current">${
        currentSlide < 10 ? "0" + currentSlide : currentSlide
      }</span> 
      / 
      <span class="counter__total">${
        totalSlides < 10 ? "0" + totalSlides : totalSlides
      }</span>`;
  });

  swiperResources.init();
});

getData("statistics").then((response) => {
  let block = $(".statistics_wrapper").empty();

  response.forEach((element) => {
    // Создаем временный элемент для текста
    let tempElement = $("<div>").html(element.title);
    let textContent = tempElement.text();

    // Создаем временный элемент для даты
    let tempElement2 = $("<div>").html(element.subtitle);
    let textContent2 = tempElement2.text();

    block.append(`
    <div class="statistics_wrapper__item">
        <div class="statistics_wrapper__item___img">
            <img src="admin/img/${element.img}" alt="">
        </div>
        <div class="statistics_wrapper__item___text">
            <p class="statistics_wrapper__item___text____num">${textContent}</p>
            <p class="statistics_wrapper__item___text____description">${textContent2}</p>
        </div>
    </div>
    `);
  });
});

getData("docs").then((response) => {
  let block = $(".docs").empty();

  response.forEach((element) => {
    let categoryBlock = block.find(
      `.docs_item[data-sort="${element.category}"]`
    );

    if (categoryBlock.length === 0) {
      categoryBlock = $(
        `<div class="docs_item" data-sort="${element.category}">
          <p class="rla_title">${element.category}</p>
          <div class="rla_container"></div>
        </div>`
      );
      block.append(categoryBlock);
    }

    categoryBlock.find(".rla_container").append(
      `<a class="rla_item" href="admin/img/${element.img}" target="_blank">
          <div class="rla_item__img">
              <img src="images/${getFileExtension(element.img)}.png" alt="">
          </div>
          <div class="rla_item__text">
              <p>${element.title}</p>
              <p class="rla_item__format">${getFileExtension(
                element.img
              ).toUpperCase()}</p>
          </div>
        </a>`
    );
  });
});

getData("anticorr").then((response) => {
  let block = $(".antiCorr").empty();

  response.forEach((element) => {
    let categoryBlock = block.find(
      `.docs_item[data-sort="${element.category}"]`
    );

    if (categoryBlock.length === 0) {
      categoryBlock = $(
        `<div class="docs_item" data-sort="${element.category}">
          <p class="rla_title">${element.category}</p>
          <div class="rla_container"></div>
        </div>`
      );
      block.append(categoryBlock);
    }

    categoryBlock.find(".rla_container").append(
      `<a class="rla_item" href="admin/img/${element.img}" target="_blank">
          <div class="rla_item__img">
              <img src="images/${getFileExtension(element.img)}.png" alt="">
          </div>
          <div class="rla_item__text">
              <p>${element.title}</p>
              <p class="rla_item__format">${getFileExtension(
                element.img
              ).toUpperCase()}</p>
          </div>
        </a>`
    );
  });
});
