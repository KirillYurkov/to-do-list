import fs from "fs";
import path from "path";

const images = [
  "samsung-galaxy-a52.webp",
  "iphone-13-pro.webp",
  "xiaomi-redmi-note-10.webp",
  "asus-rog-strix.webp",
  "hp-250-g8.webp",
  "xiaomi-pad-5.webp",
  "ipad-mini-2021.webp",
  "apple-watch-s7.webp",
  "galaxy-watch-4.webp",
  "airpods-3.webp",
  "sony-wh-1000xm4.webp",
  "alienware-34.webp",
  "tshirt-black.webp",
  "hoodie-gray.webp",
  "jeans-blue.webp",
  "nike-air-force-1.webp",
  "adidas-stan-smith.webp",
  "columbia-jacket.webp",
  "white-socks-set.webp",
  "ny-cap.webp",
  "wool-sweater.webp",
  "nike-shorts.webp",
  "bosch-fridge.webp",
  "lg-washing-machine.webp",
  "xiaomi-microwave.webp",
  "tefal-kettle.webp",
  "dyson-v15.webp",
  "delonghi-dinamica.webp",
  "philips-blender.webp",
  "electrolux-oven.webp",
  "xiaomi-deerma.webp",
  "philips-azur.webp",
  "leather-backpack.webp",
  "leather-wallet.webp",
  "xiaomi-umbrella.webp",
  "rayban-aviator.webp",
  "contigo-mug.webp",
  "anker-powerbank.webp",
  "logitech-mx-master.webp",
  "logitech-mx-keys.webp",
  "asus-router.webp",
  "jbl-flip-6.webp",
  "ps5-slim.webp",
  "dualsense.webp",
  "bosch-grinder.webp",
  "tefal-optigrill.webp",
  "xiaomi-scales.webp",
  "passport-cover.webp",
  "key-holder.webp",
  "sandisk-128.webp",
];

const dir = path.join(process.cwd(), "public", "products");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log("Генерация SVG картинок-заглушек...");

// Функция создания красивой векторной SVG картинки
function createSvgPlaceholder() {
  return `<svg xmlns="http://w3.org" width="300" height="300" viewBox="0 0 300 300">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="10" y="10" width="280" height="280" fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="6"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#9ca3af">
            PRODUCT IMAGE
        </text>
    </svg>`;
}

images.forEach((filename) => {
  const targetPath = path.join(dir, filename);
  const svgContent = createSvgPlaceholder();

  try {
    fs.writeFileSync(targetPath, svgContent, "utf-8");
    console.log(`✅ Создана SVG-заглушка: ${filename}`);
  } catch (err) {
    console.error(`❌ Ошибка создания файла ${filename}:`, err.message);
  }
});

console.log("\n🎉 Все 50 SVG-картинок успешно созданы локально!");
