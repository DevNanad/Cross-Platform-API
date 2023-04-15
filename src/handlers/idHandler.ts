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

//UPLOAD MULTIPLE IDs
export const multipleId = async (req, res) => {
    try {
      const studentIds = req.body.student_ids.split(',')
  
      // Create an array of objects for bulk creation
      const idObjects = studentIds.map(id => ({ student_id: id }));
  
      // Filter out existing IDs from the array
      const existingIds = await prisma.id.findMany({
        where: {
          student_id: {
            in: studentIds
          }
        }
      });
      const newIdObjects = idObjects.filter(obj => {
        return !existingIds.some(existingObj => existingObj.student_id === obj.student_id);
      });
  
      // Create new ID records in the database
      const result = await prisma.id.createMany({
        data: newIdObjects
      });
  
      res.json({ message: `${result.count} IDs uploaded` });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
  