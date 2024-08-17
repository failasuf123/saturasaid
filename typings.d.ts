    interface User {
    id: number;
    clerkid?: string | null;
    createdAt: Date;
    updatedAt: Date;
    weddings: BridalCouple[];
  }
  
  interface BridalCouple {
    id: string;
    createdAt: Date;
    watermark: boolean;
    theme: string;
    
    nicknameMale: string;
    nicknameFemale: string;
    fullnameMale: string;
    fullnameFemale: string;
    dadMale: string;
    momMale: string;
    dadFemale: string;
    momFemale: string;
  
    accountName1?: string | null;
    accountBank1?: string | null;
    accountNumber1?: string | null;
    accountName2?: string | null;
    accountBank2?: string | null;
    accountNumber2?: string | null;
  
    event: string;
    address: string;
    gmap: string;
    time: Date;
  
    event2?: string | null;
    address2?: string | null;
    gmap2?: string | null;
    time2?: Date | null;
    isEvent2: boolean;
  
    introductionType: number;
    greetingType: number;
    hookMiddleType: number;
    storyType: number;
    closingType: number;
    songType: number;
  
    invitations: Invitation[];
    images: Image[];
    userId: string;
    user: User;
  
    confirmation: Confirmation[];
    expression: Expression[];
  }
  
  interface Image {
    id: number;
    url: string;
    type: string;
    createdAt: Date;
    weddingId: string;
    wedding: BridalCouple;
  }
  
  interface Invitation {
    inviteId: number;
    number: number;
    name: string;
    url: string;
    whatsapp: string;
    email: string;
    check: boolean;
    nickmale: string;
    nickfemale: string;
  
    weddingId: string;
    wedding: BridalCouple;
  }
  
  interface Confirmation {
    confirmationId: number;
    name: string;
    type: string;
    time: Date;
    weddingId: string;
    wedding: BridalCouple;
  }
  
  interface Expression {
    expressionId: number;
    name: string;
    expression: string;
    time: Date;
    weddingId: string;
    wedding: BridalCouple;
  }
  
  export {BridalCouple, Image, Confirmation, Expression, Invitation}