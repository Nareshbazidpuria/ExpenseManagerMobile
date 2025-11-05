export const primary = '#00807b',
  secondary = '#50E3C2',
  active = '#c4f5f3',
  inactive = '#F8F8F8',
  background = '#ffffff',
  backgroundLight = '#F7F7F7',
  backgroundSecondary = '#FDFBEE',
  text = '#333333',
  border = '#E0E0E0',
  error = '#FF3D00',
  warning = '#FF9800',
  success = '#4CAF50',
  info = '#2196F3',
  lightGray = '#BDBDBD',
  darkGray = '#757575',
  Home = 'Home',
  Insights = 'Insights',
  Reports = 'Reports',
  Profile = 'Profile',
  QR = 'QR',
  Expenses = 'Expenses',
  AddExpense = 'AddExpense',
  CreateGroup = 'CreateGroup',
  Notifications = 'Notifications',
  Login = 'Login',
  ForgotPwd = 'ForgotPwd',
  Splash = 'Splash',
  screens = {
    Tabs: 'Tabs',
    Home,
    Insights,
    Reports,
    Profile,
    QR,
    CreateGroup,
    Notifications,
    Expenses,
    Login,
    ForgotPwd,
    AddExpense,
    Splash,
  };

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const expenseTypes = {
  own: 'own',
  team: 'team',
  friend: 'friend',
  group: 'group',
};

export const pushTypes = {
  expenseDetails: 'expenseDetails',
};
