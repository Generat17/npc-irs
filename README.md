# Тестовое задание на должность fullstack разработчика в компанию НПЦ ИРС

## Инструкция по запуску:

1) База данных (PostgreSQL)
- создать новую БД с названием "npcirs";
- выполнить для созданной БД скрипт из файла "init-db.sql";
- данный скрипт создаст две таблицы и заполнит их тестовыми данными;

2) Сервер (NodeJs)
- открыть папку "server" и выполнить команду "npm install";
- запустить сервер с помощью команду "npm start";
- настроить подключение к БД можно в файле "config/db.config".

3) Клиент (React)
- открыть папку "client" и выполнить команду "npm install --legacy-peer-deps";
- запустить клиент с помощью команду "npm start";
- настроить подключение к серверу можно в файле "src/variables/urlServer.js".

## Описание базы данных (таблицы):

1) Главная таблица "users":
- id - integer;
- name - character varying(255);
- birthday - date;
- coefficient - numeric;
- createdAt - timestamp with time zone;
- updatedAt - timestamp with time zone.

2) Связанная таблица "posts":
- id - integer;
- title - character varying(255);
- userId - integer (связь один-ко-многим с users.id);
- createdAt - timestamp with time zone;
- updatedAt - timestamp with time zone.

## Описание сервера (endpoints):

1) User
- GetUsers GET (/api/post) - возвращает список всех пользователей;
- GetUserByID GET (/api/post/:id) - возвращает информацию о пользователе с переданным id;
- CreateUser POST (/api/post) - создает нового пользователя, принимает в теле "name", "birthday", "coefficient";
- DeleteUserByID DELETE (/api/post/:id) - удаляет пользователя с переданным id;
- DeleteUsers DELETE (/api/post) - удаляет всех пользователей;
- UpdateUserById PUT (/api/post/:id) - обновляет пользователя с переданным id, принимает в теле "name", "birthday", "coefficient".

2) Post
- GetPosts GET (/api/post) - возвращает список всех постов;
- GetPostByID GET (/api/post/:id) - возвращает список постов для пользователя с переданным id;
- CreatePost POST (/api/post) - создает новый пост, принимает в теле "title" и "userId";
- DeletePostByID DELETE (/api/post/:id) - удаляет пост с переданным id;
- DeletePosts DELETE (/api/post) - удаляет все посты;
- UpdatePostById PUT (/api/post/:id) - обновляет пост с переданным id, принимает в теле "title" и "userId".

## Описание клиента:

- Клиентская часть выполнена на основе шаблона Argon (https://www.creative-tim.com/product/argon-dashboard-react);
- Для визуализации данных использовался фреймворк AG Grid (https://www.ag-grid.com/react-data-grid/);
- Была разработана страница "Tables" на которой представлены две таблицы "Users" и "Posts";
- Для таблицы Users была реализована частичная подгрузка данных с сервера;
- Для получения списка постов пользователя необходимо выбрать строку в таблице "Users";
- Для добавления нового поста необходимо ввести название в текстовое поле и нажать кнопку "Добавить";
- Для изменения или удаления поста необходимо выбрать строку в таблице "Posts";
- Страницы "Dashboard" и "User Profile" остались без изменений (из шаблона);
- Страницы "Dashboard" и "User Profile" остались без изменений (из шаблона).

## Контакты

Алиев Тимур Муратович

- Телефон +7 (965) 205 55 37
- Email alievtm@gmail.com
- Telegram https://t.me/Aliev_Timur_M

