import prisma from '../lib/prisma';

export const getAllWeddings = async () => {
    try {
        const weddings = await prisma.wedding.findMany();
        return weddings;
    } catch (error) {
        throw new Error(`Failed to fetch all wedding data: ${error}`);
     
    }
}
 
