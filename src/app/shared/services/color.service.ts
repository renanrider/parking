import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  darkenColor(color: string, amount: number): string {
    // Convert the color to the RGB format
    const rgb = this.hexToRgb(color);

    // Calculate the darker color by reducing the RGB values
    const darkerR = Math.max(0, rgb.r - amount * 255);
    const darkerG = Math.max(0, rgb.g - amount * 255);
    const darkerB = Math.max(0, rgb.b - amount * 255);

    // Convert the darker RGB values back to hex format
    const darkerColor = this.rgbToHex(darkerR, darkerG, darkerB);

    return darkerColor;
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Remove the '#' character if present
    hex = hex.replace('#', '');

    // Convert the hex color to RGB values
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return { r, g, b };
  }

  rgbToHex(r: number, g: number, b: number): string {
    // Convert the RGB values to hex format
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    return `#${hexR}${hexG}${hexB}`;
  }
}
