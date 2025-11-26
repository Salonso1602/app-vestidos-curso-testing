export type SearchTestCase = {
  id: string;
  title: string;
  filters: {
    q?: string;
    category?: string;
    size?: string;
    color?: string;
    style?: string;
  };
  expectedCategory?: string;
  shouldReturnResults: boolean;
  expectedResult: string;
};

// Valores posibles para cada filtro por categoría
export const dressSizes = ['XS', 'S', 'M', 'L', 'XL'];
export const dressColors = ['Black', 'Floral'];
export const dressStyles = ['Evening', 'Cocktail'];

export const shoesSizes = ['8', '8.5', '9', '9.5', '10'];
export const shoesColors = ['Black', 'Red'];

export const jacketSizes = ['XS', 'S', 'M', 'L', 'XL'];
export const jacketColors = ['Black', 'Red', 'Blue'];
export const jacketStyles = ['Cuero', 'Lana', 'Jean'];

export const bagSizes = ['XS', 'S', 'M', 'L', 'XL'];
export const bagColors = ['Black', 'Red', 'Blue'];
export const bagStyles = ['Tote', 'Birkin', 'Hand', 'Satchel'];

export const categories = ['dress', 'shoes', 'bag', 'jacket'];

const searchTestCases: SearchTestCase[] = [
  {
    id: 'CP-RF001_001',
    title: 'Búsqueda de artículos sin filtros',
    filters: {},
    shouldReturnResults: true,
    expectedResult: 'Todos los artículos deberían ser visibles como resultado',
  },
  ...categories.map(cat => ({
    id: `CP-RF001_002_${cat}`,
    title: `Búsqueda de artículos en base a su categoría - ${cat}`,
    filters: { category: cat },
    expectedCategory: cat,
    shouldReturnResults: true,
    expectedResult: 'Solo los artículos pertenecientes a la categoría seleccionada deberían ser visibles',
  })),
  // ...dressSizes.map(size => ({
  //   id: `CP-RF001_003_${size}`,
  //   title: `Búsqueda de vestidos según talla - ${size}`,
  //   filters: { category: 'dress', size },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los vestidos del talle ingresado deberían ser visibles',
  // })),
  // ...dressColors.map(color => ({
  //   id: `CP-RF001_004_${color}`,
  //   title: `Búsqueda de vestidos según el color - ${color}`,
  //   filters: { category: 'dress', color },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los vestidos del color ingresado deberían ser visibles',
  // })),
  // ...dressStyles.map(style => ({
  //   id: `CP-RF001_005_${style}`,
  //   title: `Búsqueda de vestidos según el estilo - ${style}`,
  //   filters: { category: 'dress', style },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los vestidos del estilo ingresado deberían ser visibles',
  // })),
  // {
  //   id: 'CP-RF001_006',
  //   title: 'Búsqueda de vestidos con todos los filtros',
  //   filters: {
  //     category: 'dress',
  //     size: 'M',
  //     color: 'Black',
  //     style: 'Evening',
  //   },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los vestidos con las características ingresadas deberían ser visibles',
  // },
  // ...shoesSizes.map(size => ({
  //   id: `CP-RF001_007_${size}`,
  //   title: `Búsqueda de zapatos según talla - ${size}`,
  //   filters: { category: 'shoes', size },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los zapatos del talle ingresado deberían ser visibles',
  // })),
  // ...shoesColors.map(color => ({
  //   id: `CP-RF001_008_${color}`,
  //   title: `Búsqueda de zapatos según el color - ${color}`,
  //   filters: { category: 'shoes', color },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los zapatos del color ingresado deberían ser visibles',
  // })),
  // {
  //   id: 'CP-RF001_009',
  //   title: 'Búsqueda de zapatos con todos los filtros',
  //   filters: {
  //     category: 'shoes',
  //     size: '9',
  //     color: 'Black',
  //   },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los zapatos con las características ingresadas deberían ser visibles',
  // },
  // ...jacketSizes.map(size => ({
  //   id: `CP-RF001_010_${size}`,
  //   title: `Búsqueda de chaquetas según talla - ${size}`,
  //   filters: { category: 'jacket', size },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo las chaquetas del talle ingresado deberían ser visibles',
  // })),
  // ...jacketColors.map(color => ({
  //   id: `CP-RF001_011_${color}`,
  //   title: `Búsqueda de chaquetas según el color - ${color}`,
  //   filters: { category: 'jacket', color },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo las chaquetas del color ingresado deberían ser visibles',
  // })),
  // ...jacketStyles.map(style => ({
  //   id: `CP-RF001_012_${style}`,
  //   title: `Búsqueda de chaquetas según el estilo / material - ${style}`,
  //   filters: { category: 'jacket', style },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo las chaquetas del estilo ingresado deberían ser visibles',
  // })),
  // {
  //   id: 'CP-RF001_013',
  //   title: 'Búsqueda de chaquetas con todos los filtros',
  //   filters: {
  //     category: 'jacket',
  //     size: 'L',
  //     color: 'Black',
  //     style: 'Cuero',
  //   },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo las chaquetas con las características ingresadas deberían ser visibles',
  // },
  // ...bagSizes.map(size => ({
  //   id: `CP-RF001_014_${size}`,
  //   title: `Búsqueda de bolsos según talla - ${size}`,
  //   filters: { category: 'bag', size },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los bolsos del talle ingresado deberían ser visibles',
  // })),
  // ...bagColors.map(color => ({
  //   id: `CP-RF001_015_${color}`,
  //   title: `Búsqueda de bolsos según el color - ${color}`,
  //   filters: { category: 'bag', color },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los bolsos del color ingresado deberían ser visibles',
  // })),
  // ...bagStyles.map(style => ({
  //   id: `CP-RF001_016_${style}`,
  //   title: `Búsqueda de bolsos según el estilo - ${style}`,
  //   filters: { category: 'bag', style },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los bolsos del estilo ingresado deberían ser visibles',
  // })),
  // {
  //   id: 'CP-RF001_017',
  //   title: 'Búsqueda de bolsos con todos los filtros',
  //   filters: {
  //     category: 'bag',
  //     size: 'M',
  //     color: 'Black',
  //     style: 'Tote',
  //   },
  //   shouldReturnResults: true,
  //   expectedResult: 'Solo los bolsos con las características ingresadas deberían ser visibles',
  // },
].flat();

export { searchTestCases };
