class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

class Ekran {
    constructor() {
        this.ad = document.getElementById("ad");
        this.soyad = document.getElementById("soyad");
        this.mail = document.getElementById("mail");
        this.ekleGuncelle = document.querySelector(".kaydetGuncelle");
        
        this.depo = new Depo();
        this.depo
    }
}

class Depo {
    constructor() {
        this.tumKisiler = []; //Bu deponun geçtiği her yerde geçerli
    }
    //Uygulama ilk açıldığında veriler getirilecektir.
    kisileriGetir() {
        let tumKisilerLocal = [];
        if(localStorage.getItem("tumKisiler")=== null){
            tumKisilerLocal = [];
        } else {
            tumKisilerLocal = JSON.parse(localStorage.getItem("tumKisiler"));
        }
        this.tumKisiler = tumKisilerLocal;
    }

    kisiEkle(kisi){
        const tumKisilerLocal = this.kisileriGetir(); 
        tumKisilerLocal.push(kisi);
        localStorage.setItem("tumKisiler"), JSON.stringify(tumKisilerLocal);
    }
}

const cekap = new Kisi("yakup", "sari", "cekapcheck@gmail.com");
const ekran = new Ekran();