class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header">
                <ul class="header_nav_list">
                    <li class="header_nav__list__item icon"><a href="/"><img src="images/favicon.png" alt=""></a></li>
                    <div class="header_drop" tabindex="0">
                        <img class="header_navbtn" src="images/burger.png" alt="">
                        <ul class="header_nav_list links">
                            <a href="/"><li class="header_nav__list__item link">Главная</li></a>
                            <a href="aboutUs.html"><li class="header_nav__list__item link">О нас</li></a>
                            <a href="provisionOfServices.html"><li class="header_nav__list__item link">Предоставление услуг</li></a>
                            <a href="news.html"><li class="header_nav__list__item link">Новости</li></a>
                            <a href="docs.html"><li class="header_nav__list__item link">Документы</li></a>
                            <a href="contacts.html"><li class="header_nav__list__item link">Контакты</li></a>
                        </ul>
                    </div>
                </ul>
            </header>

    `
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="footer_container">
                <div class="footer_container__item">
                    <a href="/"><img src="images/favicon.png" alt=""></a>
                    <p class="footer_container__item___text">2024 © Дом-интернат (пансионат) для престарелых и инвалидов «Гармония»</p>
                </div>

                <div class="footer_container__item adaptiv">
                    <p class="footer_container__item___title">Ссылки</p>
                    <a href="https://www.kchr.ru/" target="_blank"><p class="footer_container__item___text">
                        Официальный сайт Главы и Правительства Карачаево-Черкесской
                            Республики
                    </p></a>
                    <a href="https://cherkessk09.ru/" target="_blank"><p class="footer_container__item___text">Официальный портал муниципального образования город Черкесск</p></a>
                    <a href="https://mintrud.gov.ru/" target="_blank"><p class="footer_container__item___text">Министерство труда и социальной защиты РФ</p></a>
                    <a href="https://www.mintrudkchr.ru/" target="_blank"><p class="footer_container__item___text">Министерство труда и социального развития КЧР</p></a>
                </div>

                <div class="footer_container__item adaptiv">
                    <p class="footer_container__item___title">Меню</p>
                    <a href="/"><p class="footer_container__item___text">Главная</p></a>
                    <a href="aboutUs.html"><p class="footer_container__item___text">О нас</p></a>
                    <a href="provisionOfServices.html"><p class="footer_container__item___text">Предоставление услуг</p></a>
                    <a href="news.html"><p class="footer_container__item___text">Новости</p></a>
                    <a href="docs.html"><p class="footer_container__item___text">Документы</p></a>
                    <a href="contacts.html"><p class="footer_container__item___text">Контакты</p></a>
                </div>

                <div class="footer_container__item adaptiv">
                    <p class="footer_container__item___title">Контакты</p>
                    <p class="footer_container__item___text">369015, Карачаево-Черкесская Республика, г. Черкесск, ул. Космонавтов, д.
                        4аdom-prestarelykh09@mail.ru</p>
                </div>

                               
            </div>



            <div class="footer_container__2">
                <div class="footer_container__item___text private">
                    <p><a href="/">Политика конфиденциальности</a></p>
                    <p class="footer_container__item___text margin"><a href="/">Пользовательское соглашение</a></p>
                </div>

                <div class="footer_container__2___item">
                    <img src="images/informer.png" alt="">
                    <a href="https://alazarstudio.ru/" target="_blank"><img src="images/alazar_light.png" alt=""></a>
                </div>
            </div>
        </footer>`
    }
}


customElements.define('my-header', MyHeader)
customElements.define('my-footer', MyFooter)