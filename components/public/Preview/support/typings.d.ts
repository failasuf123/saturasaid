
export interface FormPreview {
    id: string;
    nicknameMale: string;
    nicknameFemale: string;
    fullnameMale: string;
    fullnameFemale: string;
    dadMale: string;
    momMale: string;
    dadFemale: string;
    momFemale: string;
    
    accountName1: string;
    accountBank1: string;
    accountNumber1: string;
    accountName2: string;
    accountBank2: string;
    accountNumber2: string;
  
    event: string;
    address: string;
    gmap: string;
    time: Date;
  
    event2: string;
    address2: string;
    gmap2: string;
    time2: Date;
    isEvent2: boolean,
  
    introductionType: number | null;
    greetingType: number | null;
    hookMiddleType: number;
    storyType: number;
    closingType: number;
    songType: number;
    theme: string;
    userId: string;
  }
