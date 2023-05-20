import prisma from "../db";

export const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshtokeen) return res.sendStatus(204).end(); // no content

        const refToken = cookies.refreshtokeen;

        const foundUser = await prisma.user.findFirst({
            where: { refreshToken: refToken }
        });

        if (!foundUser) {
            res.clearCookie('refreshtokeen', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true });
        } 
        
        // delete the refresh token from db
        const setToNull = await prisma.user.update({
            where: { student_id: req.body.student_id },
            data: { refreshToken: null }
        });

        res.clearCookie('refreshtokeen', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true }); // secure: true - do this on production
        res.sendStatus(204).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
}
