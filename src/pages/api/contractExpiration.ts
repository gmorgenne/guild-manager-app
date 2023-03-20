import { type NextApiRequest, type NextApiResponse } from "next";
import { expireHeroContractsHandler } from "../../server/controllers/heroController";

import { prisma } from "../../server/db/client";

const contractExpiration = async (req: NextApiRequest, res: NextApiResponse) => {
    const expirationDate = new Date();
    console.log('check for expiration date: ', expirationDate);
    const expiredHeroContracts = await prisma.hero.findMany({
        where: {
            contractExpiration: {
                lt: expirationDate
            }
        }
    });
    const response = expireHeroContractsHandler(expiredHeroContracts);
    res.status(200).json(response);
};

export default contractExpiration;
