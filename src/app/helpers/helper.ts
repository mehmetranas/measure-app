export const mechanismTypes =[
  {value: 0, viewValue: 'Tek Kasa'},
  {value: 1, viewValue: 'Parçalı'},
  {value: 2, viewValue: 'Tek Kasa + Çoklu Mekanizma'}
];
export const mountTypes = ["Yok","Korniş","Rustik"];

export const piles = [
  {value:'Amerikan Pile', viewValue:'Amerikan Pile'},
  {value:'Kanun Pile', viewValue:'Kanun Pile'},
  {value:'Yan Pile', viewValue:'Yan Pile'},
  {value:'Diğer', viewValue:'Diğer'}
];

export const fontTypes = [
  {value:1, viewValue:'Kruvaze Kanat'},
  {value:2, viewValue:'Fon Kanat'},
  {value:3, viewValue:'Japon Panel'},
];

export const locations = [
  {id:0, value: "LIVING_ROOM", viewValue: 'Oturma Odası'},
  {id:1, value: "BEDROOM", viewValue: 'Yatak Odası'},
  {id:2, value: "KITCHEEN", viewValue: 'Mutfak'},
  {id:3, value: "WORKING_ROOM", viewValue: 'Çalışma Odası'},
  {id:4, value: "KID_ROOM", viewValue: 'Çocuk Odası'},
  {id:5, value: "BALCONY", viewValue: 'Balkon'},
  {id:6, value: "GARRET", viewValue: 'Çatı Katı'},
  {id:7, value: "SALOON", viewValue: 'Salon'},
  {id:8, value: "FREE_ROOM1", viewValue: 'Boş Oda 1'},
  {id:9, value: "FREE_ROOM2", viewValue: 'Boş Oda 2'},
  {id:10, value: "FREE_ROOM3", viewValue: 'Boş Oda 3'},
  {id:11, value: "FREE_ROOM4", viewValue: 'Boş Oda 4'}
];

export const products = [
  {value: 0,viewValue:'Tül Perde'},
  {value: 1,viewValue:'Güneşlik'},
  {value: 2 ,viewValue:'Stor Perde'},
  {value: 3,viewValue:'Zebra Perde'},
  {value: 4,viewValue:'Jaluzi'},
  {value: 5,viewValue:'Dikey Perde'},
  {value: 6,viewValue:'Kruvaze Tül'},
  {value: 7,viewValue:'Briz'},
  {value: 8,viewValue:'Farbella'},
  {value: 9,viewValue:'Fon Perde'},
  {value: 10,viewValue:'Tül Store'}
];

export const orderStatus = {
  'Eksik Sipariş':{value:0,viewValue:'Eksik Sipariş',
    message:'Devam ederseniz, siparişiniz eksik siparişler tablosuna kaydedilecektir.Fakat istediğiniz zaman bu siparişe ölçü ekleyebilirsiniz.'},
  'Ölçüye Gidilecek':  {value:1,viewValue:'Ölçüye Gidilecek',
    message:'Sipariş ölçüsü alınmadığı için bu sipariş, ölçüye gidilecekler listesinde yer alacak'},
  'Kayıt Alındı': {value:2,viewValue:'Kayıt Alındı'},
  'İşleme Konuldu':  {value:3,viewValue:'İşleme Konuldu'},
  'Hazır':  {value:4,viewValue:'Hazır'},
  'Teslim Edildi':{value:5,viewValue:'Teslim Edildi'},
  'Teklif': {value:6,viewValue: 'Teklif Olarak Kaydet'}
};

export const directions = [
  {value:0, viewValue:'Yok'},
  {value:1, viewValue:'Sol'},
  {value:2, viewValue:'Sağ'}
];

export const orderStatusNameValue = [
  'Eksik Sipariş',
  'Ölçüye Gidilecek',
  'Kayıt Alındı',
  'İşleme Konuldu',
  'Hazır',
  'Teslim Edildi',
  'Teklif'
];
