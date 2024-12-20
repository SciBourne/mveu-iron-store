# IRON Store
MVP интернет-магазина комплектующих для PC

<br>

## Клиент

* React (TypeScript)
* MobX (хранилища, взамен Reduce)

<br>

## Сервер

* Express (TypeScript)
* MongoDB (без ORM, только драйвер)

<br>

## Запуск dev-версии:

Подготовка данных:
```bash
sudo systemctl start mongod
mongosh -f "data/db-bootstrap.js"
```

Старт сервера:

```bash
cd server && yarn dev
```

Старт клиента:

```bash
cd client && yarn dev
```

<br>

## Снимки экранов
### Главная старинца

![Главная страница](img/screen-1.png)
![Главная страница](img/screen-2.png)
![Главная страница](img/screen-3.png)

### Категории товаров

![Категории товаров](img/screen-4.png)

### Страница товара

![Страница товара](img/screen-5.png)

### Добавление товара в корзину

![Добавленный товар](img/screen-6.png)

### Корзина товаров

![Корзина товаров](img/screen-7.png)

### Оформление заказа

![Оформление заказа](img/screen-8.png)
![Оформление заказа](img/screen-9.png)
![Оформление заказа](img/screen-10.png)

### Регистрация пользователя

![Регистрация пользователя](img/screen-11.png)
![Регистрация пользователя](img/screen-12.png)

### Вход в личный кабинет

![Вход в личный кабинет](img/screen-13.png)

### Личный кабинет

![Личный кабинет](img/screen-14.png)
![Личный кабинет](img/screen-15.png)
![Личный кабинет](img/screen-16.png)












