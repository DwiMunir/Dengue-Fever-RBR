// Rule-Based Reasoning Expert System for Dengue Fever Diagnosis
// Updated for YES/NO answers only with new symptom codes (G01-G18)

// Symptom Code Mapping:
// G01: Demam / Demam naik turun (high_fever)
// G02: Sakit Kepala (severe_headache)
// G03: Nyeri di belakang mata (pain_behind_eyes)
// G04: Nyeri sendi dan otot (joint_pain, muscle_pain)
// G05: Ruam atau bintik-bintik merah (rash)
// G06: Mual atau muntah (nausea_vomiting)
// G07: Kelelahan atau lemas (fatigue)
// G08: Kehilangan nafsu makan (loss_appetite)
// G09: Nyeri perut yang parah (abdominal_pain)
// G10: Muntah terus-menerus (persistent_vomiting)
// G11: Perdarahan ringan (mild_bleeding, bleeding_gums)
// G12: Kulit terlihat pucat atau dingin
// G13: Sesak napas (difficulty_breathing)
// G14: Penurunan kesadaran / gelisah (restlessness)
// G15: Perdarahan pada tinja atau muntah
// G16: Pembesaran organ (hati atau limpa)
// G17: Penurunan jumlah buang air kecil
// G18: Keringat dingin berlebihan

// Response mapping for rule evaluation (2 options: Yes/No)
export const RESPONSE_VALUES = {
  'Ya': 1,     // Ya
  'Tidak': 0   // Tidak
};

// Symptom weight levels
const WEIGHT = {
  CRITICAL: 3,
  HIGH: 2,
  MEDIUM: 1,
  LOW: 0.5
};

/**
 * Rule-Based Reasoning System
 * Rules are evaluated in order of priority
 */

// Helper function to check if symptom is present (Ya response)
const isPresent = (answers, symptom) => {
  const response = answers[symptom];
  if (!response) return false;
  return response === 'Ya';
};

// Helper function to get symptom score
const getSymptomScore = (answers, symptom) => {
  const response = answers[symptom];
  if (!response) return 0;
  return RESPONSE_VALUES[response];
};

/**
 * Dengue Fever Diagnostic Rules
 */
