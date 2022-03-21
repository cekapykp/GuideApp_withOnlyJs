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

function kaydet(e){
    e.preventDefault();
    const eklenecekKisi = {
        ad: ad.value,
        soyad : soyad.value,
        mail:mail.value,
    }
    const sonuc = verileriKontrolEt(eklenecekKisi);
    if(sonuc.durum){
        kisiyiEkle(eklenecekKisi);
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
    alanlarıTemizle();
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

    setTimeout(function(){
        const silinecekDiv = document.querySelector(".bilgi");
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    },2000);
}

function alanlarıTemizle(){
    ad.value = "";
    soyad.value="";
    mail.value="";
}

function kisiyiEkle(eklenecekKisi){
    const olusturulanTrElementi = document.createElement("tr");
    olusturulanTrElementi.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button  class="btn btn--edit">
            <i class="fa-solid fa-edit"></i>
        </button>
        <button class="btn btn--delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>`;
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekKisi);
    bilgiOlustur("Kişi rehbere kaydedildi" ,true)
}

function kisiIslemleriniYap(event){

    if(event.target.classList.contains("btn--delete")){
        const silinecekTR = event.target.parentElement.parentElement;
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTR,silinecekMail);
    }else if(event.target.classList.contains("btn--edit")){
        console.log("güncelleme")
    }
}

function rehberdenSil(silinecekTrElement,silinecekMail){
    silinecekTrElement.remove();

    //Maile göre silme işlemi
    // tumKisilerDizisi.forEach((kisi,index) => {
    //     if(kisi.mail ===silinecekMail){
    //         tumKisilerDizisi.splice(index,1)
    //     }
    // });
    const silinmeyecekKisiler = tumKisilerDizisi.filter(function(kisi,index){
        return kisi.mail !== silinecekMail
    });
    tumKisilerDizisi.length = 0;
    tumKisilerDizisi.push(...silinmeyecekKisiler);
}