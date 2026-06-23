export default {
  welcome: {
    settings: 'Settings',
    language: 'Language',
    subtitle: 'Your smart AI assistant',
    start: 'Get started',
    demo: 'Try demo',
  },

  register: {
    title: 'Create account',
    name: 'Name',
    namePlaceholder: "What's your name?",
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'At least 3 characters',
    submit: 'Start',
    errorName: 'Please enter your name',
    errorPassword: 'Password is too short',
    switchToLogin: 'Already have an account? Sign in',
    switchToRegister: "Don't have an account? Register",
    loginTitle: 'Sign in',
    loginSubmit: 'Sign in',
    errorInvalidCredentials: 'Invalid email or password',
  },

  sidebar: {
    close: 'Close sidebar',
    search: 'Find chat',
    newChat: 'Create new chat',
  },

  topbar: {
    openSidebar: 'Open sidebar',
    chatActions: 'Chat actions',
  },

  newChat: 'New chat',

  chatList: {
    empty: 'No chats yet',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: (n: number) => `${n} days ago`,
    lastWeek: 'Last week',
    newChatTitle: 'New chat',
  },

  search: {
    placeholder: 'Search chats...',
    close: 'Close',
    noResults: 'Nothing found',
    hint: 'Type to search through your chats',
  },

  profile: {
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    language: 'Language',
    presets: 'Presets',
    logout: 'Log out',
    login: 'Log in',
    guestName: 'Guest',
    guestSub: 'Demo mode',
  },

  loginModal: {
    title: 'Sign in to your account',
    name: 'Name',
    namePlaceholder: "What's your name?",
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'At least 3 characters',
    submit: 'Sign in',
    noAccount: "Don't have an account?",
    register: 'Register',
    errorName: 'Please enter your name',
    errorPassword: 'Password is too short',
  },

  input: {
    placeholder: 'Write a message...',
    attachFile: 'Attach file',
    disclaimer: 'AI can make mistakes. Verify important information.',
    demoReply: 'This is a demo response. Connect a real API for full functionality.',
    send: 'Send',
    stop: 'Stop generating',
  },

  messages: {
    emptyTitle: 'How can I help?',
    emptySub: 'Write a message to get started',
  },

  reactions: {
    like: 'Like',
    dislike: 'Dislike',
    copy: 'Copy',
  },

  code: {
    copy: 'Copy',
    copied: 'Copied',
  },

  chatMenu: {
    unpin: 'Unpin',
    pin: 'Pin',
    rename: 'Rename',
    delete: 'Delete',
  },

  renameModal: {
    title: 'Rename chat',
    label: 'New name',
    placeholder: 'Enter chat name...',
    cancel: 'Cancel',
    save: 'Save',
  },

  demoLimit: {
    newChatTitle: 'Account required',
    newChatMessage: 'You need to log in to create a new chat.',
    cancel: 'Cancel',
    login: 'Log in',
    messageLimitTitle: 'Message limit reached',
    messageLimitMessage: 'In demo mode you can send only 3 messages per chat. Log in to continue.',
    noChatMessage: 'Demo limit reached. Log in to continue chatting.',
  },

  chatDeleted: {
    title: 'Chat deleted',
    message: 'This chat has been deleted by another user or from another device.',
    ok: 'Got it',
  },

  confirmDelete: {
    chatTitle: 'Delete chat?',
    chatMessage: 'This action cannot be undone. The chat and all messages will be deleted.',
    chatGuestMessage: 'The chat will be deleted. To create a new chat, you will need to log in.',
    presetTitle: 'Delete preset?',
    presetMessage: 'This action cannot be undone.',
    cancel: 'Cancel',
    confirm: 'Delete',
  },

  modal: {
    close: 'Close',
  },

  presetsGuest: {
    message: 'Presets are available for registered users only.',
    login: 'Log in',
  },

  presets: {
    title: 'Presets',
    hint: 'Presets give the chat context about you — e.g. your role, response style, language.',
    empty: 'No presets yet',
    add: 'Add preset',
    namePlaceholder: '"Developer"',
    descPlaceholder: 'Description — what the AI should know about you...',
    addBtn: 'Add',
    cancel: 'Cancel',
    editTitle: 'Edit',
    deleteTitle: 'Delete',
    nameEditPlaceholder: 'Name',
    descEditPlaceholder: 'Context description...',
    save: 'Save',
  },
}