const DENGUE_RULES = [
  // Rule 1: Severe Dengue (Critical Warning Signs)
  {
    id: 'R1',
    name: 'Severe Dengue - Hemorrhagic Complications',
    conditions: (answers) => {
      return (
        isPresent(answers, 'G01') && // Demam
        (isPresent(answers, 'G11') || isPresent(answers, 'G15')) && // Perdarahan
        (isPresent(answers, 'G09') || isPresent(answers, 'G10')) // Nyeri perut / Muntah
      );
    },
    conclusion: {
      diagnosis: 'Severe Dengue Hemorrhagic Fever',
      severity: 'critical',
      confidence: 0.95,
      recommendation: 'IMMEDIATE EMERGENCY CARE REQUIRED'
    }
  },

  // Rule 2: Severe Dengue (Shock Syndrome)
  {
    id: 'R2',
    name: 'Severe Dengue - Dengue Shock Syndrome',
    conditions: (answers) => {
      return (
        isPresent(answers, 'G01') && // Demam
        isPresent(answers, 'G13') && // Sesak napas
        (isPresent(answers, 'G09') || isPresent(answers, 'G14') || isPresent(answers, 'G12')) // Nyeri perut / Gelisah / Pucat
      );
    },
    conclusion: {
      diagnosis: 'Severe Dengue Shock Syndrome',
      severity: 'critical',
      confidence: 0.95,
      recommendation: 'IMMEDIATE EMERGENCY CARE REQUIRED'
    }
  },

  // Rule 3: Severe Dengue (Multiple Warning Signs)
  {
    id: 'R3',
    name: 'Severe Dengue - Multiple Warning Signs',
    conditions: (answers) => {
      const warningCount = [
        isPresent(answers, 'G09'), // Nyeri perut
        isPresent(answers, 'G10'), // Muntah terus-menerus
        isPresent(answers, 'G11'), // Perdarahan ringan
        isPresent(answers, 'G15'), // Perdarahan pada tinja/muntah
        isPresent(answers, 'G14'), // Gelisah
        isPresent(answers, 'G13'), // Sesak napas
        isPresent(answers, 'G12'), // Kulit pucat/dingin
        isPresent(answers, 'G16'), // Pembesaran organ
        isPresent(answers, 'G17')  // Penurunan BAK
      ].filter(Boolean).length;

      return (
        isPresent(answers, 'G01') && // Demam
        warningCount >= 3
      );
    },
    conclusion: {
      diagnosis: 'Severe Dengue with Warning Signs',
      severity: 'critical',
      confidence: 0.90,
      recommendation: 'Urgent hospitalization required'
    }
  },

  // Rule 4: Classic Dengue Fever (Strong Indicators)
  {
    id: 'R4',
    name: 'Classic Dengue Fever - Strong Pattern',
    conditions: (answers) => {
      return (
        isPresent(answers, 'G01') && // Demam
        isPresent(answers, 'G02') && // Sakit kepala
        isPresent(answers, 'G03') && // Nyeri belakang mata
        isPresent(answers, 'G04') && // Nyeri sendi dan otot
        isPresent(answers, 'G05')    // Ruam
      );
    },
    conclusion: {
      diagnosis: 'Classic Dengue Fever',
      severity: 'high',
      confidence: 0.85,
      recommendation: 'Consult healthcare provider urgently for confirmation'
    }
  },

  // Rule 5: Probable Dengue (High Fever + Key Symptoms)
  {
    id: 'R5',
    name: 'Probable Dengue Fever',
    conditions: (answers) => {
      const keySymptoms = [
        isPresent(answers, 'G02'), // Sakit kepala
        isPresent(answers, 'G03'), // Nyeri belakang mata
        isPresent(answers, 'G04'), // Nyeri sendi dan otot
        isPresent(answers, 'G05')  // Ruam
      ].filter(Boolean).length;

      return (
        isPresent(answers, 'G01') && // Demam
        keySymptoms >= 3
      );
    },
    conclusion: {
      diagnosis: 'Probable Dengue Fever',
      severity: 'high',
      confidence: 0.80,
      recommendation: 'Seek medical consultation for laboratory testing'
    }
  },

  // Rule 6: Possible Dengue (Fever + Some Symptoms)
  {
    id: 'R6',
    name: 'Possible Dengue Infection',
    conditions: (answers) => {
      const symptomCount = [
        isPresent(answers, 'G02'), // Sakit kepala
        isPresent(answers, 'G03'), // Nyeri belakang mata
        isPresent(answers, 'G04'), // Nyeri sendi dan otot
        isPresent(answers, 'G06'), // Mual/muntah
        isPresent(answers, 'G07'), // Kelelahan
        isPresent(answers, 'G05')  // Ruam
      ].filter(Boolean).length;

      return (
        isPresent(answers, 'G01') && // Demam
        symptomCount >= 2
      );
    },
    conclusion: {
      diagnosis: 'Possible Dengue Fever',
      severity: 'moderate',
      confidence: 0.65,
      recommendation: 'Medical consultation advised, monitor symptoms'
    }
  },

  // Rule 7: Dengue with Warning Signs
  {
    id: 'R7',
    name: 'Dengue with Warning Signs',
    conditions: (answers) => {
      const warningCount = [
        isPresent(answers, 'G09'), // Nyeri perut
        isPresent(answers, 'G10'), // Muntah terus-menerus
        isPresent(answers, 'G11')  // Perdarahan ringan
      ].filter(Boolean).length;

      return (
        isPresent(answers, 'G01') && // Demam
        warningCount >= 1 &&
        isPresent(answers, 'G07') // Kelelahan
      );
    },
    conclusion: {
      diagnosis: 'Dengue Fever with Warning Signs',
      severity: 'moderate',
      confidence: 0.75,
      recommendation: 'Close medical supervision required'
    }
  },

  // Rule 8: Fever Only (Low Probability)
  {
    id: 'R8',
    name: 'Febrile Illness - Low Dengue Probability',
    conditions: (answers) => {
      const symptomCount = [
        isPresent(answers, 'G02'), // Sakit kepala
        isPresent(answers, 'G03'), // Nyeri belakang mata
        isPresent(answers, 'G04')  // Nyeri sendi dan otot
      ].filter(Boolean).length;

      return (
        isPresent(answers, 'G01') && // Demam
        symptomCount <= 1
      );
    },
    conclusion: {
      diagnosis: 'Febrile Illness - Dengue Less Likely',
      severity: 'low',
      confidence: 0.40,
      recommendation: 'Monitor symptoms, consider other causes of fever'
    }
  },

  // Rule 9: No Fever (Dengue Unlikely)
  {
    id: 'R9',
    name: 'No Fever - Dengue Unlikely',
    conditions: (answers) => {
      return !isPresent(answers, 'G01'); // Tidak ada demam
    },
    conclusion: {
      diagnosis: 'Dengue Fever Unlikely',
      severity: 'minimal',
      confidence: 0.20,
      recommendation: 'Dengue unlikely without fever, consult doctor if concerns persist'
    }
  }
];

