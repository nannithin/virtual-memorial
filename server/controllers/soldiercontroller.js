import Tribute from "../models/tribute.js"


export const addTribute = async (req, res) => {
    const { name, lastrank, service, pob, dob, armreg, unit, image, martyrdom, content } = req.body;

    if (!name.length) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!lastrank.length) {
        return res.status(400).json({ message: "lastrank is required" });
    }
    if (!service.length) {
        return res.status(400).json({ message: "service is required" });
    }
    if (!pob.length) {
        return res.status(400).json({ message: "pob is required" });
    }
    if (!dob.length) {
        return res.status(400).json({ message: "dob is required" });
    }
    if (!armreg.length) {
        return res.status(400).json({ message: "armreg is required" });
    }
    if (!unit.length) {
        return res.status(400).json({ message: "unit is required" });
    }
    if (!martyrdom.length) {
        return res.status(400).json({ message: "martyrdom is required" });
    }
    if (!image.length) {
        return res.status(400).json({ message: "image is required" });
    }
    if (!content || !content.blocks || !Array.isArray(content.blocks) || content.blocks.length === 0) {
        return res.status(400).json({ message: "content is required" });
    }


    const tri = new Tribute({ name, lastrank, service, pob, image, dob, armreg, unit, martyrdom, content });
    tri.save().then(() => {
        return res.status(201).json({ message: "Tribute added successfully", tribute: tri });
    }).catch((err) => {
        return res.status(500).json({ error: err.message });
    })


}

export const getSingleTri = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (!id.length) {
        return res.status(400).json({ message: "id is required" })
    }

    try {
        const data = await Tribute.findById(id);
        if (!data) {
            return res.json("no data found")
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



export const getLim = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    try {
        const total = await Tribute.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const skip = (page - 1) * limit;

        const data = await Tribute.find({approved : true}).skip(skip).limit(limit).sort({ createdAt: -1 })
        return res.json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json("server error")
    }
}

export const getAllPub = async (req, res) => {
    try {
        const data = await Tribute.find({approved : true});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}