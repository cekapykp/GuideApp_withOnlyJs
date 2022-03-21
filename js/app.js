// Arayüz elemenlerine erişme
const ad = document.getElementById("ad");
const soyad = document.getElementById("soyad");
const mail = document.getElementById("mail");

const form = document.getElementById("form-rehber");

//Event-listenerlarin tanımlanması
form.addEventListener("submit", kaydet);

function kaydet(e){
    e.preventDefault();
    const eklenecekKisi = {
        ad: ad.value,
        soyad : soyad.value,
        mail:mail.value,
    }
    const sonuc = verileriKontrolEt(eklenecekKisi);
    if(sonuc.durum){
        bilgiOlustur(sonuc.mesaj,sonuc.durum);
    }else{
        bilgiOlustur(sonuc.mesaj,sonuc.durum)
    }
}

function verileriKontrolEt(kisi){
    for(const deger in kisi){
        if(kisi[deger]){
            console.log(kisi[deger]);
        }else{
            return{
                durum : false,
                mesaj: "Boş alan bırakmayınız"
            }
        }
    }
    return{
        durum:true,
        mesaj: `Kaydedildi`,
    }
}

function bilgiOlustur(mesaj,durum){
    const olusturulanBilgi = document.createElement("div");
    olusturulanBilgi.textContent = mesaj;

    olusturulanBilgi.className = "bilgi";

    olusturulanBilgi.classList.add(durum ? "bilgi--success" : "bilgi--error")
    document.querySelector(".container").insertBefore(olusturulanBilgi,form);
}