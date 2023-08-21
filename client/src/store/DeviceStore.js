import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "smarthphones" },
      { id: 2, name: "laptops" },
    ];
    this._brands = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Asus" },
    ];
    this._devices = [
      {
        id: 1,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
      {
        id: 2,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
      {
        id: 3,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
      {
        id: 4,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
    ];
    makeAutoObservable(this);
  }
  setDevice(devices) {
    this._devices = devices;
  }
  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }

  get devices() {
    return this._devices;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
}
