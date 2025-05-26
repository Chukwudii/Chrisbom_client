// POST /forgot-password
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Save token to DB or send directly via email
        const resetLink = `http://chrisbom.vercel.app/reset-password/${token}`;

        // Use a mailer service like nodemailer
        console.log(`Reset Link (email to user): ${resetLink}`);

        res.json({ success: true, message: "Reset link sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// POST /reset-password/:token
app.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ success: true, message: "Password reset successful" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

const handleForgot = async () => {
    const res = await fetch(`${baseURL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) toast.success("Check your email");
    else toast.error(data.error);
};


const handleReset = async () => {
    const res = await fetch(`${baseURL}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) toast.success("Password updated");
    else toast.error(data.error);
};
