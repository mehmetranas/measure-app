import {OrderLineModel} from '../models/order-line.model';

export const mechanismTypes = [
  {value: 0, viewValue: 'Tek Kasa'},
  {value: 1, viewValue: 'Parçalı'},
  {value: 2, viewValue: 'Tek Kasa + Çoklu Mekanizma'}
];
export const mountTypes = ['Yok', 'Korniş', 'Rustik'];

export const piles = [
  {value: 'Amerikan Pile', viewValue: 'Amerikan Pile'},
  {value: 'Kanun Pile', viewValue: 'Kanun Pile'},
  {value: 'Yan Pile', viewValue: 'Yan Pile'},
  {value: 'Diğer', viewValue: 'Diğer'}
];

export const fontTypes = [
  {value: 1, viewValue: 'Kruvaze Kanat'},
  {value: 2, viewValue: 'Fon Kanat'},
  {value: 3, viewValue: 'Japon Panel'},
];

export const locations = [
  {id: 0, value: 'LIVING_ROOM', viewValue: 'Oturma Odası'},
  {id: 1, value: 'BEDROOM', viewValue: 'Yatak Odası'},
  {id: 2, value: 'KITCHEEN', viewValue: 'Mutfak'},
  {id: 3, value: 'WORKING_ROOM', viewValue: 'Çalışma Odası'},
  {id: 4, value: 'KID_ROOM', viewValue: 'Çocuk Odası'},
  {id: 5, value: 'BALCONY', viewValue: 'Balkon'},
  {id: 6, value: 'GARRET', viewValue: 'Çatı Katı'},
  {id: 7, value: 'SALOON', viewValue: 'Salon'},
  {id: 8, value: 'FREE_ROOM1', viewValue: 'Boş Oda 1'},
  {id: 9, value: 'FREE_ROOM2', viewValue: 'Boş Oda 2'},
  {id: 10, value: 'FREE_ROOM3', viewValue: 'Boş Oda 3'},
  {id: 11, value: 'FREE_ROOM4', viewValue: 'Boş Oda 4'}
];

export const products = [
  {value: 0, viewValue: 'Tül Perde', tailorValue: true},
  {value: 1, viewValue: 'Güneşlik', tailorValue: true},
  {value: 2 , viewValue: 'Stor Perde', tailorValue: false},
  {value: 3, viewValue: 'Zebra Perde', tailorValue: false},
  {value: 4, viewValue: 'Jaluzi', tailorValue: true},
  {value: 5, viewValue: 'Dikey Perde', tailorValue: false},
  {value: 6, viewValue: 'Kruvaze Tül', tailorValue: true},
  {value: 7, viewValue: 'Briz', tailorValue: true},
  {value: 8, viewValue: 'Farbella', tailorValue: true},
  {value: 9, viewValue: 'Fon Perde', tailorValue: true},
  {value: 10, viewValue: 'Tül Store', tailorValue: false}
];

export const orderStatus = [
  {value: 6, viewValue: 'Teklif', message: 'Sipariş için hiçbir işlem yapılmayacak. Sadece teklif statüsünde kalacaktır.'},
  {value: 0, viewValue: 'Eksik',
    message: 'Siparişiniz eksik siparişler tablosuna kaydedilecektir.Fakat istediğiniz zaman bu siparişe ölçü ekleyebilirsiniz.'},
  {value: 1, viewValue: 'Ölçü Alınacak',
    message: 'Sipariş ölçüsü alınmadığı için bu sipariş, ölçüye gidilecekler listesinde yer alacak.'},
  {value: 2, viewValue: 'Kayıt Alındı', message: 'Sipariş tamamlandı, ama terziye gitmek için sizin onayınızı bekleyecektir.'},
  {value: 3, viewValue: 'Terzide', message: 'Sipariş tamamlandı, terzi işlemine başlanacak.'},
  {value: 4, viewValue: 'Hazır', message: 'Siparişiniz müşteriye teslim edilmek için hazır.'},
  {value: 5, viewValue: 'Teslim Edildi', message: 'Sipariş müşteriye teslim edildi.'},
];

export const directions = [
  {value: 0, viewValue: 'Yok'},
  {value: 1, viewValue: 'Sol'},
  {value: 2, viewValue: 'Sağ'}
];

export const masks = {
  phone: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
};

export function setTailorOrderlineCount(orderlines: OrderLineModel[]): number {
  if (!orderlines) { return 0; }
  let count = 0;
  orderlines.forEach((orderline: OrderLineModel) => {
    const product =  products[orderline.product.productValue];
    if (product['tailorValue']) {
      count++;
    }
  });
    return count;
}
