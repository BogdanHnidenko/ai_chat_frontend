export default {
  // WelcomeView
  welcome: {
    settings: 'Налаштування',
    language: 'Мова',
    subtitle: 'Ваш розумний AI-асистент',
    start: 'Розпочнемо',
    demo: 'Спробувати демо',
  },

  // RegisterView / LoginView
  register: {
    title: 'Створити акаунт',
    name: "Ім'я",
    namePlaceholder: 'Як вас звати?',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Мінімум 3 символів',
    submit: 'Почати',
    errorName: "Введіть ім'я",
    errorPassword: 'Пароль занадто короткий',
    switchToLogin: 'Вже є акаунт? Увійти',
    switchToRegister: 'Немає акаунту? Зареєструватися',
    loginTitle: 'Вхід',
    loginSubmit: 'Увійти',
    errorInvalidCredentials: 'Невірний email або пароль',
  },

  // Sidebar
  sidebar: {
    close: 'Закрити сайдбар',
    search: 'Знайти чат',
    newChat: 'Створити новий чат',
  },

  // TopBar
  topbar: {
    openSidebar: 'Відкрити сайдбар',
    chatActions: 'Дії з чатом',
  },

  // NewChatButton
  newChat: 'Новий чат',

  // ChatList
  chatList: {
    empty: 'Список чатів пустий',
    today: 'Сьогодні',
    yesterday: 'Вчора',
    daysAgo: (n: number) => `${n} дні тому`,
    lastWeek: 'Минулий тиждень',
    newChatTitle: 'Новий чат',
  },

  // SearchModal
  search: {
    placeholder: 'Пошук чатів...',
    close: 'Закрити',
    noResults: 'Нічого не знайдено',
    hint: 'Введіть запит для пошуку по чатах',
  },

  // UserProfile
  profile: {
    theme: 'Тема',
    themeDark: 'Темна',
    themeLight: 'Світла',
    language: 'Мова',
    presets: 'Пресети',
    logout: 'Вийти',
    login: 'Увійти',
    guestName: 'Гість',
    guestSub: 'Демо-режим',
  },

  // LoginModal
  loginModal: {
    title: 'Увійти до акаунту',
    name: "Ім'я",
    namePlaceholder: 'Як вас звати?',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Мінімум 3 символів',
    submit: 'Увійти',
    noAccount: 'Немає акаунту?',
    register: 'Зареєструватися',
    errorName: "Введіть ім'я",
    errorPassword: 'Пароль занадто короткий',
  },

  // ChatInput
  input: {
    placeholder: 'Напиши повідомлення...',
    attachFile: 'Прикріпити файл',
    disclaimer: 'AI може допускати помилки. Перевіряйте важливу інформацію.',
    demoReply: 'Це демо-відповідь. Підключи реальний API для повноцінної роботи.',
    send: 'Надіслати',
    stop: 'Зупинити генерацію',
  },

  // MessageList
  messages: {
    emptyTitle: 'Як я можу допомогти?',
    emptySub: 'Напишіть повідомлення, щоб розпочати',
  },

  // MessageReactions
  reactions: {
    like: 'Подобається',
    dislike: 'Не подобається',
    copy: 'Копіювати',
  },

  // CodeBlock
  code: {
    copy: 'Копіювати',
    copied: 'Скопійовано',
  },

  // ChatMenu
  chatMenu: {
    unpin: 'Відпінити',
    pin: 'Запінити',
    rename: 'Перейменувати',
    delete: 'Видалити',
  },

  // RenameModal
  renameModal: {
    title: 'Перейменувати чат',
    label: 'Нова назва',
    placeholder: 'Введіть назву чату...',
    cancel: 'Скасувати',
    save: 'Зберегти',
  },

  // DemoLimitModal
  demoLimit: {
    newChatTitle: 'Потрібен акаунт',
    newChatMessage: 'Для створення нового чату необхідно залогінитись.',
    cancel: 'Скасувати',
    login: 'Залогінитись',
    messageLimitTitle: 'Ліміт повідомлень',
    messageLimitMessage: 'У демо-режимі можна надіслати лише 3 повідомлення в одному чаті. Залогінитесь, щоб продовжити.',
    noChatMessage: 'Ліміт демо-режиму вичерпано. Залогінитесь, щоб продовжити спілкування.',
  },

  // ChatDeletedModal
  chatDeleted: {
    title: 'Чат видалено',
    message: 'Цей чат було видалено іншим користувачем або з іншого пристрою.',
    ok: 'Зрозуміло',
  },

  // ConfirmModal
  confirmDelete: {
    chatTitle: 'Видалити чат?',
    chatMessage: 'Цю дію неможливо скасувати. Чат і всі повідомлення буде видалено.',
    chatGuestMessage: 'Чат буде видалено. Щоб створити новий чат, потрібно увійти в акаунт.',
    presetTitle: 'Видалити пресет?',
    presetMessage: 'Цю дію неможливо скасувати.',
    cancel: 'Скасувати',
    confirm: 'Видалити',
  },

  // BaseModal
  modal: {
    close: 'Закрити',
  },

  // PresetsModal (guest banner)
  presetsGuest: {
    message: 'Пресети доступні лише для зареєстрованих користувачів.',
    login: 'Залогінитись',
  },

  // PresetsModal
  presets: {
    title: 'Пресети',
    hint: 'Пресети дають чату контекст про вас — наприклад, ваша роль, стиль відповідей, мова спілкування.',
    empty: 'Пресетів ще немає',
    add: 'Додати пресет',
    namePlaceholder: '«Розробник»',
    descPlaceholder: 'Опис — що AI має знати про вас...',
    addBtn: 'Додати',
    cancel: 'Скасувати',
    editTitle: 'Редагувати',
    deleteTitle: 'Видалити',
    nameEditPlaceholder: 'Назва',
    descEditPlaceholder: 'Опис контексту...',
    save: 'Зберегти',
  },
}
