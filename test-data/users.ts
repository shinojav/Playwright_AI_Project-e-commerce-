export interface UserCredentials {
  username: string;
  password?: string;
  description: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ProductInfo {
  name: string;
  price: string;
}

export const VALID_USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard active user'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'Problem user'
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'Performance glitch user'
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'Visual regression user'
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'Error user'
  }
} as const;

export const LOCKED_USER: UserCredentials = {
  username: 'locked_out_user',
  password: 'secret_sauce',
  description: 'Locked out user account'
};

export const INVALID_USERS: UserCredentials[] = [
  {
    username: 'standard_user',
    password: 'wrong_password',
    description: 'Valid username with invalid password'
  },
  {
    username: 'non_existent_user',
    password: 'secret_sauce',
    description: 'Non-existent username with valid password'
  }
];

export const VALIDATION_USERS: { username: string; password?: string; expectedError: string; description: string }[] = [
  {
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
    description: 'Empty username and password'
  },
  {
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
    description: 'Empty password'
  },
  {
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
    description: 'Empty username'
  }
];

export const ERROR_MESSAGES = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
  postalCodeRequired: 'Error: Postal Code is required'
} as const;

export const CUSTOMER_DATA: CustomerInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
};

export const PRODUCTS: Record<string, ProductInfo> = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99'
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99'
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99'
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99'
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    price: '$7.99'
  },
  redTShirt: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99'
  }
} as const;
