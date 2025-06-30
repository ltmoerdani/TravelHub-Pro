export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number validation
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

export function validatePassport(passportNumber: string): boolean {
  // Basic passport validation (alphanumeric, 6-9 characters)
  const passportRegex = /^[A-Z0-9]{6,9}$/;
  return passportRegex.test(passportNumber.toUpperCase());
}

export function validateIDNumber(idNumber: string): boolean {
  // Indonesian ID number (KTP) validation - 16 digits
  const idRegex = /^[0-9]{16}$/;
  return idRegex.test(idNumber);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateAge(birthDate: Date, minAge: number = 0): boolean {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return (age - 1) >= minAge;
  }
  
  return age >= minAge;
}

export function validateUmrohRequirements(customerData: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check passport validity (must be valid for at least 6 months)
  if (customerData.passportExpiry) {
    const expiryDate = new Date(customerData.passportExpiry);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    if (expiryDate < sixMonthsFromNow) {
      errors.push('Passport must be valid for at least 6 months');
    }
  } else {
    errors.push('Passport expiry date is required');
  }
  
  // Check age requirements
  if (customerData.dateOfBirth) {
    const birthDate = new Date(customerData.dateOfBirth);
    if (!validateAge(birthDate, 12)) {
      errors.push('Minimum age for Umroh is 12 years');
    }
  }
  
  // Check mahram requirements for women
  if (customerData.gender === 'female' && customerData.islamicProfile) {
    const age = new Date().getFullYear() - new Date(customerData.dateOfBirth).getFullYear();
    if (age < 45 && !customerData.islamicProfile.mahramInfo) {
      errors.push('Women under 45 must travel with mahram');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}