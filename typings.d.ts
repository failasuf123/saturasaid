interface BridalCouple {
    id: number;
    theme: string;
    link: string;
    
    nicknameMale: string;
    nicknameFemale: string;
    fullnameMale: string;
    fullnameFemale: string;

    dadMale: string;
    momMale: string;
    dadFemale: string;
    momFemale: string;

    mainEventTime: string;

    introductionType: number;
    greetingType: number;
    hookMiddle: number;
    storyType: number;
    closingType: number;
    songType: number;

    place: {
        event: string;
        time: string;
        gmap: string;
    }[];
    photo: {
        url: string;
        type: string;
    }[];
    gift: {
        accountName: string;
        bank: string;
        accountNumber: string;
    }[];
}

export {BridalCouple}