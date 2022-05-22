const urunKontrol = (function () {
  const Product = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };
  const veri = {
    urunler: [],
    secilenUrunler: null,
    toplamFiyat: 0,
  };

  return {
    getUrunler: function () {
      return veri.urunler;
    },
    getVeri: function () {
      return veri;
    },
    urunEkle: function (name, price) {
      let id;

      if (veri.urunler.length > 0) {
        id = veri.urunler[veri.urunler.length - 1].id + 1;
      } else {
        id = 1;
      }
      const yeniUrun = new Product(id, name, parseFloat(price));
      veri.urunler.push(yeniUrun);
      return yeniUrun;
    },
    getToplam: function () {
      let toplam = 0;

      veri.urunler.forEach(function (item) {
        toplam += item.price;
      });
      veri.toplamFiyat = toplam;
      return veri.toplamFiyat;
    },
  };
})();

const arayuzKontrol = (function () {
  const secici = {
    urunListesi: "#urun-listesi",
    addButton: ".addBtn",
    urunIsmi: "#urunIsmi",
    urunFiyati: "#urunFiyati",
    urunCard: "#urunCard",
    toplamTl: "#toplam-tl",
    toplamDolar: "#toplam-dolar",
  };
  return {
    urunListesiOlustur: function (urunler) {
      let html = "";

      urunler.forEach((prd) => {
        html += `
            <tr>
              <td>${prd.id}</td>
              <td>${prd.name}</td>
              <td>${prd.price} $</td>
              <td class="text-right">
                  <button type="submit" class="btn btn-warning btn-sm">
                <i class="far fa-edit"></i> 
                  </button>
              </td>
            </tr>
            `;
      });
      document.querySelector(secici.urunListesi).innerHTML = html;
    },
    getSecici: function () {
      return secici;
    },
    urunEkle: function (prd) {
      document.querySelector(secici.urunCard).style.display = "block";
      var item = `
      <tr>
              <td>${prd.id}</td>
              <td>${prd.name}</td>
              <td>${prd.price} $</td>
              <td class="text-right">
                  <button type="submit" class="btn btn-warning btn-sm">
                <i class="far fa-edit"></i> 
                  </button>
              </td>
            </tr>
      `;
      document.querySelector(secici.urunListesi).innerHTML += item;
    },
    girdiTemizle: function () {
      document.querySelector(secici.urunIsmi).value = "";
      document.querySelector(secici.urunFiyati).value = "";
    },
    cardGizle: function () {
      document.querySelector(secici.urunCard).style.display = "none";
    },
    showTotal: function (toplam) {
      document.querySelector(secici.toplamDolar).textContent = toplam;
      document.querySelector(secici.toplamTl).textContent = toplam * 16;
    },
  };
})();

const uygulama = (function (ProductCtrl, arayuzKntrl) {
  const arayuzSecicisi = arayuzKontrol.getSecici();

  const loadEventListeners = function () {
    document
      .querySelector(arayuzSecicisi.addButton)
      .addEventListener("click", urunKaydet);
  };

  const urunKaydet = function (e) {
    const urunIsmi = document.querySelector(arayuzSecicisi.urunIsmi).value;
    const urunFiyati = document.querySelector(arayuzSecicisi.urunFiyati).value;
    if (urunIsmi !== "" && urunFiyati !== "") {
      const yeniUrun = ProductCtrl.urunEkle(urunIsmi, urunFiyati);

      arayuzKontrol.urunEkle(yeniUrun);

      const toplam = urunKontrol.getToplam();

      arayuzKntrl.showTotal(toplam);

      arayuzKontrol.girdiTemizle();
    }
    e.preventDefault();
  };
  return {
    init: function () {
      console.log("Uygulama başlatılıyor");
      const urunler = ProductCtrl.getUrunler();
      if (urunler.length == 0) {
        arayuzKntrl.cardGizle();
      } else {
        arayuzKntrl.urunListesiOlustur(urunler);
      }

      arayuzKntrl.urunListesiOlustur(urunler);

      loadEventListeners();
    },
  };
})(urunKontrol, arayuzKontrol);
uygulama.init();
//Jquery komutları
$(function () {
  $("#hide").click(function () {
    $("iframe").hide();
  });
  $("#show").click(function () {
    $("iframe").show();
  });
  $("#toggle").click(function () {
    $("iframe").toggle();
  });
});
