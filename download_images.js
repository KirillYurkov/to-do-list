
import fs from 'fs';
import path from 'path';

const images = [
    'samsung-galaxy-a52.webp', 'iphone-13-pro.webp', 'xiaomi-redmi-note-10.webp',
    'asus-rog-strix.webp', 'hp-250-g8.webp', 'xiaomi-pad-5.webp', 'ipad-mini-2021.webp',
    'apple-watch-s7.webp', 'galaxy-watch-4.webp', 'airpods-3.webp', 'sony-wh-1000xm4.webp',
    'alienware-34.webp', 'tshirt-black.webp', 'hoodie-gray.webp', 'jeans-blue.webp',
    'nike-air-force-1.webp', 'adidas-stan-smith.webp', 'columbia-jacket.webp',
    'white-socks-set.webp', 'ny-cap.webp', 'wool-sweater.webp', 'nike-shorts.webp',
    'bosch-fridge.webp', 'lg-washing-machine.webp', 'xiaomi-microwave.webp',
    'tefal-kettle.webp', 'dyson-v15.webp', 'delonghi-dinamica.webp', 'philips-blender.webp',
    'electrolux-oven.webp', 'xiaomi-deerma.webp', 'philips-azur.webp', 'leather-backpack.webp',
    'leather-wallet.webp', 'xiaomi-umbrella.webp', 'rayban-aviator.webp', 'contigo-mug.webp',
    'anker-powerbank.webp', 'logitech-mx-master.webp', 'logitech-mx-keys.webp',
    'asus-router.webp', 'jbl-flip-6.webp', 'ps5-slim.webp', 'dualsense.webp',
    'bosch-grinder.webp', 'tefal-optigrill.webp', 'xiaomi-scales.webp', 'passport-cover.webp',
    'key-holder.webp', 'sandisk-128.webp'
];

const dir = path.join(process.cwd(), 'public', 'products');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Функция генерации бинарного буфера картинки BMP 300x300 со случайным цветом
function createBmp300x300() {
    const width = 300;
    const height = 300;
    const extraBytes = (width * 3) % 4 === 0 ? 0 : 4 - ((width * 3) % 4);
    const rowSize = width * 3 + extraBytes;
    const pixelDataSize = rowSize * height;
    const fileSize = 54 + pixelDataSize;

    const buffer = Buffer.alloc(fileSize);

    // Сигнатура BMP
    buffer.write('BM', 0);
    buffer.writeUInt32LE(fileSize, 2);
    buffer.writeUInt32LE(54, 10); // Смещение данных

    // Заголовок инфо
    buffer.writeUInt32LE(40, 14); // Размер заголовка
    buffer.writeInt32LE(width, 18);
    buffer.writeInt32LE(height, 22);
    buffer.writeUInt16LE(1, 26); // Планы
    buffer.writeUInt16LE(24, 28); // 24 бит (RGB)
    buffer.writeUInt32LE(pixelDataSize, 34);

    // Случайный цвет для этой картинки
    const r = Math.floor(Math.random() * 150) + 50;
    const g = Math.floor(Math.random() * 150) + 50;
    const b = Math.floor(Math.random() * 150) + 50;

    // Заполнение пикселей
    let offset = 54;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            buffer[offset++] = b;
            buffer[offset++] = g;
            buffer[offset++] = r;
        }
        for (let p = 0; p < extraBytes; p++) {
            buffer[offset++] = 0;
        }
    }

    return buffer;
}

console.log('Генерация полноценных картинок 300x300 на месте...');

images.forEach((filename) => {
    const targetPath = path.join(dir, filename);
    const bmpBuffer = createBmp300x300();
    
    try {
        fs.writeFileSync(targetPath, bmpBuffer);
        console.log(`✅ Создана картинка: ${filename}`);
    } catch (err) {
        console.error(`❌ Ошибка создания файла ${filename}:`, err.message);
    }
});

console.log('\n🎉 Готово! Все 50 файлов сгенерированы локально.');
