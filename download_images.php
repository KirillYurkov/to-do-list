<?php
// Массив соответствий: какое ключевое слово искать для какого файла в базе
$images = [
    'samsung-galaxy-a52.webp' => 'samsung+smartphone',
    'iphone-13-pro.webp' => 'iphone+pro',
    'xiaomi-redmi-note-10.webp' => 'xiaomi+phone',
    'asus-rog-strix.webp' => 'gaming+laptop',
    'hp-250-g8.webp' => 'office+laptop',
    'xiaomi-pad-5.webp' => 'tablet',
    'ipad-mini-2021.webp' => 'ipad',
    'apple-watch-s7.webp' => 'apple+watch',
    'galaxy-watch-4.webp' => 'smartwatch',
    'airpods-3.webp' => 'airpods',
    'sony-wh-1000xm4.webp' => 'sony+headphones',
    'alienware-34.webp' => 'gaming+monitor',
    'tshirt-black.webp' => 'black+tshirt',
    'hoodie-gray.webp' => 'gray+hoodie',
    'jeans-blue.webp' => 'blue+jeans',
    'nike-air-force-1.webp' => 'sneakers+white',
    'adidas-stan-smith.webp' => 'sneakers',
    'columbia-jacket.webp' => 'winter+jacket',
    'white-socks-set.webp' => 'socks',
    'ny-cap.webp' => 'baseball+cap',
    'wool-sweater.webp' => 'sweater',
    'nike-shorts.webp' => 'shorts',
    'bosch-fridge.webp' => 'refrigerator',
    'lg-washing-machine.webp' => 'washing+machine',
    'xiaomi-microwave.webp' => 'microwave',
    'tefal-kettle.webp' => 'kettle',
    'dyson-v15.webp' => 'vacuum+cleaner',
    'delonghi-dinamica.webp' => 'coffee+machine',
    'philips-blender.webp' => 'blender',
    'electrolux-oven.webp' => 'oven',
    'xiaomi-deerma.webp' => 'humidifier',
    'philips-azur.webp' => 'iron',
    'leather-backpack.webp' => 'backpack',
    'leather-wallet.webp' => 'wallet',
    'xiaomi-umbrella.webp' => 'umbrella',
    'rayban-aviator.webp' => 'sunglasses',
    'contigo-mug.webp' => 'thermos',
    'anker-powerbank.webp' => 'powerbank',
    'logitech-mx-master.webp' => 'computer+mouse',
    'logitech-mx-keys.webp' => 'keyboard',
    'asus-router.webp' => 'router',
    'jbl-flip-6.webp' => 'speaker',
    'ps5-slim.webp' => 'playstation',
    'dualsense.webp' => 'gamepad',
    'bosch-grinder.webp' => 'coffee+grinder',
    'tefal-optigrill.webp' => 'grill',
    'xiaomi-scales.webp' => 'smart+scale',
    'passport-cover.webp' => 'passport+cover',
    'key-holder.webp' => 'key+case',
    'sandisk-128.webp' => 'usb+flash'
];

// Папка, куда сохранять картинки (убедитесь, что она создана!)
$dir = 'assets/images/products/'; 
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

echo "<h3>Старт загрузки картинок...</h3>";

foreach ($images as $filename => $searchQuery) {
    $targetPath = $dir . $filename;
    
    // Если файл уже скачан — пропускаем
    if (file_exists($targetPath)) {
        continue;
    }

    // Ищем случайное качественное фото на Source Unsplash по ключевому слову
    $url = "https://unsplash.com"; // стандартная заглушка
    
    // Запрашиваем тематическое фото (сервис выдаст редирект на реальное изображение)
    $sourceUrl = "https://unsplash.com?" . $searchQuery;
    
    // Скачиваем
    $imgData = @file_get_contents($sourceUrl);
    if ($imgData === false) {
        // Если Source Unsplash лежит, берем обычный плейсхолдер, чтобы скрипт не падал
        $imgData = file_get_contents("https://placehold.co" . urlencode($searchQuery));
    }

    file_put_contents($targetPath, $imgData);
    echo "Скачан файл: {$filename} (тема: {$searchQuery})<br>";
    
    // Небольшая пауза, чтобы сервер стока не забанил за спам-запросы
    usleep(200000); 
}

echo "<h3>Все картинки успешно загружены в папку {$dir}!</h3>";
?>
