class Contact1 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_phone.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">ПРИЕМНАЯ</p>
            <p class="contacts_content__item___text____description">28-41-72</p>
        </div>
        `;
  }
}

class Contact2 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_location.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">АДРЕС</p>
            <p class="contacts_content__item___text____description">369015, Карачаево-Черкесская
                Республика, г. Черкесск, ул. Космонавтов, д. 4а</p>
        </div>
        `;
  }
}

class Contact3 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_phone.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">ДИРЕКТОР</p>
            <p class="contacts_content__item___text____description">28-41-70</p>
        </div>
        `;
  }
}

class Contact4 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_email.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">EMAIL</p>
            <p class="contacts_content__item___text____description">dom-prestarelykh09@mail.ru</p>
        </div>
        `;
  }
}

class Contact5 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_phone.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">ПОСТ ОХРАНЫ ПРОХОДНАЯ</p>
            <p class="contacts_content__item___text____description">28-41-62</p>
        </div>
        `;
  }
}

class Contact6 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_clock.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">ЧАСЫ РАБОТЫ</p>
            <p class="contacts_content__item___text____description">с 8:00 до 17:00, перерыв: с 12:00 до
                12:45 <br> Выходные дни: <br> суббота, воскресенье</p>
        </div>
    `;
  }
}

class Contact7 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <img src="images/contact_phone.png" alt="">
        <div class="contacts_content__item___text">
            <p class="contacts_content__item___text____title">ЗАВЕДУЮЩИЙ СОЦИАЛЬНО- <br>
                РЕАБИЛИТАЦИОННЫМ <br> ОТДЕЛЕНИЕМ </p>
            <p class="contacts_content__item___text____description">28-41-68</p>
        </div>
        `;
  }
}


customElements.define("contact1-items", Contact1);
customElements.define("contact2-items", Contact2);
customElements.define("contact3-items", Contact3);
customElements.define("contact4-items", Contact4);
customElements.define("contact5-items", Contact5);
customElements.define("contact6-items", Contact6);
customElements.define("contact7-items", Contact7);
