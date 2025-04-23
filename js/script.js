// Desktop sidebar List
document.addEventListener("DOMContentLoaded", function () {
  fetch("sidebarData.json")
    .then((response) => response.json())
    .then((data) => {
      const contactList = document.getElementById("contactList");

      const htmlLang = document.documentElement.lang || "en";
      const isHebrew = htmlLang.startsWith("he");

      contactList.innerHTML = data
        .map(
          (contact) => `
                  <div class="contact-item d-flex align-items-center">
                      <div class="flex-grow-1">
                          <h6 class="mb-0 fw-bold">
                              ${isHebrew ? contact.name_he : contact.name_en}
                          </h6>
                          <small class="text-muted">${contact.phone}</small>
                      </div>
                      <div class="position-relative">
                          <img src="${contact.icon}" alt="icon">
                          <span class="bg-black text-white px-1 rounded-pill position-absolute call-count">2</span>
                      </div>
                      <div class="vertical"></div>
                      <div class="ms-auto text-end d-block convesation-day">
                          <small class="text-muted d-block">
                              ${isHebrew ? contact.day_he : contact.day_en}
                          </small>
                          <small class="text-muted d-block">${
                            contact.time
                          }</small>
                      </div>
                  </div>
              `
        )
        .join("");
    })
    .catch((error) => console.error("Error loading contacts:", error));
});

