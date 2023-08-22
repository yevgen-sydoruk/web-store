import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "Smarthphones" },
      { id: 2, name: "Laptops" },
      { id: 3, name: "Keyboards" },
      { id: 4, name: "Monitors" },
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
      {
        id: 5,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
      {
        id: 6,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
      {
        id: 7,
        name: "Iphone 12 pro",
        price: 1000,
        rating: 5,
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
      },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
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
  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
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
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}
