const User = require('./models/User');

// GET: RETURN ALL USERS
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST: ADD A NEW USER TO THE DATABASE
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT: EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).send('User not found');
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE: REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('User not found');
    res.json(deletedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

