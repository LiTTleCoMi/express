import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("this is the root path");
});
app.get("/loan/calculate", (req, res) => {
    const data = req.query;
    const principal = parseFloat(data.principal) || 0;
    const rate = parseFloat(data.rate) || 0;
    const years = parseFloat(data.years) || 0;
    const interest = principal * rate * years;
    res.send(JSON.stringify({ interest }));
})
app.post("/savings/calculate", (req, res) => {
    const data = req.body;
    const FV = parseFloat(data.targetGoal) || 0;
    const PV = parseFloat(data.initialDeposit) || 0;
    const r = parseFloat(data.interestRate) / 12 || 0;
    const n = parseFloat(data.durationMonths) || 0;
    const PMT = (((FV - PV) * ((1 + r) ** n)) * r) / (((1 + r) ** n) - 1);

    res.send(JSON.stringify({ requiredMonthlySavings: PMT }));
})
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
