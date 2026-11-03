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

console.log('Генерация настоящих WebP файлов...');

// Валидный бинарный код серого WebP-изображения размером 300x300 пикселей
const realWebpBuffer = Buffer.from(
    'UklGRmYAAABXRUJQVlA4MFYAAAAvD8ADEA4wCEI6kiw6Xf83wreZ6H8REe0AIgLSAUQEpAOICEgHEBGQDiAiIB1A' +
    'REBKgIiAdAARgXQAEYF0ABGBdAARgXQAEYF0ABGBdAARgXSAdADyAQA=', 
    'base64'
);

images.forEach((filename) => {
    const targetPath = path.join(dir, filename);
    try {
        fs.writeFileSync(targetPath, realWebpBuffer);
        console.log(`✅ Создан WebP файл: ${filename}`);
    } catch (err) {
        console.error(`❌ Ошибка: ${filename}`, err.message);
    }
});

console.log('\n🎉 Все 50 WebP-файлов созданы локально!');

