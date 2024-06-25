class OrgsBanner extends HTMLElement {
    connectedCallback () {
        this.innerHTML = `
        <div class="orgs_banner">
            <a href="https://www.mintrudkchr.ru/" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img1.png" alt=""></a>
            <a href="https://www.kchr.ru/" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img2.png" alt=""></a>
            <a href="https://rosmintrud.ru/" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img3.png" alt=""></a>
            <a href="https://bus.gov.ru/home" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img4.png" alt=""></a>
            <a href="https://zakupki.gov.ru/epz/main/public/home.html" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img5.png" alt=""></a>
            <a href="https://www.gosuslugi.ru/" target="_blank" class="orgs_banner__img"><img src="images/banner_org_img6.png" alt=""></a>
        </div>
    `
    }
}

customElements.define('orgs-banner', OrgsBanner)