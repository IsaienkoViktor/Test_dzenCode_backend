# Коментарі SPA-додаток

[Жива сторінка додатку](https://test-d-zen-code-frontend.vercel.app/)

## Форма Додавання Коментаря

Користувач може залишати коментарі, використовуючи наступні поля:

1. **Ім'я користувача (цифри і букви латинського алфавіту):** Обов'язкове поле
2. **E-mail (формат email):** Обов'язкове поле
3. **Домашня сторінка (формат url):** Необов'язкове поле
4. **CAPTCHA (цифри і букви латинського алфавіту):** Зображення та обов'язкове поле
5. **Текст (сам текст повідомлення, всі HTML теги не допускаються, крім дозволених):** Обов'язкове поле

## Головна Сторінка

1. Кожен коментар може мати будь-скільки відповідей (каскадне відображення).
2. Заголовкові коментарі (те, які не є відповіддю) повинні виводитися у вигляді таблиці з можливістю сортування за ім'ям користувача, e-mail та датою додавання (як в порядку зменшення, так і в порядку збільшення).
3. Повідомлення повинні розділятися на сторінки, по 25 повідомлень на кожній.
4. Створено простий дизайн за допомогою CSS.

## JavaScript та AJAX

1. Валідація введених даних як на серверній, так і на клієнтській стороні.
2. Функція попереднього перегляду повідомлення без перезавантаження сторінки.
3. Для HTML тегів створено панель з кнопками ([i], [strong], [code], [a]).

## Регулярні Вирази

1. Користувач може використовувати наступні дозволені HTML теги в повідомленнях: `<a href="" title=""> </a> <code> </code> <i> </i> <strong> </strong>`
2. Перевірка закриття тегів, код повинен бути валідним XHTML.

## JavaScript та Робота з Файлами

1. Користувач може додати до повідомлення зображення або текстовий файл.
2. Зображення повинно мати розмір не більше 320х240 пікселів. При спробі завантажити зображення більшого розміру, воно пропорційно зменшується до зазначених розмірів. Допустимі формати файлів: JPG, JPEG, GIF, PNG.
3. Текстовий файл не повинен бути більше 100 кБ, формат TXT.
4. Перегляд зображень супроводжується візуальними ефектами.

## 🛠️ Технічний стек

- [bcrypt](https://www.npmjs.com/package/bcrypt) ^5.1.1
- [body-parser](https://www.npmjs.com/package/body-parser) ^1.20.2
- [connect-mongo](https://www.npmjs.com/package/connect-mongo) ^5.1.0
- [cors](https://www.npmjs.com/package/cors) 2.8.5
- [cross-env](https://www.npmjs.com/package/cross-env) 7.0.3
- [dotenv](https://www.npmjs.com/package/dotenv) ^16.3.1
- [express](https://expressjs.com/) 4.17.1
- [htmlparser](https://www.npmjs.com/package/htmlparser) ^1.7.7
- [jimp](https://www.npmjs.com/package/jimp) ^0.22.10
- [joi](https://www.npmjs.com/package/joi) ^17.9.2
- [moment](https://www.npmjs.com/package/moment) ^2.29.4
- [mongodb](https://www.npmjs.com/package/mongodb) ^5.7.0
- [mongoose](https://www.npmjs.com/package/mongoose) ^7.4.3
- [morgan](https://www.npmjs.com/package/morgan) 1.10.0
- [multer](https://www.npmjs.com/package/multer) ^1.4.5-lts.1
- [svg-captcha](https://www.npmjs.com/package/svg-captcha) ^1.4.0

## 🚀 Розгортання проєкту

1. Склонуйте репозиторій: `https://github.com/IsaienkoViktor/test_dZenCode_backend`
2. Перейдіть до папки проєкту: `cd test_dZenCode_backend`
3. Встановіть залежності: `npm install` or `yarn install`
4. Додайте змінні в .env файл, використовуючи .env.example
5. Запустіть сервер: `npm run start:dev` or `yarn start:dev`
6. Переглядайте веб-сайт локально за посиланням: `http://localhost:3000`
