import { BridalCouple, User } from "@/typings";

export const UserList: User[] = [
    {
        id: 1,
        clerkid: "some_clerk_id",
        createdAt: new Date("2024-08-10T14:00:00"),
        updatedAt: new Date("2024-08-10T14:00:00"),
        weddings: [] // Daftar BridalCouple yang terkait
    }
];

export const BridalCoupleList: BridalCouple[] = [
    {
        id: "1",
        theme: "FlowerGarden",

        nicknameMale: "Romeo",
        nicknameFemale: "Juliate",
        fullnameMale: "Romeo Thorik Rubi'ah",
        fullnameFemale: "Juliate Azizah",

        dadMale: "Agung Sulaiman",
        momMale: "Titiek Zulaeha Samsudin",
        dadFemale: "Supardi Joko Handoyo",
        momFemale: "Husna Mobarok",

        introductionType: 1,
        greetingType: 2,
        hookMiddleType: 1,
        storyType: 2,
        closingType: 1,
        songType: 1,

        event: "Akad Nikah",
        time: new Date("2024-08-10T14:00:00"),
        gmap: "https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc",
        address: "Jalan Agus Salim No 7 Kopo, Bandung",

        event2: "Resepsi",
        time2: new Date("2024-08-10T14:00:00"),
        gmap2: "https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc",
        address2: "Jaln Untung Suprapto No 8 Ciwidey",
        isEvent2: true,

        images: [],

        accountName1: "BNI",
        accountBank1: "Romeo",
        accountNumber1: "67890",

        accountName2: "BSI",
        accountBank2: "Juliate",
        accountNumber2: "127490",
        userId: "1",

        createdAt: new Date("2024-08-10T14:00:00"),
        watermark: false,
        invitations: [],
        user: UserList[0], // Set user dengan objek User yang valid
        confirmation: [],
        expression: []
    }
];
