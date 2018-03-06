var request = require("request");

var customers = [
  {
    'customerDetailModel': {
      'nameSurname': 'Akkun Erbay',
      'mobilePhone': '+90-006-207-18-17',
      'fixedPhone': '+90-130-333-52-39',
      'address': 'Tahincioğlu Forges / Oklahoma',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Aykan Kuday',
      'mobilePhone': '+90-507-216-63-68',
      'fixedPhone': '+90-749-461-29-25',
      'address': 'Alakurt Mountain / Oregon',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Gönül Özkara',
      'mobilePhone': '+90-055-166-74-28',
      'fixedPhone': '+90-195-624-21-82',
      'address': 'Bayık Lodge / North Carolina',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Iyık Nalbantoğlu',
      'mobilePhone': '+90-131-752-28-36',
      'fixedPhone': '+90-311-964-70-03',
      'address': 'Karaduman Fall / Arkansas',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bozkurt Durak ',
      'mobilePhone': '+90-056-108-76-02',
      'fixedPhone': '+90-699-735-66-53',
      'address': 'Bıtrı Radial / Georgia',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bünül Çörekçi',
      'mobilePhone': '+90-772-317-11-02',
      'fixedPhone': '+90-976-571-39-96',
      'address': 'Balakatay Shore / Montana',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bünül Elçiboğa',
      'mobilePhone': '+90-365-792-56-13',
      'fixedPhone': '+90-258-575-12-65',
      'address': 'Kutlay Rapids / Mississippi',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bay Barsgan Karaer',
      'mobilePhone': '+90-775-953-06-15',
      'fixedPhone': '+90-150-867-56-46',
      'address': 'Nalbantoğlu Wall / Oregon',
      'newsletterAccepted': true
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Barkdoğmuş Akman',
      'mobilePhone': '+90-518-826-23-86',
      'fixedPhone': '+90-525-674-38-83',
      'address': 'Özbey Path / New Jersey',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Biçek Akyüz',
      'mobilePhone': '+90-537-932-81-90',
      'fixedPhone': '+90-798-177-12-51',
      'address': 'Atakol Cliff / West Virginia',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Çiğdem Mertoğlu',
      'mobilePhone': '+90-824-405-45-90',
      'fixedPhone': '+90-773-217-44-95',
      'address': 'Topaloğlu Street / Arkansas',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Butuk Kurutluoğlu',
      'mobilePhone': '+90-452-020-59-31',
      'fixedPhone': '+90-106-416-91-10',
      'address': 'Biçer Course / North Carolina',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Altınkağan Öztonga',
      'mobilePhone': '+90-217-005-43-43',
      'fixedPhone': '+90-657-286-73-02',
      'address': 'Nalbantoğlu Field / Rhode Island',
      'newsletterAccepted': true
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Alkabölük Ozansoy',
      'mobilePhone': '+90-942-301-71-68',
      'fixedPhone': '+90-828-454-25-80',
      'address': 'Yalçın Glens / Georgia',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Boğaçuk Velioğlu',
      'mobilePhone': '+90-953-748-26-30',
      'fixedPhone': '+90-513-163-56-84',
      'address': 'Alparsbeğ Point / Virginia',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Azgan Topaloğlu',
      'mobilePhone': '+90-394-853-36-48',
      'fixedPhone': '+90-412-438-74-58',
      'address': 'Bağatengrikağan Walk / Arizona',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Baykal Akaydın',
      'mobilePhone': '+90-206-272-75-40',
      'fixedPhone': '+90-633-122-40-46',
      'address': 'Alparslan Corner / New Mexico',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Barkan Bakırcıoğlu',
      'mobilePhone': '+90-391-376-68-58',
      'fixedPhone': '+90-072-999-90-87',
      'address': 'Türkyılmaz Village / Texas',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Begi Tazegül',
      'mobilePhone': '+90-311-489-19-55',
      'fixedPhone': '+90-364-440-74-11',
      'address': 'Çetiner Falls / Nebraska',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Berke Akal',
      'mobilePhone': '+90-549-010-54-89',
      'fixedPhone': '+90-275-223-15-39',
      'address': 'Ertürk Ramp / Florida',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Prof. Dr. Basanyalavaç Denkel',
      'mobilePhone': '+90-650-314-04-71',
      'fixedPhone': '+90-294-021-63-31',
      'address': 'Ebkızı Grove / Louisiana',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bükebuyruç Sadıklar III',
      'mobilePhone': '+90-142-705-70-56',
      'fixedPhone': '+90-457-198-02-74',
      'address': 'Duygulu Lodge / Illinois',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bayan Bakşı Arslanoğlu',
      'mobilePhone': '+90-688-858-21-89',
      'fixedPhone': '+90-985-153-87-26',
      'address': 'Karabulut Pike / California',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Berkyaruk Tokgöz',
      'mobilePhone': '+90-621-883-54-56',
      'fixedPhone': '+90-890-508-55-51',
      'address': 'Aykaç Landing / Georgia',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Beğboğa Özbey',
      'mobilePhone': '+90-449-988-19-39',
      'fixedPhone': '+90-879-513-75-82',
      'address': 'Altıntamgantarkan Knolls / Arkansas',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Gökçen Aydan',
      'mobilePhone': '+90-899-093-53-73',
      'fixedPhone': '+90-247-274-13-92',
      'address': 'Adaş Centers / Arizona',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Biligköngülsengün Yorulmaz',
      'mobilePhone': '+90-540-057-61-83',
      'fixedPhone': '+90-025-485-35-76',
      'address': 'Bağan Fork / Montana',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Artut Erginsoy',
      'mobilePhone': '+90-786-151-41-53',
      'fixedPhone': '+90-937-129-40-07',
      'address': 'Adal Harbor / New Mexico',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Aladoğan Avan Jr.',
      'mobilePhone': '+90-387-677-03-81',
      'fixedPhone': '+90-077-081-27-97',
      'address': 'Kutlay Square / Ohio',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bozok Pektemek',
      'mobilePhone': '+90-925-571-87-50',
      'fixedPhone': '+90-598-178-89-59',
      'address': 'Sözeri Manors / Utah',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Alayuntlu Kurutluoğlu',
      'mobilePhone': '+90-151-163-17-16',
      'fixedPhone': '+90-495-532-61-14',
      'address': 'Samancı Plain / Ohio',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Alpata Kaya ',
      'mobilePhone': '+90-110-621-22-39',
      'fixedPhone': '+90-469-210-78-52',
      'address': 'Akar  Road / Delaware',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Çobulmak Alyanak',
      'mobilePhone': '+90-100-990-51-68',
      'fixedPhone': '+90-192-181-19-89',
      'address': 'Kıvanç Springs / Tennessee',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Baççayman Okur',
      'mobilePhone': '+90-599-077-77-91',
      'fixedPhone': '+90-001-968-29-40',
      'address': 'Buluç Port / Rhode Island',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Katunkız Tokatlıoğlu',
      'mobilePhone': '+90-895-699-70-74',
      'fixedPhone': '+90-449-016-09-24',
      'address': 'Baykam Port / Kentucky',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Alpuluğ Durmaz',
      'mobilePhone': '+90-005-674-65-47',
      'fixedPhone': '+90-471-170-72-61',
      'address': 'Denkel Shore / Georgia',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bağatursepi Yalçın',
      'mobilePhone': '+90-805-206-18-70',
      'fixedPhone': '+90-425-299-72-74',
      'address': 'Ebin View / Hawaii',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bayan Bulmuş Özkök ',
      'mobilePhone': '+90-368-216-52-70',
      'fixedPhone': '+90-520-659-83-08',
      'address': 'Karaer Plaza / Vermont',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Basut Sadıklar',
      'mobilePhone': '+90-847-984-64-43',
      'fixedPhone': '+90-074-002-94-57',
      'address': 'Başoğlu Hill / Washington',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bakağul Biçer',
      'mobilePhone': '+90-131-831-56-76',
      'fixedPhone': '+90-665-363-76-16',
      'address': 'Tazegül Ford / Arizona',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bilgin Evliyaoğlu',
      'mobilePhone': '+90-546-285-12-99',
      'fixedPhone': '+90-459-107-50-77',
      'address': 'Taşçı Cliffs / Tennessee',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Çiçek Tokatlıoğlu Jr.',
      'mobilePhone': '+90-757-595-93-73',
      'fixedPhone': '+90-544-863-02-87',
      'address': 'Çağıran Orchard / New York',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bağaalp Sinanoğlu',
      'mobilePhone': '+90-834-516-41-99',
      'fixedPhone': '+90-677-188-63-12',
      'address': 'Günday Road / Idaho',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Arınç Kunt',
      'mobilePhone': '+90-910-211-64-32',
      'fixedPhone': '+90-190-591-62-81',
      'address': 'Adan Underpass / Wyoming',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Buşulgan Ekşioğlu',
      'mobilePhone': '+90-711-510-77-02',
      'fixedPhone': '+90-498-653-89-85',
      'address': 'Altan Glens / Wisconsin',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Aşıkbulmuş Karaer',
      'mobilePhone': '+90-345-918-43-62',
      'fixedPhone': '+90-089-441-73-11',
      'address': 'Akkunlu Trafficway / North Dakota',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Beltir Türkdoğan',
      'mobilePhone': '+90-952-213-86-23',
      'fixedPhone': '+90-365-447-15-05',
      'address': 'Kunt Parkways / Virginia',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bayan Güzey Ertürk',
      'mobilePhone': '+90-757-915-11-73',
      'fixedPhone': '+90-359-892-38-27',
      'address': 'Kıvılcım Burgs / Illinois',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bağaturipi Çetin',
      'mobilePhone': '+90-312-772-48-75',
      'fixedPhone': '+90-446-437-45-53',
      'address': 'Güneş Station / Pennsylvania',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Butuk Ağaoğlu',
      'mobilePhone': '+90-325-056-05-90',
      'fixedPhone': '+90-061-673-40-22',
      'address': 'Balaban Spur / South Carolina',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'İdil Koç',
      'mobilePhone': '+90-771-010-66-96',
      'fixedPhone': '+90-397-572-69-93',
      'address': 'Çetiner Gateway / Washington',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bayan Barsurungu Egeli',
      'mobilePhone': '+90-737-392-20-54',
      'fixedPhone': '+90-803-356-93-97',
      'address': 'Küçükler Fields / Kansas',
      'newsletterAccepted': true
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bolsun Bakırcıoğlu V',
      'mobilePhone': '+90-958-910-80-71',
      'fixedPhone': '+90-218-886-88-97',
      'address': 'Aykağan Views / Rhode Island',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bongulboğa Bakırcıoğlu',
      'mobilePhone': '+90-528-031-11-67',
      'fixedPhone': '+90-212-936-16-19',
      'address': 'Bürlük Mission / Florida',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bulaçapan Erbulak',
      'mobilePhone': '+90-649-835-17-82',
      'fixedPhone': '+90-915-374-42-58',
      'address': 'Çağrıtegin Walks / Montana',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Akbay Eliçin',
      'mobilePhone': '+90-544-757-64-41',
      'fixedPhone': '+90-069-480-41-30',
      'address': 'Ekşioğlu Expressway / California',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Dr. Aldoğan Ekici',
      'mobilePhone': '+90-304-649-48-07',
      'fixedPhone': '+90-627-415-95-51',
      'address': 'Ayız Squares / West Virginia',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Güler Sezek',
      'mobilePhone': '+90-064-524-93-79',
      'fixedPhone': '+90-464-949-89-71',
      'address': 'Atan Landing / Hawaii',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Büküşboğa Erberk DDS',
      'mobilePhone': '+90-600-704-78-49',
      'fixedPhone': '+90-966-864-05-68',
      'address': 'Tunaboylu Lights / Kansas',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bilgeışbaratamgan Adıvar',
      'mobilePhone': '+90-344-655-10-74',
      'fixedPhone': '+90-105-689-12-43',
      'address': 'Bukaktutuk Springs / Maryland',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Basut Durak ',
      'mobilePhone': '+90-834-207-89-89',
      'fixedPhone': '+90-248-874-04-36',
      'address': 'Asartegin Lock / Arkansas',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Prof. Dr. Budak Hakyemez',
      'mobilePhone': '+90-329-876-52-59',
      'fixedPhone': '+90-721-055-91-69',
      'address': 'Algu Estate / Hawaii',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Kımızalma Sinanoğlu',
      'mobilePhone': '+90-517-424-97-36',
      'fixedPhone': '+90-397-034-48-71',
      'address': 'Akyürek Light / Mississippi',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Atasu Nalbantoğlu',
      'mobilePhone': '+90-506-940-53-43',
      'fixedPhone': '+90-548-603-45-38',
      'address': 'Akman Spring / Kansas',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'İrtiş Bolatlı',
      'mobilePhone': '+90-079-255-25-13',
      'fixedPhone': '+90-604-756-16-76',
      'address': 'Akşit Fields / New Jersey',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bay Gün Dağlaroğlu',
      'mobilePhone': '+90-736-447-85-53',
      'fixedPhone': '+90-129-830-11-06',
      'address': 'Akyürek Mountain / Montana',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Edil Aykaç DVM',
      'mobilePhone': '+90-583-867-86-11',
      'fixedPhone': '+90-037-445-34-54',
      'address': 'Okumuş Lodge / Illinois',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bilgeışbara Barbarosoğlu I',
      'mobilePhone': '+90-466-455-01-62',
      'fixedPhone': '+90-685-789-49-98',
      'address': 'Yılmazer Knolls / Vermont',
      'newsletterAccepted': true
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Katun Karaer',
      'mobilePhone': '+90-375-812-79-08',
      'fixedPhone': '+90-372-792-64-29',
      'address': 'Erçetin Garden / Alabama',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Baykal Pektemek',
      'mobilePhone': '+90-664-306-79-98',
      'fixedPhone': '+90-893-648-44-33',
      'address': 'Baltacı Ridges / Alabama',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Kazkatun Akgül',
      'mobilePhone': '+90-357-031-15-11',
      'fixedPhone': '+90-313-529-25-57',
      'address': 'Erginsoy Motorway / Montana',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Beyrek Eliçin',
      'mobilePhone': '+90-569-490-75-33',
      'fixedPhone': '+90-159-869-10-90',
      'address': 'Börübars Lane / North Carolina',
      'newsletterAccepted': false
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Çağru Alnıaçık',
      'mobilePhone': '+90-730-029-06-43',
      'fixedPhone': '+90-955-926-82-00',
      'address': 'Bilgiç Hill / Michigan',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Baydar Egeli DVM',
      'mobilePhone': '+90-617-024-35-18',
      'fixedPhone': '+90-656-493-91-27',
      'address': 'Beğdemir Coves / Alaska',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Altıntamgantarkan Ayverdi',
      'mobilePhone': '+90-201-970-89-22',
      'fixedPhone': '+90-941-746-13-71',
      'address': 'Küçükler Fields / Alaska',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'İldike Dağdaş',
      'mobilePhone': '+90-839-912-06-71',
      'fixedPhone': '+90-543-761-92-70',
      'address': 'Topçuoğlu Lakes / Pennsylvania',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Aydoğan Köybaşı III',
      'mobilePhone': '+90-853-252-41-65',
      'fixedPhone': '+90-446-597-04-82',
      'address': 'Bayuttu Trace / New York',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Başkırt Öymen',
      'mobilePhone': '+90-986-604-62-50',
      'fixedPhone': '+90-155-110-74-94',
      'address': 'Akan Ports / Montana',
      'newsletterAccepted': false
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Çağlar Özbey',
      'mobilePhone': '+90-090-676-59-92',
      'fixedPhone': '+90-131-372-42-19',
      'address': 'Köybaşı Loaf / Georgia',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Balaka Akay',
      'mobilePhone': '+90-089-528-04-38',
      'fixedPhone': '+90-450-743-14-08',
      'address': 'Eronat Drives / Kentucky',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Erinç Yetkiner',
      'mobilePhone': '+90-252-787-95-98',
      'fixedPhone': '+90-104-124-49-56',
      'address': 'İnci Key / Arkansas',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bilgekutluk Türkyılmaz',
      'mobilePhone': '+90-842-457-96-70',
      'fixedPhone': '+90-429-053-70-47',
      'address': 'Kuday Shoals / Michigan',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Buyandemir Kavaklıoğlu',
      'mobilePhone': '+90-888-808-85-40',
      'fixedPhone': '+90-850-839-60-81',
      'address': 'Arkış Corners / New Hampshire',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Börü Erkekli V',
      'mobilePhone': '+90-113-963-68-52',
      'fixedPhone': '+90-736-988-28-58',
      'address': 'Beğdemir Knolls / California',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Azganaz Özberk Jr.',
      'mobilePhone': '+90-729-396-80-54',
      'fixedPhone': '+90-811-724-25-91',
      'address': 'Butak Rue / Kentucky',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bilgetegin Kunt',
      'mobilePhone': '+90-901-616-07-84',
      'fixedPhone': '+90-784-060-68-52',
      'address': 'Çatalbaş Valley / California',
      'newsletterAccepted': true
    },
    'orderStatus': 2
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Baytara Demirel',
      'mobilePhone': '+90-572-981-39-72',
      'fixedPhone': '+90-773-858-53-74',
      'address': 'Bölükbaşı Locks / Montana',
      'newsletterAccepted': true
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bulut Tahincioğlu',
      'mobilePhone': '+90-958-735-26-68',
      'fixedPhone': '+90-497-636-41-05',
      'address': 'Egeli Divide / New Mexico',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'İdil Köylüoğlu',
      'mobilePhone': '+90-874-723-16-31',
      'fixedPhone': '+90-615-324-36-12',
      'address': 'Tanrıkulu Forest / New Jersey',
      'newsletterAccepted': true
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Beğdurmuş Taşlı',
      'mobilePhone': '+90-645-693-89-11',
      'fixedPhone': '+90-229-557-90-47',
      'address': 'Günyaruk Rue / Texas',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bozok Akşit',
      'mobilePhone': '+90-670-261-73-87',
      'fixedPhone': '+90-372-563-12-77',
      'address': 'Başçı Trail / Wyoming',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Duygu Sadıklar',
      'mobilePhone': '+90-497-781-52-62',
      'fixedPhone': '+90-813-713-90-47',
      'address': 'Beğtaş Crossroad / New York',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Atılgan Tüzün',
      'mobilePhone': '+90-352-905-41-58',
      'fixedPhone': '+90-550-690-89-30',
      'address': 'Kocabıyık Ports / Pennsylvania',
      'newsletterAccepted': true
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Barkın Özbir',
      'mobilePhone': '+90-981-214-15-26',
      'fixedPhone': '+90-728-922-65-96',
      'address': 'Inanç Inlet / Oklahoma',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Barsboğa Paksüt',
      'mobilePhone': '+90-272-024-81-95',
      'fixedPhone': '+90-454-127-09-47',
      'address': 'Ertepınar Parkways / West Virginia',
      'newsletterAccepted': false
    },
    'orderStatus': 1
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Prof. Dr. Aygırak Ağaoğlu',
      'mobilePhone': '+90-283-008-16-04',
      'fixedPhone': '+90-874-799-34-65',
      'address': 'Akım Mall / New Mexico',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bardıbay Topaloğlu',
      'mobilePhone': '+90-235-437-42-47',
      'fixedPhone': '+90-068-178-22-39',
      'address': 'Beyizçi Prairie / Alaska',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Işık Alpuğan',
      'mobilePhone': '+90-418-609-86-48',
      'fixedPhone': '+90-754-456-26-14',
      'address': 'Koyuncu Route / West Virginia',
      'newsletterAccepted': true
    },
    'orderStatus': 3
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bartu Akar ',
      'mobilePhone': '+90-973-983-25-19',
      'fixedPhone': '+90-141-115-26-89',
      'address': 'Sinanoğlu Vista / Maryland',
      'newsletterAccepted': false
    },
    'orderStatus': 4
  },
  {
    'customerDetailModel': {
      'nameSurname': 'Bay Aclan',
      'mobilePhone': '+90-084-594-72-51',
      'fixedPhone': '+90-554-618-83-09',
      'address': 'Kaya  Dam / Wyoming',
      'newsletterAccepted': false
    },
    'orderStatus': 0
  }
];

var postCustomerUrl = "https://measure-notebook-api.herokuapp.com/customer/add";

customers.forEach(function (customer, index) {
  // if(index>30) return;
  request({
      url: postCustomerUrl,
      auth: {
        'user': 'admin_user',
        'pass': 'admin',
        'sendImmediately': false
      },
      method: 'POST',
      json: true,
      body:customer
    },
    function (error, response) {
      if(error) return console.log(error);
      console.log("Success" ,response);
    }
  )
});

