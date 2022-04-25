import { RGB, HSB } from './type';

export function HSBToRGB(hsb: HSB): RGB {
  const rgb: RGB = { r: 0, g: 0, b: 0 };
  const s = (hsb.s * 255) / 100;
  const v = (hsb.b * 255) / 100;
  let h = hsb.h;
  if (s == 0) {
    rgb.r = rgb.g = rgb.b = v;
  } else {
    const t1 = v;
    const t2 = ((255 - s) * v) / 255;
    const t3 = ((t1 - t2) * (h % 60)) / 60;
    if (h == 360) h = 0;
    if (h < 60) {
      rgb.r = t1;
      rgb.b = t2;
      rgb.g = t2 + t3;
    } else if (h < 120) {
      rgb.g = t1;
      rgb.b = t2;
      rgb.r = t1 - t3;
    } else if (h < 180) {
      rgb.g = t1;
      rgb.r = t2;
      rgb.b = t2 + t3;
    } else if (h < 240) {
      rgb.b = t1;
      rgb.r = t2;
      rgb.g = t1 - t3;
    } else if (h < 300) {
      rgb.b = t1;
      rgb.g = t2;
      rgb.r = t2 + t3;
    } else if (h < 360) {
      rgb.r = t1;
      rgb.g = t2;
      rgb.b = t1 - t3;
    } else {
      rgb.r = 0;
      rgb.g = 0;
      rgb.b = 0;
    }
  }

  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
  };
}

export function RGBToHSB(rgb: RGB): HSB {
  const hsb = {
    h: 0,
    s: 0,
    b: 0,
  };
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const delta = max - min;
  hsb.b = max;
  hsb.s = max != 0 ? (255 * delta) / max : 0;
  if (hsb.s != 0) {
    if (rgb.r == max) {
      hsb.h = (rgb.g - rgb.b) / delta;
    } else if (rgb.g == max) {
      hsb.h = 2 + (rgb.b - rgb.r) / delta;
    } else {
      hsb.h = 4 + (rgb.r - rgb.g) / delta;
    }
  } else {
    hsb.h = -1;
  }
  hsb.h *= 60;
  if (hsb.h < 0) {
    hsb.h += 360;
  }
  if (rgb.r == rgb.g && rgb.r == rgb.b && rgb.g == rgb.b) hsb.h = 0;
  hsb.s *= 100 / 255;
  hsb.b *= 100 / 255;
  hsb.h = hsb.h;
  hsb.s = hsb.s;
  hsb.b = hsb.b;

  return hsb;
}

export function rgbToHex(rgb: RGB): string {
  const { r, g, b } = rgb;
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
}

export function hexToRgb(hex: string): RGB | false {
  if (hex.charAt(0) === '#') {
    hex = hex.substring(1);
  }

  if (hex.length !== 3 && hex.length !== 6) {
    return false;
  }

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c: any) => c.repeat(2))
      .join('');
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  let g = parseInt(hex.substring(2, 4), 16);

  return { r, g, b };
}
