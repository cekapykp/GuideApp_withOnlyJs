class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

class Util { //Yararlı fonksiyonları içeren fonksiyon
    static bosAlanKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}

class Ekran {
    constructor() {
        this.ad = document.getElementById("ad");
        this.soyad = document.getElementById("soyad");
        this.mail = document.getElementById("mail");
        this.ekleGuncelleButton = document.querySelector(".kaydetGuncelle");
        this.form = document.getElementById("form-rehber").addEventListener("submit", this.kaydetGuncelle.bind(this));

        this.kisiListesi = document.querySelector(".kisi-listesi");
        this.kisiListesi.addEventListener("click", this.guncelleVeyaSil.bind(this));
        this.depo = new Depo();

        this.secilenSatir = undefined;
        this.kisilerEkranaYazdir();
    }

    alanlariTemizle(){
        this.ad.value = ``;
        this.soyad.value = ``;
        this.mail.value = ``;
    }

     guncelleVeyaSil(e){
         const tiklanmaYeri = e.target;
         if(tiklanmaYeri.classList.contains("btn--delete")){
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.kisiyiEkrandanSil();
         }else if( tiklanmaYeri.classList.contains("btn--edit")){
            
         }
         console.log(this)
     }

     kisiyiEkrandanSil(){
         this.secilenSatir.remove();
         const silinecekMail = this.secilenSatir.cells[2].textContent;

         this.depo.kisiSil(silinecekMail);
         this.alanlariTemizle();
     }

    kisilerEkranaYazdir() {
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        });
    }

    kisiyiEkranaEkle(kisi) {
        const olusturlanTR = document.createElement("tr");
        olusturlanTR.innerHTML = `<td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
            <button  class="btn btn--edit">
                <i class="fa-solid fa-edit"></i>
            </button>
            <button class="btn btn--delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>`;
        this.kisiListesi.appendChild(olusturlanTR);

    }

    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail);

        //Tüm aalanlar kontrol - dolu mu boş var mı
        if (sonuc) {
            //console.log("Başarılı");
            this.kisiyiEkranaEkle(kisi);

            //yeni kişiyi ekrana ekler - localstorage
            this.depo.kisiEkle(kisi)
            this.alanlariTemizle();
        } else {
            //console.log("Boş Alan Var");

        }
    }
}

class Depo {
    constructor() {
        this.tumKisiler = this.kisileriGetir(); //Bu deponun geçtiği her yerde geçerli
    }
    //Uygulama ilk açıldığında veriler getirilecektir.
    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem("tumKisiler") === null) {
            tumKisilerLocal = [];
        } else {
            tumKisilerLocal = JSON.parse(localStorage.getItem("tumKisiler"));
        }
        return tumKisilerLocal;
    }

    kisiEkle(kisi) {
        this.tumKisiler.push(kisi);
        localStorage.setItem("tumKisiler" , JSON.stringify(this.tumKisiler));
    }

    kisiSil(mail){
        this.tumKisiler.forEach((kisi,index) => {
            if(kisi.mail === mail){
                this.tumKisiler.splice(index,1)
            }
        });
        localStorage.setItem("tumKisiler" , JSON.stringify(this.tumKisiler));
    }

    kisiGuncelle(guncellenmisKisi , mail){
        this.tumKisiler.forEach((kisi,index) => {
            if(kisi.mail === mail){
                this.tumKisiler[index] = guncellenmisKisi;
            }
        });
        localStorage.setItem("tumKisiler" , JSON.stringify(this.tumKisiler));
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    const ekran = new Ekran();
});