import { formSchema, imageSchema } from "./FormSchema";
import {z} from 'zod'

type FormSchema = z.infer<typeof formSchema>;
type ImageSchema = z.infer<typeof imageSchema>;

const initialFormValues: FormSchema = {
    id: "",
    nicknameMale: "",
    nicknameFemale: "",
    fullnameMale: "",
    fullnameFemale: "",
    dadMale: "",
    momMale: "",
    dadFemale: "",
    momFemale: "",
  
    accountName1: "",
    accountBank1: "",
    accountNumber1: "",
    accountName2: "",
    accountBank2: "",
    accountNumber2: "",
  
    event: "",
    address: "",
    gmap: "",
    time: new Date(),
    event2: "",
    address2: "",
    gmap2: "",
    time2: new Date(),
    isEvent2: true,
    
  
    introductionType: 1,
    greetingType: 1,
    hookMiddleType: 1,
    storyType: 1,
    closingType: 1,
  
    songType: 1,
  
    theme:"",
  
    userId: "",
  };

  const initialImageValues: ImageSchema = {
    url: "",
    type: "",
    weddingId: "",
  };

  export {initialFormValues, initialImageValues}