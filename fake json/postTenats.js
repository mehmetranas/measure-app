var request = require("request");
var postUrl = 'https://167.99.81.86:8181/admin/company/add';
var success = 0;
var err = 0;

var tenants =
  [
    {
      "tenantName": "Abı Tazegül"
    },
    {
      "tenantName": "Bay Arıboğa Kocabıyık"
    },
    {
      "tenantName": "Iyıktağ Barbarosoğlu"
    },
    {
      "tenantName": "Bindir Başoğlu"
    },
    {
      "tenantName": "Aşıkbulmuş Paksüt"
    },
    {
      "tenantName": "Güler Akar "
    },
    {
      "tenantName": "Abakan Akbulut"
    },
    {
      "tenantName": "Bilgez Tazegül"
    },
    {
      "tenantName": "Basar Mertoğlu"
    },
    {
      "tenantName": "Adar Akaydın"
    },
    {
      "tenantName": "Güler Balaban V"
    },
    {
      "tenantName": "Bay Alayunt Tekelioğlu"
    },
    {
      "tenantName": "İkeme Taşlı PhD"
    },
    {
      "tenantName": "Badabul Akyürek"
    },
    {
      "tenantName": "Etil Pekkan"
    },
    {
      "tenantName": "Baskın Yeşilkaya"
    },
    {
      "tenantName": "Avar Adıvar"
    },
    {
      "tenantName": "Barçadurmuş Velioğlu"
    },
    {
      "tenantName": "Aybars Erçetin"
    },
    {
      "tenantName": "Biçek Yeşilkaya"
    },
    {
      "tenantName": "Bağa Alpuğan DDS"
    },
    {
      "tenantName": "Baltar Koçoğlu II"
    },
    {
      "tenantName": "Barkdurmuş Topçuoğlu"
    },
    {
      "tenantName": "Çağrı Kavaklıoğlu"
    },
    {
      "tenantName": "Baybüre Körmükçü"
    },
    {
      "tenantName": "Bayan Aydarkağan Çörekçi"
    },
    {
      "tenantName": "Bayık Alyanak"
    },
    {
      "tenantName": "Erinç Numanoğlu DVM"
    },
    {
      "tenantName": "Bektür Duygulu"
    },
    {
      "tenantName": "Bağa Tokgöz"
    }
  ]

tenants.forEach(function (tenant,index) {
  request({
      url: postUrl,
      auth: {
        'user': 'super_user',
        'pass': 'super',
        'sendImmediately': false
      },
      method: 'POST',
      json: true,
      body:tenant
    },
    function (error,response) {
      if(response){
        success++;console.log(response)
        if(index === tenants.length-1){
          console.log("Success post tenets count is: ",success);
          console.log("Failed post tenets count is: ",err);
        }
      }
      if(error) {
        err++;
        if(index === tenants.length-1){
          console.log("Success post orders count is: ",success);
          console.log("Failed post orders count is: ",err);
        }
      }
    }
  )
});
