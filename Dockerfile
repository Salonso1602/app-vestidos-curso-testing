# Imagen base oficial de Playwright con Node
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para aprovechar la cache de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la app Next.js
RUN npm run build

# Exponer el puerto de la app
EXPOSE 3000

# Comando por defecto (solo si quisieras ejecutar la app dentro del contenedor)
CMD ["npm", "run", "start"]
