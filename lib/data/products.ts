export interface Product {
  createdAt: string | number | Date
  id: string
  name: string
  model: string
  price: number
  originalPrice?: number
  image: string
  category: "camera" | "intercom" | "turnstile" | "nvr" | "dvr"
  isNew?: boolean
  isBestSeller?: boolean
  rating: number
  reviewCount: number
  specifications: {
    [key: string]: string
  }
  description: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Hikvision DS-2CD2083G0-I",
    model: "DS-2CD2083G0-I",
    price: 1090000,
    image: "/hikvision-security-camera-white-bullet.jpg",
    category: "camera",
    isBestSeller: true,
    rating: 4.5,
    reviewCount: 0,
    specifications: {
      Resolution: "8MP",
      Lens: "2.8mm",
      "Night Vision": "30m IR",
      Protection: "IP67",
    },
    description: "8MP bullet kamera, 30m IR masofasi, IP67 himoya darajasi",
    createdAt: ''
  },
  {
    id: "2",
    name: "DS-2AE4225TI-D PTZ 360° 2mp",
    model: "DS-2AE4225TI-D",
    price: 2015000,
    image: "/hikvision-bullet-camera-white-4mp.jpg",
    category: "camera",
    isNew: true,
    rating: 3.0,
    reviewCount: 0,
    specifications: {
      Resolution: "2MP",
      Zoom: "25x optical",
      Rotation: "360°",
      "Night Vision": "100m IR",
    },
    description: "PTZ 360° aylanuvchi kamera, 25x optik zoom, 100m IR masofasi",
    createdAt: ''
  },
  {
    id: "3",
    name: "Hikvision DS-2CD1043G0-I 2,8mm 4MP",
    model: "DS-2CD1043G0-I",
    price: 591500,
    image: "/hikvision-bullet-camera-white-4mp.jpg",
    category: "camera",
    isBestSeller: true,
    rating: 4.0,
    reviewCount: 0,
    specifications: {
      Resolution: "4MP",
      Lens: "2.8mm",
      "Night Vision": "30m IR",
      Protection: "IP67",
    },
    description: "4MP bullet kamera, 2.8mm obyektiv, 30m IR masofasi",
    createdAt: ''
  },
  {
    id: "4",
    name: "FACE ID Hikvision DS-K1T343EFWX",
    model: "DS-K1T343EFWX",
    price: 1430000,
    image: "/hikvision-face-recognition-terminal-black.jpg",
    category: "intercom",
    isNew: true,
    rating: 4.5,
    reviewCount: 0,
    specifications: {
      Recognition: "Face ID",
      Display: '7" Touch Screen',
      Storage: "3000 faces",
      Communication: "TCP/IP",
    },
    description: 'Face ID tanish terminali, 7" sensorli ekran, 3000 yuz saqlash',
    createdAt: ''
  },
  {
    id: "5",
    name: "Hikvision DS-2CD2183G0-IU",
    model: "DS-2CD2183G0-IU",
    price: 1050000,
    image: "/hikvision-dome-camera-white-8mp.jpg",
    category: "camera",
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 0,
    specifications: {
      Resolution: "8MP",
      Lens: "2.8mm",
      "Night Vision": "30m IR",
      Audio: "Built-in mic",
    },
    description: "8MP dome kamera, ichki mikrofon, 30m IR masofasi",
    createdAt: ''
  },
  {
    id: "6",
    name: "Hikvision DS-KV6133-ME1",
    model: "DS-KV6133-ME1",
    price: 1105000,
    image: "/hikvision-video-intercom-panel-black.jpg",
    category: "intercom",
    rating: 4.0,
    reviewCount: 0,
    specifications: {
      Display: '7" LCD',
      Camera: "2MP",
      Communication: "IP",
      Protection: "IP65",
    },
    description: 'Video interkom paneli, 7" LCD ekran, 2MP kamera',
    createdAt: ''
  },
]

export const categories = [
  { id: "camera", name: "Kameralar", count: 150 },
  { id: "intercom", name: "Interkomlar", count: 45 },
  { id: "turnstile", name: "Turniketlar", count: 25 },
  { id: "nvr", name: "NVR", count: 30 },
  { id: "dvr", name: "DVR", count: 20 },
]
