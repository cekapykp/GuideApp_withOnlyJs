// Arayüz elemenlerine erişme
const ad = document.getElementById("ad");
const soyad = document.getElementById("soyad");
const mail = document.getElementById("mail");

const form = document.getElementById("form-rehber");
const kisiListesi = document.querySelector(".kisi-listesi");

//Event-listenerlarin tanımlanması
form.addEventListener("submit", kaydet);
kisiListesi.addEventListener("click", kisiIslemleriniYap);

//Tüm kişileri sonra localhosta kaydetebilmek için oluşturulacak dizi
const tumKisilerDizisi = [];
let secilenSatir = undefined;
let sitedeYapilanEdit = 0; //Sitedeki editlerin sayısını tutacak

function kaydet(e) {
    e.preventDefault();
    const eklenecekVeyaGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value,
    }
    const sonuc = verileriKontrolEt(eklenecekVeyaGuncellenecekKisi);
    if (sonuc.durum) {
        if (secilenSatir) { //Satir varsa güncelleme yap
            kisiyiGuncelle(eklenecekVeyaGuncellenecekKisi);
        } else {  //Kişiye ekle
            kisiyiEkle(eklenecekVeyaGuncellenecekKisi);
        }
    } else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum)
    }
}

function verileriKontrolEt(kisi) {
    for (const deger in kisi) {
        if (kisi[deger]) {
            //console.log(kisi[deger]);
        } else {
            return {
                durum: false,
                mesaj: "Boş alan bırakmayınız"
            }
        }
    }
    alanlarıTemizle();
    return {
        durum: true,
        mesaj: `Kaydedildi`,

    }
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement("div");
    olusturulanBilgi.textContent = mesaj;

    olusturulanBilgi.className = "bilgi";

    olusturulanBilgi.classList.add(durum ? "bilgi--success" : "bilgi--error")
    document.querySelector(".container").insertBefore(olusturulanBilgi, form);

    setTimeout(function () {
        const silinecekDiv = document.querySelector(".bilgi");
        if (silinecekDiv) {
            silinecekDiv.remove();
        }
    }, 2000);
}

function alanlarıTemizle() {
    ad.value = "";
    soyad.value = "";
    mail.value = "";
}

function kisiyiEkle(eklenecekVeyaGuncellenecekKisi) {
    const olusturulanTrElementi = document.createElement("tr");
    olusturulanTrElementi.innerHTML = `<td>${eklenecekVeyaGuncellenecekKisi.ad}</td>
    <td>${eklenecekVeyaGuncellenecekKisi.soyad}</td>
    <td>${eklenecekVeyaGuncellenecekKisi.mail}</td>
    <td>
        <button  class="btn btn--edit">
            <i class="fa-solid fa-edit"></i>
        </button>
        <button class="btn btn--delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>`;
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekVeyaGuncellenecekKisi);
    bilgiOlustur("Kişi rehbere kaydedildi", true)
}

function kisiIslemleriniYap(event) {

    if (event.target.classList.contains("btn--delete")) {
        const silinecekTR = event.target.parentElement.parentElement;
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTR, silinecekMail);
    } else if (event.target.classList.contains("btn--edit")) {
        document.querySelector(".kaydetGuncelle").value = "Guncelle";   //console.log("güncelleme")
        const secilenTR = event.target.parentElement.parentElement;
        //const guncellenecekMail = secilenTr.cells[2].textContent;

        ad.value = secilenTR.cells[0].textContent;
        soyad.value = secilenTR.cells[1].textContent;
        mail.value = secilenTR.cells[2].textContent;

        secilenSatir = secilenTR;


    }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
    silinecekTrElement.remove();

    //Maile göre silme işlemi
    // tumKisilerDizisi.forEach((kisi,index) => {
    //     if(kisi.mail ===silinecekMail){
    //         tumKisilerDizisi.splice(index,1)
    //     }
    // });
    const silinmeyecekKisiler = tumKisilerDizisi.filter(function (kisi, index) {
        return kisi.mail !== silinecekMail
    });
    tumKisilerDizisi.length = 0;
    tumKisilerDizisi.push(...silinmeyecekKisiler);

    alanlarıTemizle();
    document.querySelector(".kaydetGuncelle").value="Submit"
}

function kisiyiGuncelle(kisi) {
    //Seçilen satırda güncellenmemiş değerler var 
    for (let i = 0; i < tumKisilerDizisi.length; i++) {
        if (tumKisilerDizisi[i].mail === secilenSatir.cells[2].textContent) {
            tumKisilerDizisi[i] = kisi;
            break; 
        }
    }
    //kişi paraametresinde seçilen kişinin yeni değerleri vardır.
    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail;

    document.querySelector(".kaydetGuncelle").value = "Submit";
    sitedeYapilanEdit++;
    secilenSatir = undefined

}