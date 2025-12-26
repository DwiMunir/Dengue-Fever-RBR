// LocalStorage utility for managing user data and test history

export const STORAGE_KEYS = {
  USER: 'dengue_expert_user',
  TESTS: 'dengue_expert_tests',
  AUTH_TOKEN: 'dengue_expert_token'
};

// User Authentication
export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const isAuthenticated = () => {
  return !!getUser();
};

// Test History Management
export const saveTest = (test) => {
  const tests = getTests();
  const newTest = {
    ...test,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    method: 'rule-based' // Mark as rule-based reasoning
  };
  tests.unshift(newTest); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(tests));
  return newTest;
};

export const getTests = () => {
  const tests = localStorage.getItem(STORAGE_KEYS.TESTS);
  return tests ? JSON.parse(tests) : [];
};

export const getTestById = (id) => {
  const tests = getTests();
  return tests.find(test => test.id === id);
};

export const deleteTest = (id) => {
  const tests = getTests();
  const filtered = tests.filter(test => test.id !== id);
  localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(filtered));
};

export const clearAllTests = () => {
  localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify([]));
};