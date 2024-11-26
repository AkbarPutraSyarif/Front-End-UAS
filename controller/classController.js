const ClassCooking = require('../model/class');
const User = require('../model/user');

// Create: Mendaftar kelas
exports.registerClass = async (req, res) => {
    const { name, email, date, time } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not registered' });
        }

        const newClass = new ClassCooking({
            user: user._id,
            name,
            email,
            date,
            time,
        });

        await newClass.save();
        res.status(201).json({ success: true, message: 'Class registered successfully', class: newClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Read: Melihat kelas yang sudah terdaftar
exports.getClasses = async (req, res) => {
    try {
        const userId = req.user.id; // user ID dari autentikasi
        const classes = await ClassCooking.find({ user: userId });

        res.status(200).json({ success: true, classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update: Mengubah jadwal kelas
exports.updateClass = async (req, res) => {
    const { id } = req.params;
    const { date, time } = req.body;

    try {
        const updatedClass = await ClassCooking.findByIdAndUpdate(
            id,
            { date, time },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        res.status(200).json({ success: true, message: 'Class updated successfully', class: updatedClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete: Menghapus jadwal kelas
exports.deleteClass = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedClass = await ClassCooking.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
