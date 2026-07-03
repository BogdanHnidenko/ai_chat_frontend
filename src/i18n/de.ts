export default {
  welcome: {
    settings: 'Einstellungen',
    language: 'Sprache',
    subtitle: 'Dein smarter KI-Assistent',
    start: 'Loslegen',
    demo: 'Demo ausprobieren',
  },

  register: {
    title: 'Konto erstellen',
    name: 'Name',
    namePlaceholder: 'Wie heißt du?',
    email: 'E-Mail',
    emailPlaceholder: 'du@beispiel.de',
    password: 'Passwort',
    passwordPlaceholder: 'Mindestens 3 Zeichen',
    submit: 'Starten',
    errorName: 'Bitte gib deinen Namen ein',
    errorPassword: 'Passwort ist zu kurz',
    switchToLogin: 'Bereits ein Konto? Anmelden',
    switchToRegister: 'Kein Konto? Registrieren',
    loginTitle: 'Anmelden',
    loginSubmit: 'Anmelden',
    errorInvalidCredentials: 'Ungültige E-Mail oder Passwort',
    errorUserNotFound: 'Benutzer nicht gefunden. Bitte zuerst registrieren.',
  },

  sidebar: {
    close: 'Seitenleiste schließen',
    search: 'Chat suchen',
    newChat: 'Neuen Chat erstellen',
  },

  topbar: {
    openSidebar: 'Seitenleiste öffnen',
    chatActions: 'Chat-Aktionen',
  },

  newChat: 'Neuer Chat',

  chatList: {
    empty: 'Keine Chats vorhanden',
    today: 'Heute',
    yesterday: 'Gestern',
    daysAgo: (n: number) => `Vor ${n} Tagen`,
    lastWeek: 'Letzte Woche',
    newChatTitle: 'Neuer Chat',
  },

  search: {
    placeholder: 'Chats durchsuchen...',
    close: 'Schließen',
    noResults: 'Nichts gefunden',
    hint: 'Tippe, um deine Chats zu durchsuchen',
  },

  profile: {
    theme: 'Design',
    themeDark: 'Dunkel',
    themeLight: 'Hell',
    language: 'Sprache',
    presets: 'Vorlagen',
    logout: 'Abmelden',
    login: 'Anmelden',
    guestName: 'Gast',
    guestSub: 'Demo-Modus',
  },

  loginModal: {
    title: 'Bei Konto anmelden',
    name: 'Name',
    namePlaceholder: 'Wie heißt du?',
    email: 'E-Mail',
    emailPlaceholder: 'du@beispiel.de',
    password: 'Passwort',
    passwordPlaceholder: 'Mindestens 3 Zeichen',
    submit: 'Anmelden',
    noAccount: 'Kein Konto?',
    register: 'Registrieren',
    errorName: 'Bitte gib deinen Namen ein',
    errorPassword: 'Passwort ist zu kurz',
    errorUserNotFound: 'Benutzer nicht gefunden. Bitte zuerst registrieren.',
  },

  input: {
    placeholder: 'Nachricht schreiben...',
    attachFile: 'Datei anhängen',
    disclaimer: 'KI kann Fehler machen. Wichtige Informationen prüfen.',
    demoReply: 'Dies ist eine Demo-Antwort. Verbinde eine echte API für den vollen Funktionsumfang.',
    send: 'Senden',
    stop: 'Generierung stoppen',
  },

  messages: {
    emptyTitle: 'Wie kann ich helfen?',
    emptySub: 'Schreibe eine Nachricht, um loszulegen',
  },

  reactions: {
    like: 'Gefällt mir',
    dislike: 'Gefällt mir nicht',
    copy: 'Kopieren',
  },

  code: {
    copy: 'Kopieren',
    copied: 'Kopiert',
  },

  chatMenu: {
    unpin: 'Loslösen',
    pin: 'Anheften',
    rename: 'Umbenennen',
    delete: 'Löschen',
  },

  renameModal: {
    title: 'Chat umbenennen',
    label: 'Neuer Name',
    placeholder: 'Chat-Namen eingeben...',
    cancel: 'Abbrechen',
    save: 'Speichern',
  },

  demoLimit: {
    newChatTitle: 'Konto erforderlich',
    newChatMessage: 'Du musst dich anmelden, um einen neuen Chat zu erstellen.',
    cancel: 'Abbrechen',
    login: 'Anmelden',
    messageLimitTitle: 'Nachrichtenlimit erreicht',
    messageLimitMessage: 'Im Demo-Modus kannst du nur 3 Nachrichten pro Chat senden. Melde dich an, um fortzufahren.',
    noChatMessage: 'Demo-Limit erreicht. Melde dich an, um weiter zu chatten.',
  },

  chatDeleted: {
    title: 'Chat gelöscht',
    message: 'Dieser Chat wurde von einem anderen Nutzer oder Gerät gelöscht.',
    ok: 'Verstanden',
  },

  confirmDelete: {
    chatTitle: 'Chat löschen?',
    chatMessage: 'Diese Aktion kann nicht rückgängig gemacht werden. Der Chat und alle Nachrichten werden gelöscht.',
    chatGuestMessage: 'Der Chat wird gelöscht. Um einen neuen Chat zu erstellen, musst du dich anmelden.',
    presetTitle: 'Vorlage löschen?',
    presetMessage: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    cancel: 'Abbrechen',
    confirm: 'Löschen',
  },

  modal: {
    close: 'Schließen',
  },

  presetsGuest: {
    message: 'Vorlagen sind nur für registrierte Nutzer verfügbar.',
    login: 'Anmelden',
  },

  presets: {
    title: 'Vorlagen',
    hint: 'Vorlagen geben dem Chat Kontext über dich — z. B. deine Rolle, Antwortstil, Sprache.',
    empty: 'Noch keine Vorlagen',
    add: 'Vorlage hinzufügen',
    namePlaceholder: '"Entwickler"',
    descPlaceholder: 'Beschreibung — was die KI über dich wissen soll...',
    addBtn: 'Hinzufügen',
    cancel: 'Abbrechen',
    editTitle: 'Bearbeiten',
    deleteTitle: 'Löschen',
    nameEditPlaceholder: 'Name',
    descEditPlaceholder: 'Kontextbeschreibung...',
    save: 'Speichern',
  },
}
