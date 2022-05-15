export interface Item {
  name: string;
  price: number;
  url: string;
  description: string;
  // calories: number;
  // protein: number;
  // carbs: number;
  // fat: number;
  // customize: optionSection[];
}

interface optionSection {
  title: string;
  options: option[];
}

interface radioOptionSection extends optionSection {
  type: OptionSectionType.RADIO;
}

interface checkboxOptionSection extends optionSection {
  type: OptionSectionType.CHECKBOX;
}

interface option {
  text: string;
}

interface requiredOption extends option {
  type: OptionType.REQUIRED;
}

interface optionalOption extends option {
  type: OptionType.OPTIONAL;
}
