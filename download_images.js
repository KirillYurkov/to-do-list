import fs from 'fs';
import path from 'path';
import https from 'https';

const images = {
    'samsung-galaxy-a52.webp': 'samsung+smartphone',
    'iphone-13-pro.webp': 'iphone+pro',
    'xiaomi-redmi-note-10.webp': 'xiaomi+phone',
    'asus-rog-strix.webp': 'gaming+laptop',
    'hp-250-g8.webp': 'office+laptop',
    'xiaomi-pad-5.webp': 'tablet',
    'ipad-mini-2021.webp': 'ipad',
    'apple-watch-s7.webp': 'apple+watch',
    'galaxy-watch-4.webp': 'smartwatch',
    'airpods-3.webp': 'airpods',
    'sony-wh-1000xm4.webp': 'sony+headphones',
    'alienware-34.webp': 'gaming+monitor',
    'tshirt-black.webp': 'black+tshirt',
    'hoodie-gray.webp': 'gray+hoodie',
    'jeans-blue.webp': 'blue+jeans',
    'nike-air-force-1.webp': 'sneakers+white',
    'adidas-stan-smith.webp': 'sneakers',
    'columbia-jacket.webp': 'winter+jacket',
    'white-socks-set.webp': 'socks',
    'ny-cap.webp': 'baseball+cap',
    'wool-sweater.webp': 'sweater',
    'nike-shorts.webp': 'shorts',
    'bosch-fridge.webp': 'refrigerator',
    'lg-washing-machine.webp': 'washing+machine',
    'xiaomi-microwave.webp': 'microwave',
    'tefal-kettle.webp': 'kettle',
    'dyson-v15.webp': 'vacuum+cleaner',
    'delonghi-dinamica.webp': 'coffee+machine',
    'philips-blender.webp': 'blender',
    'electrolux-oven.webp': 'oven',
    'xiaomi-deerma.webp': 'humidifier',
    'philips-azur.webp': 'iron',
    'leather-backpack.webp': 'backpack',
    'leather-wallet.webp': 'wallet',
    'xiaomi-umbrella.webp': 'umbrella',
    'rayban-aviator.webp': 'sunglasses',
    'contigo-mug.webp': 'thermos',
    'anker-powerbank.webp': 'powerbank',
    'logitech-mx-master.webp': 'computer+mouse',
    'logitech-mx-keys.webp': 'keyboard',
    'asus-router.webp': 'router',
    'jbl-flip-6.webp': 'speaker',
    'ps5-slim.webp': 'playstation',
    'dualsense.webp': 'gamepad',
    'bosch-grinder.webp': 'coffee+grinder',
    'tefal-optigrill.webp': 'grill',
    'xiaomi-scales.webp': 'smart+scale',
    'passport-cover.webp': 'passport+cover',
    'key-holder.webp': 'key+case',
    'sandisk-128.webp': 'usb+flash'
};

const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'products');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

console.log('Старт загрузки картинок...');

// Функция для скачивания одного файла с поддержкой редиректов
const downloadFile = (url, targetPath, filename) => {
    return new Promise((resolve) => {
        https.get(url, (response) => {
            // Если сервис перенаправляет (301 или 302), идем по новому адресу
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadFile(response.headers.location, targetPath, filename).then(resolve);
                return;
            }

            if (response.statusCode !== 200) {
                console.error(`Ошибка скачивания ${filename}: Статус ${response.statusCode}`);
                resolve();
                return;
            }

            const fileStream = fs.createWriteStream(targetPath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Успешно скачан: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Ошибка сети для ${filename}:`, err.message);
            if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
            }
            resolve();
        });
    });
};

// Запускаем скачивание по очереди, чтобы не спамить сервер
const main = async () => {
    const entries = Object.entries(images);
    for (let i = 0; i < entries.length; i++) {
        const [filename, query] = entries[i];
        const targetPath = path.join(dir, filename);

        if (fs.existsSync(targetPath)) {
            console.log(`Уже существует: ${filename}`);
            continue;
        }

        // Генерируем случайное уникальное фото размером 600x600 для каждого товара
        const randomId = Math.floor(Math.random() * 1000);
        const url = `https://picsum.photos{randomId}/600/600`;

        await downloadFile(url, targetPath, filename);
        
        // Маленькая пауза в 100мс между скачиваниями
        await new Promise(r => setTimeout(r, 100));
    }
    console.log('🎉 Все картинки успешно загружены в папку public/assets/images/products/!');
};

main();
