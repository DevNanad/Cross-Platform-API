import prisma from "../db";

//UPLOAD SINGLE ID 
export const singleId = async (req, res) => {
    try {
        const single = await prisma.id.create({
            data: { student_id: req.body.student_id}
        })

        res.json({ message: "ID Uploaded"})
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}