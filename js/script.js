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
          (contact, index) => `
            <div class="contact-item d-flex align-items-center  position-relative" data-index="${index}">
              <span  class="position-absolute top-10 end-0  translate-middle p-1 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
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

      // Add click events to each contact item
      const items = contactList.querySelectorAll(".contact-item");
      items.forEach(item => {
        item.addEventListener("click", () => {
          document.getElementById("chat-body-representative").style.display = "block";
          document.getElementById("chat-body").style.display = "none";
        });
      });
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
          const modalId = item.id
            ? `modal-${item.id}`
            : item.modalId || `modal-${index}`;
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

      //PhonBook data
      // Fetch phonebook modal (Hebrew/English)
      const phoneBook = isHebrew
      ? "common/modal/phoneBook.html"
      : "common/modal/phoneBook-en.html";
      fetch(phoneBook)
      .then((res) => res.text())
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
      })
      .catch((error) => console.log("Error loading phonebook modal:", error));

      // Fetch phonebook data and apply filtering
      fetch("phonebookData.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch phonebookData.json");
        return response.json();
      })
      .then((data) => {
        let phonebookData = data;
        const contactChatList = document.getElementById("phoneBookData");
        const mobilePhoneBookData = document.getElementById("mobilephoneBookData");

        // Function to render desktop phonebook table
        const renderPhoneBookTable = (data) => {
          contactChatList.innerHTML = data
            .map((item) => {
              return `
                <tr class="border-bottom">
                  <td class="table-data fs-6 fw-bold">${item.Mobile}</td>
                  <td class="fs-6 fw-bold">${isHebrew ? item.Customername_he : item.Customername_en}</td>
                  <td class="table-data">${item.Email}</td>
                  <td class="table-data">${isHebrew ? item.Description_he : item.Description_en}</td>
                  <td class="table-data">
                    <div class="d-flex align-items-center flex-wrap gap-4 gap-lg-3 my-2 my-lg-0">
                      <i class="fas fa-comment-medical fa-lg" style="color: #11fd11;"></i>
                      <img src="assets/images/feather-edit.svg" width="18px" height="18px" alt="edit icon">
                      <i class="fa-solid fa-trash-can fa-lg" style="color: #D42359;"></i>
                    </div>
                  </td>
                </tr>`;
            })
            .join("");
        };

        // Function to render mobile phonebook data
        const renderMobilePhoneBookData = (data) => {
          mobilePhoneBookData.innerHTML = data
            .map((item) => {
              return `
                <div class="accordion accordion-flush overflow-y-auto overflow-x-hidden mh-603" id="accordionFlushExample">
                  <div class="accordion-item my-1">
                    <h2 class="accordion-header" id="${item["aria-labelledby"]}">
                      <button
                        class="accordion-button fs-6 fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="${item["data-bs-target"]}"
                        aria-expanded="false"
                        aria-controls="${item["aria-controls"]}"
                      >
                        ${isHebrew ? item.Customername_he : item.Customername_en}
                      </button>
                    </h2>
                    <div id="${item["aria-controls"]}" class="accordion-collapse collapse" aria-labelledby="${item["aria-labelledby"]}" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        <div class="row d-flex align-items-center">
                          <div class="col-6">
                            <div class="d-flex flex-column gap-2 justify-content-center">
                              <p class="mb-0">${item.Mobile}</p>
                              <p class="mb-0">${item.Email}</p>
                              <p class="mb-0">${isHebrew ? item.Description_he : item.Description_en}</p>
                            </div>
                          </div>
                          <div class="col-6 text-end">
                            <div class="d-flex flex-column align-items-end gap-4">
                              <i class="fas fa-comment-medical fa-lg" style="color: #11fd11;"></i>
                              <img src="assets/images/feather-edit.svg" width="18px" height="18px" alt="edit icon">
                              <i class="fa-solid fa-trash-can fa-lg" style="color: #D42359;"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
            })
            .join("");
        };

        renderPhoneBookTable(phonebookData);
        renderMobilePhoneBookData(phonebookData);

        // Search functionality
        document.getElementById("searchButton").addEventListener("click", () => {
          const input = document.getElementById("searchInput").value.toLowerCase();
          const filtered = phonebookData.filter(
            (item) =>
              item.Mobile.includes(input) ||
              item.Customername_en.toLowerCase().includes(input) ||
              item.Customername_he.toLowerCase().includes(input) ||
              item.Description_en.toLowerCase().includes(input) ||
              item.Description_he.toLowerCase().includes(input)
          );
          renderPhoneBookTable(filtered);
          renderMobilePhoneBookData(filtered);
        });
      })
      .catch((error) => console.log("Error loading phonebook data:", error));


      // User modal path
      const userdataPath = isHebrew
        ? "common/modal/usermodal.html"
        : "common/modal/usermodal-en.html";
      fetch(userdataPath)
        .then((res) => res.text())
        .then((html) => {
          document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch((error) => console.log("error Modal for handleing", error));

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

      // Auto Replay Table Data
      const autoreplayPath = isHebrew
        ? "common/modal/autoreplaymodal.html"
        : "common/modal/autoreplaymodal-en.html";

      fetch(autoreplayPath)
        .then((res) => res.text())
        .then((html) => {
          document.body.insertAdjacentHTML("beforeend", html);

          // Now that the modal is inserted, fetch and populate the table data
          fetch("autoreplayData.json")
            .then((response) => {
              if (!response.ok)
                throw new Error("Failed to fetch autoreplayData.json");
              return response.json();
            })
            .then((data) => {
              const contactChatList =
                document.getElementById("autoreplay-data");
              console.log("autoreplay-data element:", contactChatList);

              if (!contactChatList) {
                console.error("Element with ID 'autoreplay-data' not found!");
                return;
              }

              contactChatList.innerHTML = data
                .map((item) => {
                  return `
                            <tr class="border-bottom">
                              <td class="fs-6 fw-bold">${
                                isHebrew ? item?.Title_he : item?.Title_en
                              }</td>
                              <td class="table-data">${item.startDate_val}</td>
                              <td class="table-data">${item.endDate_val}</td>
                              <td class="table-data">
                                <div class="d-flex align-items-center flex-wrap gap-4 gap-lg-2 my-2 my-lg-0">
                                  <img src="assets/images/feather-edit.svg" width="18px" height="18px" alt="edit icon">
                                  <i class="fa-solid fa-trash-can fa-lg" style="color: #D42359;"></i>
                                </div>
                              </td>
                            </tr>
                          `;
                })
                .join("");
            })
            .catch((error) => {
              console.error("Error loading autoreplay data:", error);
            });

          // Mobile Data Table
          fetch("autoreplayData.json")
            .then((response) => {
              if (!response.ok)
                throw new Error("Failed to fetch autoreplayData.json");
              return response.json();
            })
            .then((data) => {
              const contactChatList = document.getElementById(
                "autoreplaymobile-data"
              );
              console.log("autoreplay-data element:", contactChatList);

              if (!contactChatList) {
                console.error("Element with ID 'autoreplay-data' not found!");
                return;
              }

              contactChatList.innerHTML = data
                .map((item) => {
                  return `
                <div class="row gap-3 gap-sm-0 border-bottom">
                  <div class="col-8">
                    <p class="mb-0 fs-6 fw-bold text-nowrap">${
                      isHebrew ? item.Title_he : item.Title_en
                    }</p>
                    <div class="d-flex flex-column gap-1">
                      <div class="d-flex align-item-center gap-2">
                        <p class="mb-0 text-nowrap">${
                          isHebrew ? item.startDate_he : item.startDate_en
                        }</p>
                        <p class="mb-0 text-nowrap">01/01/2025 13:25</p>
                      </div>
                      <div class="d-flex align-item-center gap-2">
                        <p class="mb-0 text-nowrap">${
                          isHebrew ? item.endDate_he : item.endDate_en
                        }</p>
                        <p class="mb-0 text-nowrap">01/01/2025 13:25</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="table-data">
                      <div
                        class="d-flex justify-content-sm-center justify-content-around flex-column align-items-center flex-wrap gap-4 my-2"
                      >
                        <img
                          src="assets/images/feather-edit.svg"
                          width="18px"
                          height="18px"
                          alt="edit icon"
                        />
                        <i
                          class="fa-solid fa-trash-can fa-lg"
                          style="color: #d42359"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
        `;
                })
                .join("");
            })
            .catch((error) => {
              console.error("Error loading autoreplay data:", error);
            });
        })
        .catch((error) => console.error("Error loading modal:", error));
    })
    .catch((error) => console.error("Error loading menu:", error));
});

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
      <li class="list-group-item d-flex align-items-center gap-3 p-4 border-0  menu_list ${
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
                  : " "
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
                <div class="contact-item d-flex position-relative align-items-center ${
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
                        <span class="position-absolute top-25 start-0 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
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
          <tr class="border-bottom align-middle">
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
              <button class="accordion-button border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="${
                item["data-bs-target"]
              }" aria-expanded="true"  aria-controls="${item["aria-controls"]}">
                 <div class="d-flex align-items-center gap-3">
                      <span class="table-data">${item.searialNumber}</span>
                      <span>|</span>
                      <p class="mb-0 fw-semibold fs-6">${
                        isHebrew ? item.name_he : item.name_en
                      }</p>
                 </div>                                  
              </button>
            </h2>
            <div id="${
              item["aria-controls"]
            }" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                  <div class="d-flex flex-wrap justify-content-between align-items-center">
                      <div class="d-flex align-items-center gap-3">
                          <span class="table-data">${item.searialNumber}</span>
                          <span>|</span>
                          <p class="mb-0 fw-semibold fs-6">${
                            isHebrew ? item.name_he : item.name_en
                          }</p>
                     </div>
                     <p class="mb-0">${
                       isHebrew ? item.name_he : item.name_en
                     }</p>
                  </div>
      
                  <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
                      <p class="mb-0 table-data text-nowrap">14 :${
                        isHebrew ? item.extention_he : item.extention_en
                      }</p>
                      <span>|</span>
                      <p class="mb-0 table-data text-nowrap">${
                        isHebrew ? item.depatment_he : item.depatment_en
                      }</p>
                      <span>|</span>
                      <p class="mb-0 table-data text-nowrap ">${
                        item.mobile_no
                      }</p>
                  </div>
      
                  <div class=" d-flex flex-wrap justify-content-between my-2">
                      <div class="d-flex align-items-center gap-3">
                          <button type="button" class="btn ${btnClass} table-data lh-1">${statusLabel}</button>
                          <p class="mb-0 text-data">${item.various} : ${
            isHebrew ? item.varies_he : item.varies_en
          }</p>
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

// Toggle Password is create
function togglePassword() {
  const input = document.getElementById("passwordInput");
  const icon = document.getElementById("eyeIcon");

  if (!input || !icon) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}
