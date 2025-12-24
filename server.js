import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOTAL_RECORDS = 1000;
const users = Array.from({ length: TOTAL_RECORDS }).map((_, i) => ({
    _id: `user-id-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * 40) + 18,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}));

app.get("/api/users", (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || TOTAL_RECORDS;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUsers = users.slice(startIndex, endIndex);
    const totalPages = Math.ceil(users.length / limit);

    res.json({
        users: paginatedUsers,
        pagination: {
            totalPages: totalPages,
            totalItems: users.length,
            hasMore: page < totalPages,
            currentPage: page,
        },
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ API running with ${TOTAL_RECORDS} users at http://localhost:${PORT}`);
});