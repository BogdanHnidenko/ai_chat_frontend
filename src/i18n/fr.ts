export default {
  welcome: {
    settings: 'Paramètres',
    language: 'Langue',
    subtitle: 'Votre assistant IA intelligent',
    start: 'Commencer',
    demo: 'Essayer la démo',
  },

  register: {
    title: 'Créer un compte',
    name: 'Nom',
    namePlaceholder: 'Comment vous appelez-vous ?',
    email: 'E-mail',
    emailPlaceholder: 'vous@exemple.fr',
    password: 'Mot de passe',
    passwordPlaceholder: 'Au moins 3 caractères',
    submit: 'Démarrer',
    errorName: 'Veuillez entrer votre nom',
    errorPassword: 'Mot de passe trop court',
    switchToLogin: 'Déjà un compte ? Se connecter',
    switchToRegister: 'Pas de compte ? S\'inscrire',
    loginTitle: 'Connexion',
    loginSubmit: 'Se connecter',
    errorInvalidCredentials: 'E-mail ou mot de passe invalide',
  },

  sidebar: {
    close: 'Fermer la barre latérale',
    search: 'Rechercher un chat',
    newChat: 'Créer un nouveau chat',
  },

  topbar: {
    openSidebar: 'Ouvrir la barre latérale',
    chatActions: 'Actions du chat',
  },

  newChat: 'Nouveau chat',

  chatList: {
    empty: 'Aucun chat pour le moment',
    today: "Aujourd'hui",
    yesterday: 'Hier',
    daysAgo: (n: number) => `Il y a ${n} jours`,
    lastWeek: 'La semaine dernière',
    newChatTitle: 'Nouveau chat',
  },

  search: {
    placeholder: 'Rechercher des chats...',
    close: 'Fermer',
    noResults: 'Aucun résultat',
    hint: 'Tapez pour rechercher dans vos chats',
  },

  profile: {
    theme: 'Thème',
    themeDark: 'Sombre',
    themeLight: 'Clair',
    language: 'Langue',
    presets: 'Préréglages',
    logout: 'Se déconnecter',
    login: 'Se connecter',
    guestName: 'Invité',
    guestSub: 'Mode démo',
  },

  loginModal: {
    title: 'Connexion au compte',
    name: 'Nom',
    namePlaceholder: 'Comment vous appelez-vous ?',
    email: 'E-mail',
    emailPlaceholder: 'vous@exemple.fr',
    password: 'Mot de passe',
    passwordPlaceholder: 'Au moins 3 caractères',
    submit: 'Se connecter',
    noAccount: 'Pas de compte ?',
    register: "S'inscrire",
    errorName: 'Veuillez entrer votre nom',
    errorPassword: 'Mot de passe trop court',
  },

  input: {
    placeholder: 'Écrire un message...',
    attachFile: 'Joindre un fichier',
    disclaimer: "L'IA peut faire des erreurs. Vérifiez les informations importantes.",
    demoReply: "Ceci est une réponse de démonstration. Connectez une vraie API pour un fonctionnement complet.",
    send: 'Envoyer',
    stop: 'Arrêter la génération',
  },

  messages: {
    emptyTitle: 'Comment puis-je vous aider ?',
    emptySub: 'Écrivez un message pour commencer',
  },

  reactions: {
    like: "J'aime",
    dislike: "Je n'aime pas",
    copy: 'Copier',
  },

  code: {
    copy: 'Copier',
    copied: 'Copié',
  },

  chatMenu: {
    unpin: 'Désépingler',
    pin: 'Épingler',
    rename: 'Renommer',
    delete: 'Supprimer',
  },

  renameModal: {
    title: 'Renommer le chat',
    label: 'Nouveau nom',
    placeholder: 'Entrez le nom du chat...',
    cancel: 'Annuler',
    save: 'Enregistrer',
  },

  demoLimit: {
    newChatTitle: 'Compte requis',
    newChatMessage: 'Vous devez vous connecter pour créer un nouveau chat.',
    cancel: 'Annuler',
    login: 'Se connecter',
    messageLimitTitle: 'Limite de messages atteinte',
    messageLimitMessage: 'En mode démo, vous pouvez envoyer seulement 3 messages par chat. Connectez-vous pour continuer.',
    noChatMessage: 'Limite démo atteinte. Connectez-vous pour continuer à discuter.',
  },

  chatDeleted: {
    title: 'Chat supprimé',
    message: 'Ce chat a été supprimé par un autre utilisateur ou depuis un autre appareil.',
    ok: 'Compris',
  },

  confirmDelete: {
    chatTitle: 'Supprimer le chat ?',
    chatMessage: 'Cette action est irréversible. Le chat et tous les messages seront supprimés.',
    chatGuestMessage: 'Le chat sera supprimé. Pour créer un nouveau chat, vous devrez vous connecter.',
    presetTitle: 'Supprimer le préréglage ?',
    presetMessage: 'Cette action est irréversible.',
    cancel: 'Annuler',
    confirm: 'Supprimer',
  },

  modal: {
    close: 'Fermer',
  },

  presetsGuest: {
    message: 'Les préréglages sont disponibles uniquement pour les utilisateurs enregistrés.',
    login: 'Se connecter',
  },

  presets: {
    title: 'Préréglages',
    hint: 'Les préréglages donnent au chat du contexte sur vous — ex. votre rôle, style de réponse, langue.',
    empty: 'Aucun préréglage pour le moment',
    add: 'Ajouter un préréglage',
    namePlaceholder: '"Développeur"',
    descPlaceholder: "Description — ce que l'IA doit savoir sur vous...",
    addBtn: 'Ajouter',
    cancel: 'Annuler',
    editTitle: 'Modifier',
    deleteTitle: 'Supprimer',
    nameEditPlaceholder: 'Nom',
    descEditPlaceholder: 'Description du contexte...',
    save: 'Enregistrer',
  },
}