/**
 * Evaluate all rules and return the first matching rule
 * Rules are evaluated in priority order (severe to mild)
 */
export const evaluateRules = (userAnswers) => {
  // Find first matching rule
  for (const rule of DENGUE_RULES) {
    if (rule.conditions(userAnswers)) {
      return {
        ruleId: rule.id,
        ruleName: rule.name,
        diagnosis: rule.conclusion.diagnosis,
        severity: rule.conclusion.severity,
        confidence: rule.conclusion.confidence,
        recommendation: rule.conclusion.recommendation,
        matchedRule: true
      };
    }
  }

  // Default fallback if no rules match
  return {
    ruleId: 'R_DEFAULT',
    ruleName: 'Insufficient Data',
    diagnosis: 'Unable to Determine',
    severity: 'none',
    confidence: 0.10,
    recommendation: 'Insufficient information for diagnosis. Please complete all questions.',
    matchedRule: false
  };
};

/**
 * Calculate symptom score for analysis
 */
export const calculateSymptomScore = (userAnswers) => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  // Symptom weights using new codes (G01-G18)
  const symptomWeights = {
    'G01': WEIGHT.CRITICAL,  // Demam
    'G02': WEIGHT.HIGH,      // Sakit kepala
    'G03': WEIGHT.HIGH,      // Nyeri belakang mata
    'G04': WEIGHT.HIGH,      // Nyeri sendi dan otot
    'G05': WEIGHT.MEDIUM,    // Ruam
    'G06': WEIGHT.MEDIUM,    // Mual/muntah
    'G07': WEIGHT.MEDIUM,    // Kelelahan
    'G08': WEIGHT.LOW,       // Kehilangan nafsu makan
    'G09': WEIGHT.HIGH,      // Nyeri perut parah
    'G10': WEIGHT.HIGH,      // Muntah terus-menerus
    'G11': WEIGHT.CRITICAL,  // Perdarahan ringan
    'G12': WEIGHT.HIGH,      // Kulit pucat/dingin
    'G13': WEIGHT.CRITICAL,  // Sesak napas
    'G14': WEIGHT.HIGH,      // Penurunan kesadaran/gelisah
    'G15': WEIGHT.CRITICAL,  // Perdarahan tinja/muntah
    'G16': WEIGHT.HIGH,      // Pembesaran organ
    'G17': WEIGHT.HIGH,      // Penurunan BAK
    'G18': WEIGHT.MEDIUM     // Keringat dingin
  };

  Object.entries(symptomWeights).forEach(([symptom, weight]) => {
    const score = getSymptomScore(userAnswers, symptom);
    totalScore += score * weight;
    maxPossibleScore += 1 * weight; // Max score is 1 (Ya)
  });

  // Normalize to 0-1 scale
  return maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
};

/**
 * Get detailed rule explanation
 */
export const getRuleExplanation = (ruleId) => {
  const rule = DENGUE_RULES.find(r => r.id === ruleId);
  if (!rule) return 'No rule explanation available';
  
  return `Rule ${ruleId}: ${rule.name}`;
};

/**
 * Get severity color and badge for UI
 */
export const getSeverityInfo = (severity) => {
  const severityMap = {
    'critical': {
      color: 'destructive',
      level: 'Very High',
      badge: 'Critical'
    },
    'high': {
      color: 'warning',
      level: 'High',
      badge: 'High Risk'
    },
    'moderate': {
      color: 'warning',
      level: 'Moderate',
      badge: 'Moderate'
    },
    'low': {
      color: 'accent',
      level: 'Low',
      badge: 'Low Risk'
    },
    'minimal': {
      color: 'primary',
      level: 'Very Low',
      badge: 'Minimal'
    },
    'none': {
      color: 'success',
      level: 'Negative',
      badge: 'Not Indicated'
    }
  };

  return severityMap[severity] || severityMap['none'];
};

/**
 * Convert confidence to percentage for display
 */
export const confidenceToPercentage = (confidence) => {
  return Math.round(confidence * 100);
};
