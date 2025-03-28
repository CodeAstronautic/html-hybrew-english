// Desktop sidebar List

document.addEventListener("DOMContentLoaded", function () {
  fetch("sidebarData.json")
      .then((response) => response.json())
      .then((data) => {
          const contactList = document.getElementById("contactList");

          const htmlLang = document.documentElement.lang || "en";
          const isHebrew = htmlLang.startsWith("he");

          contactList.innerHTML = data
              .map((contact) => `
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
                          <small class="text-muted d-block">${contact.time}</small>
                      </div>
                  </div>
              `)
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

        if (index < menuItems.length - 1) {
          const divider = document.createElement("li");
          divider.className = "dropdown-divider m-0";
          dropdownMenu.appendChild(divider);
        }
      });
    })
    .catch((error) => console.error("Error loading menu:", error));
});

// Mobile User Sidebar List

document.addEventListener("DOMContentLoaded", function () {
  const menuData = [
    { 
      icon: "awesome-whatsapp.svg", 
      label: { en: "Ziv Shiffer", he: "זיו שיפר" }, 
      subText: { en: "053-3028400", he: "053-3028400" } 
    },
    { icon: "feather-home.svg", label: { en: "System Status", he: "סטאטוס מערכת" } },
    { icon: "feather-users.svg", label: { en: "Contacts", he: "אנשי קשר" } },
    { icon: "awesome-reply.svg", label: { en: "Auto Reply", he: "מענה אוטומטי" } },
    { icon: "headphone.svg", label: { en: "Representatives", he: "נציגים" } },
    { icon: "feather-tag.svg", label: { en: "Tags", he: "תיוגים" } },
    { icon: "feather-layers.svg", label: { en: "Departments", he: "מחלקות" } },
    { icon: "feather-phone.svg", label: { en: "Phonebook", he: "ספר טלפונים" } },
    { icon: "feather-bell.svg", label: { en: "Reminders", he: "תזכורות" } },
    { icon: "feather-user.svg", label: { en: "User Settings", he: "הגדרות משתמש" } },
  ];

  const menuList = document.getElementById("menu-list");

  const htmlLang = document.documentElement.lang || "en";
  const isHebrew = htmlLang.startsWith("he");

  menuData.forEach((item, index) => {
    let listItem = `
      <li class="list-group-item d-flex align-items-center gap-3 p-4 border-0 ${index === 0 ? "sticky-header" : ""}">
          <img src="/assets/images/${item.icon}" alt="${item.label.en} icon">
          <div>
              <small class="text-black">${isHebrew ? item.label.he : item.label.en}</small>
              ${
                item.subText
                  ? `<br><small class="text-black">${isHebrew ? item.subText.he : item.subText.en}</small>`
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
                <div class="contact-item d-flex align-items-center ${isHebrew ? 'text-end' : ''}">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 fw-bold">${isHebrew ? contact.name_he : contact.name_en}</h6>
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
                        <small class="text-muted d-block">${isHebrew ? contact.day_he : contact.day_en}</small>
                        <small class="text-muted d-block">${contact.time}</small>
                    </div>
                </div>
            `
        )
        .join("");
    })
    .catch((error) => console.error("Error loading contacts:", error));
});

