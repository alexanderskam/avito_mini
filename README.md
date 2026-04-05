<h1>Веб-приложение — личный кабинет продавца с AI-ассистентом для улучшения объявлений.</h1>

<h2>Приложение позволяет:</h2>

<p>-управлять списком объявлений</p>
<p>-просматривать и редактировать карточки товаров</p>
<p>-получать рекомендации от AI для улучшения описания и цены</p>
<h2>🚀 Стек технологий</h2>
<h3>Frontend</h3>
<p>-React 18 + TypeScript</p>
<p>-react-router-dom</p>
<p>-Redux Toolkit, RTK Query </p>
<p>-Axios</p>
<p>-TailwindCSS</p>
<p>-Vite</p>
<h3>Backend</h3>
<p>-Node.js v20+</p>
<p>-Предоставленный API (порт 8080)</p>
<h3>AI</h3>
<p>-Ollama (локально, модель llama3)</p>
<h2>📦 Функциональность</h2>
<h3>📄 1. Список объявлений (/ads)</h3>
<p>Отображение всех объявлений</p>
<p>Поиск по названию</p>
<p>Сортировка (по дате, названию)</p>
<strong>Фильтрация:</strong>
<p>-по категории</p>
<p>-только требующие доработки</p>
<p><strong>Пагинация</strong> (10 объявлений на страницу в режиме сетки и 4 на страницу в режиме колонки)</p>
<img width="1910" height="935" alt="ads" src="https://github.com/user-attachments/assets/89b28692-92d9-4542-abc1-15d45992e03d" />
<h3>🔍 2. Просмотр объявления (/ads/:id)</h3>
<p>Полная информация о товаре</p>
<p>Характеристики в зависимости от категории</p>
<p>Блок "Требуются доработки"</p>
<p>Отображение незаполненных полей</p>
<p>Дата публикации</p>
<strong>Навигация:</strong>
<p>- переход к редактированию</p>
<p>- возврат к списку объявлений</p>
<img width="1918" height="927" alt="Item" src="https://github.com/user-attachments/assets/8b987d08-44dc-4cbc-a0fb-74af6953fa36" />

<h3>✏️ 3. Редактирование объявления (/ads/:id/edit)</h3>
<p><strong>Форма редактирования:</strong></p>
<p>- категория (обязательное поле)</p>
<p>- название (обязательное поле)</p>
<p>- цена (обязательное поле)</p>
<p>- характеристики (зависят от категории)</p>
<p>- описание (со счётчиком символов)</p>
<img width="1904" height="1041" alt="edit" src="https://github.com/user-attachments/assets/3df19058-1773-49be-b196-4c1671df74de" />

<strong>AI-функции:</strong>
<p>- ✨ улучшение описания</p>
<p>- 💰 определение рыночной цены</p>

<strong>Сохранение:</strong>
<p>- отправка PUT-запроса и инвалидация тэгов</p>

<strong>Действия:</strong>
<p>- сохранить изменения</p>
<p>- отменить изменения</p>

<h2>Инструкция по запуску</h2>

<h3>1. Клонирование репозитория</h3>
<p>git clone https://github.com/alexanderskam/avito-mini.git</p>

<h3>2. Запуск backend</h3>
<p>cd backend</p>
<p>npm install</p>
<p>npm start</p>

<p><strong>По умолчанию сервер работает на:</strong></p>
<p>http://localhost:8080</p>

<h3>3. Установка и запуск Ollama</h3>

<strong>-3.1. Установка Ollama</strong>
<p>Скачайте и установите Ollama с официального сайта:</p>
<p>https://ollama.com</p>

<strong>-3.2. Загрузка модели</strong>
<p>ollama pull llama3</p>

<strong>-3.3. Запуск сервиса</strong>
<p>ollama serve</p>

<h3>4. Запуск frontend</h3>
<p>cd frontend</p>
<p>npm install</p>
<p>npm run dev</p>

<p><strong>Приложение будет доступно по адресу:</strong></p>
<p>http://localhost:5173</p>
