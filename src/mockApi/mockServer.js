import users from "./users.json";
import plans from "./plans.json";
import addons from "./addons.json";
import transactions from "./transactions.json";
import complaints from "./complaints.json";

// Simulate network delay
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const mockServer = {
  // --------------------------
  // LOGIN
  // --------------------------
  async login(email, password) {
    await wait(500);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return { success: true, user };
    }

    return { success: false, message: "Invalid email or password" };
  },

  // --------------------------
  // REGISTER
  // --------------------------
  async register(email, password) {
    await wait(500);

    const exists = users.find((u) => u.email === email);

    if (exists) {
      return { success: false, message: "User already exists" };
    }

    users.push({ email, password, role: "user" });

    return { success: true, message: "Registered successfully" };
  },

  // --------------------------
  // SERVICE CHECK
  // --------------------------
  async checkService(pin) {
    await wait(500);

    if (pin.startsWith("7") || pin.startsWith("6")) {
      return { success: true, message: "Service Available in your area!" };
    }

    return { success: false, message: "Service NOT available in this area." };
  },

  // --------------------------
  // PLANS
  // --------------------------
  getPlans() {
    return plans;
  },

  // --------------------------
  // ADDONS
  // --------------------------
  getAddons() {
    return addons;
  },

  // --------------------------
  // PAYMENT
  // --------------------------
  async makePayment(amount) {
    await wait(500);

    if (!amount || amount <= 0) {
      return { success: false, message: "Invalid amount" };
    }

    const txnId = "TXN" + Math.floor(Math.random() * 100000);

    transactions.push({
      id: txnId,
      amount,
      date: new Date().toISOString().substring(0, 10),
    });

    return { success: true, message: `Payment Successful! Transaction ID: ${txnId}` };
  },

  // --------------------------
  // GET TRANSACTIONS
  // --------------------------
  getTransactions() {
    return transactions;
  },

  // --------------------------
  // COMPLAINT SYSTEM
  // --------------------------
  async submitComplaint(text) {
    await wait(500);

    const ticketId = "TICKET" + Math.floor(Math.random() * 100000);

    complaints.push({ ticketId, text });

    return { success: true, ticketId };
  },

  getComplaints() {
    return complaints;
  },

  // --------------------------
  // ADMIN
  // --------------------------
  getUsers() {
    return users;
  }
};

export default mockServer;