// Desktop Header DropDown List
document.addEventListener("DOMContentLoaded", function () {
  fetch("menu.json")
    .then((response) => response.json())
    .then((menuItems) => {
      const dropdownMenu = document.getElementById("dropdownMenu");

      const htmlLang = document.documentElement.lang || "en";
      const isHebrew = htmlLang.startsWith("he");

      menuItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className =
          "list-group-item d-flex align-items-center gap-3 p-3 border-0";

        const img = document.createElement("img");
        img.src = item.icon;
        img.alt = item.alt;

        const text = document.createElement("small");
        text.className = "text-black";
        text.textContent = isHebrew ? item.text_he : item.text_en;

        listItem.appendChild(img);
        listItem.appendChild(text);
        dropdownMenu.appendChild(listItem);

        listItem.addEventListener("click", function () {
          const modalId = item.id ? `modal-${item.id}` : `modal-${index}`;
          const modalElement = document.getElementById(modalId);
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
        });

        if (index < menuItems.length - 1) {
          const divider = document.createElement("li");
          divider.className = "dropdown-divider m-0";
          dropdownMenu.appendChild(divider);
        }
      });
      // Chat modal path

      const modalPath = isHebrew
        ? "common/modal/chatmodal.html"
        : "common/modal/chatmodal-en.html";

      fetch(modalPath)
        .then((res) => res.text())
        .then((html) => {
          document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch((error) => console.error("Error loading modal:", error));
    })
    .catch((error) => console.error("Error loading menu:", error)); 
  
   // auto replay modal
      const modalPath = isHebrew
      ? "common/modal/autoreplay.html"
      : "common/modal/autoreplay-en.html";
      
      fetch(modalPath)
        .then((res) => res.text())
        .then((html) => {
          document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch((error) => console.error("Error loading modal:", error));
    });
  //   .catch((error) => console.error("Error loading menu:", error)); 
  // });

// Mobile Header DropDown List
document.addEventListener("DOMContentLoaded", function () {
  const menuData = [
    {
      icon: "awesome-whatsapp.svg",
      label: { en: "Ziv Shiffer", he: "זיו שיפר" },
      subText: { en: "053-3028400", he: "053-3028400" },
    },
    {
      icon: "feather-home.svg",
      label: { en: "System Status", he: "סטאטוס מערכת" },
    },
    { icon: "feather-users.svg", label: { en: "Contacts", he: "אנשי קשר" } },
    {
      icon: "awesome-reply.svg",
      label: { en: "Auto Reply", he: "מענה אוטומטי" },
    },
    { icon: "headphone.svg", label: { en: "Representatives", he: "נציגים" } },
    { icon: "feather-tag.svg", label: { en: "Tags", he: "תיוגים" } },
    { icon: "feather-layers.svg", label: { en: "Departments", he: "מחלקות" } },
    {
      icon: "feather-phone.svg",
      label: { en: "Phonebook", he: "ספר טלפונים" },
    },
    { icon: "feather-bell.svg", label: { en: "Reminders", he: "תזכורות" } },
    {
      icon: "feather-user.svg",
      label: { en: "User Settings", he: "הגדרות משתמש" },
    },
  ];

  const menuList = document.getElementById("menu-list");

  const htmlLang = document.documentElement.lang || "en";
  const isHebrew = htmlLang.startsWith("he");

  menuData.forEach((item, index) => {
    let listItem = `
      <li class="list-group-item d-flex align-items-center gap-3 p-4 border-0 ${
        index === 0 ? "sticky-header" : ""
      }">
          <img src="/assets/images/${item.icon}" alt="${item.label.en} icon">
          <div>
              <small class="text-black">${
                isHebrew ? item.label.he : item.label.en
              }</small>
              ${
                item.subText
                  ? `<br><small class="text-black">${
                      isHebrew ? item.subText.he : item.subText.en
                    }</small>`
                  : ""
              }
          </div>
      </li>
      ${
        index < menuData.length - 1
          ? '<li class="dropdown-divider m-0"></li>'
          : ""
      }
    `;
    menuList.innerHTML += listItem;
  });
});

// Mobile Chat Sidebar List
document.addEventListener("DOMContentLoaded", function () {
  const htmlLang = document.documentElement.lang || "en";
  const isHebrew = htmlLang.startsWith("he");

  fetch("sidebarData.json")
    .then((response) => response.json())
    .then((data) => {
      const contactChatList = document.getElementById("contactChatList");
      contactChatList.innerHTML = data
        .map(
          (contact) => `
                <div class="contact-item d-flex align-items-center ${
                  isHebrew ? "text-end" : ""
                }">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 fw-bold">${
                          isHebrew ? contact.name_he : contact.name_en
                        }</h6>
                        <small class="text-muted">${contact.phone}</small>
                    </div>
                    <div>
                        <div class="position-relative">
                            <img src="${contact.icon}" alt="icon">
                            <span class="bg-black text-white px-1 rounded-pill position-absolute call-count">2</span>
                        </div>
                    </div>
                    <div class="vertical"></div>
                    <div class="ms-auto text-end d-block convesation-day">
                        <small class="text-muted d-block">${
                          isHebrew ? contact.day_he : contact.day_en
                        }</small>
                        <small class="text-muted d-block">${
                          contact.time
                        }</small>
                    </div>
                </div>
            `
        )
        .join("");
    })
    .catch((error) => console.error("Error loading contacts:", error));
});

// Table Respresentative
document.addEventListener("DOMContentLoaded", function () {
  const htmlLang = document.documentElement.lang || "en";
  const isHebrew = htmlLang.startsWith("he");

  fetch("representiveData.json")
    .then((response) => response.json())
    .then((data) => {
      const contactChatList = document.getElementById("representmenu-data");
      contactChatList.innerHTML = data
        .map((item) => {
          const statusObj = item.Status[0]; // your status is an array with one object
          const isSuccess = Object.values(statusObj).includes("success");
          const statusLabel = isHebrew
            ? isSuccess
              ? statusObj.Success_he
              : statusObj.Fail_he
            : isSuccess
            ? statusObj.Success_en
            : statusObj.Fail_en;
          const btnClass = isSuccess
            ? "btn-outline-success"
            : "btn-outline-danger";

          return `
          <tr class="border border-1 mx-3 align-middle">
            <td class="table-data lh-1">${item.searialNumber}</td>
            <td class="lh-1 fw-bold">${
              isHebrew ? item.name_he : item.name_en
            }</td>
            <td class="table-data lh-1">${
              isHebrew ? item.name_english_he : item.name_english_en
            }</td>
            <td class="table-data lh-1">${item.extention}</td>
            <td class="table-data lh-1">${
              isHebrew ? item.depatment_he : item.depatment_en
            }</td>
            <td class="table-data lh-1">${item.mobile_no}</td>
            <td class="table-data lh-1">${item.various}</td>
            <td class="table-data">
              <button type="button" class="btn ${btnClass} table-data lh-1">${statusLabel}</button>
            </td>
            <td><img src="assets/images/feather-edit.svg" alt="edit icon"></td>
          </tr>
        `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});

//Mobile Table Respresentative
document.addEventListener("DOMContentLoaded", function () {
  const htmlLang = document.documentElement.lang || "en";
  const isHebrew = htmlLang.startsWith("he");

  fetch("representiveData.json")
    .then((response) => response.json())
    .then((data) => {
      const contactChatList = document.getElementById("representaivemobile");
      contactChatList.innerHTML = data
        .map((item) => {
          const statusObj = item.Status[0]; // your status is an array with one object
          const isSuccess = Object.values(statusObj).includes("success");
          const statusLabel = isHebrew
            ? isSuccess
              ? statusObj.Success_he
              : statusObj.Fail_he
            : isSuccess
            ? statusObj.Success_en
            : statusObj.Fail_en;
          const btnClass = isSuccess
            ? "btn-outline-success"
            : "btn-outline-danger";

          return `
          <div class="accordion-item">
            <h2 class="accordion-header px-2">
              <button class="accordion-button border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="${item['data-bs-target']}" aria-expanded="true"  aria-controls="${item['aria-controls']}">
                 <div class="d-flex align-items-center gap-3">
                      <span class="table-data">${item.searialNumber}</span>
                      <span>|</span>
                      <p class="mb-0 fw-semibold fs-6">${isHebrew ? item.name_he : item.name_en}</p>
                 </div>                                  
              </button>
            </h2>
            <div id="${item['aria-controls']}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                  <div class="d-flex flex-wrap justify-content-between align-items-center">
                      <div class="d-flex align-items-center gap-3">
                          <span class="table-data">${item.searialNumber}</span>
                          <span>|</span>
                          <p class="mb-0 fw-semibold fs-6">${isHebrew ? item.name_he : item.name_en}</p>
                     </div>
                     <p class="mb-0">${isHebrew ? item.name_he : item.name_en}</p>
                  </div>
      
                  <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
                      <p class="mb-0 table-data text-nowrap">14 :${isHebrew ? item.extention_he : item.extention_en}</p>
                      <span>|</span>
                      <p class="mb-0 table-data text-nowrap">${isHebrew ? item.depatment_he : item.depatment_en}</p>
                      <span>|</span>
                      <p class="mb-0 table-data text-nowrap ">${item.mobile_no}</p>
                  </div>
      
                  <div class=" d-flex flex-wrap justify-content-between my-2">
                      <div class="d-flex align-items-center gap-3">
                          <button type="button" class="btn ${btnClass} table-data lh-1">${statusLabel}</button>
                          <p class="mb-0 text-data">${item.various} : ${isHebrew ? item.varies_he : item.varies_en}</p>
                      </div>
                      <div class="d-flex align-items-center gap-2">
                          <img src="assets/images/feather-edit.svg" alt="edit icon">
                          <i class="fa-solid fa-chevron-up"></i>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});
