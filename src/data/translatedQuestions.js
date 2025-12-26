import i18n from '../i18n/config';

// Get translated questions based on current language
// Updated for YES/NO answers only
export const getTranslatedQuestions = () => {
  const t = i18n.t.bind(i18n);
  
  const questions = [];
  for (let i = 1; i <= 15; i++) {
    questions.push({
      id: i,
      category: getCategoryForQuestion(i, t),
      symptomKey: getSymptomKey(i),
      question: t(`questions.q${i}.question`),
      description: t(`questions.q${i}.description`),
      options: [
        { value: 'YES', label: t('questions.optYes') },
        { value: 'NO', label: t('questions.optNo') }
      ]
    });
  }
  
  return questions;
};

// Helper function to get category based on question number
const getCategoryForQuestion = (qNum, t) => {
  if (qNum >= 1 && qNum <= 5) return t('test.categories.primarySymptoms');
  if (qNum >= 6 && qNum <= 9) return t('test.categories.secondarySymptoms');
  if (qNum >= 10 && qNum <= 12) return t('test.categories.warningSigns');
  return t('test.categories.severeWarningSigns');
};

// Helper function to get symptom key based on question number
const getSymptomKey = (qNum) => {
  const keyMap = {
    1: 'high_fever',
    2: 'severe_headache',
    3: 'pain_behind_eyes',
    4: 'joint_pain',
    5: 'muscle_pain',
    6: 'rash',
    7: 'nausea_vomiting',
    8: 'fatigue',
    9: 'loss_appetite',
    10: 'abdominal_pain',
    11: 'persistent_vomiting',
    12: 'mild_bleeding',
    13: 'difficulty_breathing',
    14: 'bleeding_gums',
    15: 'restlessness'
  };
  return keyMap[qNum];
};

export const getQuestionCount = () => 15;
