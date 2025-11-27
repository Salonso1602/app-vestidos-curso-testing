import type { Item } from '../../lib/RentalManagementSystem';
import {
  dressSizes,
  dressColors,
  dressStyles,
  shoesSizes,
  shoesColors,
  jacketSizes,
  jacketColors,
  jacketStyles,
  bagSizes,
  bagColors,
  bagStyles,
} from './searches';

/**
 * Generates test items programmatically for each combination tested in search tests
 * Each item is created only once even if multiple filters match it
 */
export function generateSearchTestItems(): Item[] {
  let itemId = 1;
  const items: Item[] = [];

  // Dress items: one for each size, color, and style combination
  for (const size of dressSizes) {
    for (const color of dressColors) {
      for (const style of dressStyles) {
        items.push({
          id: itemId++,
          name: `${color} ${style.toLowerCase()} dress - size ${size}`,
          category: 'dress',
          pricePerDay: 49 + Math.random() * 50,
          sizes: [size],
          color: color.toLowerCase(),
          style: style.toLowerCase(),
          description: `A ${color.toLowerCase()} ${style.toLowerCase()} dress in size ${size}.`,
          images: ['/images/dresses/silk-evening-gown.jpg'],
          alt: `${color} ${style} dress size ${size}`,
        });
      }
    }
  }

  // Shoes items: one for each size and color combination
  for (const size of shoesSizes) {
    for (const color of shoesColors) {
      items.push({
        id: itemId++,
        name: `${color} shoes - size ${size}`,
        category: 'shoes',
        pricePerDay: 29 + Math.random() * 30,
        sizes: [size],
        color: color.toLowerCase(),
        description: `${color} shoes in size ${size}.`,
        images: ['/images/dresses/silk-evening-gown.jpg'],
        alt: `${color} shoes size ${size}`,
      });
    }
  }

  // Jacket items: one for each size, color, and style combination
  for (const size of jacketSizes) {
    for (const color of jacketColors) {
      for (const style of jacketStyles) {
        items.push({
          id: itemId++,
          name: `${color} ${style.toLowerCase()} jacket - size ${size}`,
          category: 'jacket',
          pricePerDay: 59 + Math.random() * 40,
          sizes: [size],
          color: color.toLowerCase(),
          style: style.toLowerCase(),
          description: `A ${color.toLowerCase()} ${style.toLowerCase()} jacket in size ${size}.`,
          images: ['/images/dresses/silk-evening-gown.jpg'],
          alt: `${color} ${style} jacket size ${size}`,
        });
      }
    }
  }

  // Bag items: one for each size, color, and style combination
  for (const size of bagSizes) {
    for (const color of bagColors) {
      for (const style of bagStyles) {
        items.push({
          id: itemId++,
          name: `${color} ${style.toLowerCase()} bag - size ${size}`,
          category: 'bag',
          pricePerDay: 39 + Math.random() * 40,
          sizes: [size],
          color: color.toLowerCase(),
          style: style.toLowerCase(),
          description: `A ${color.toLowerCase()} ${style.toLowerCase()} bag in size ${size}.`,
          images: ['/images/dresses/silk-evening-gown.jpg'],
          alt: `${color} ${style} bag size ${size}`,
        });
      }
    }
  }

  return items;
}
